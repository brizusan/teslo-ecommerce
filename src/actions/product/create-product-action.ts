"use server";
import { prisma } from "@/src/config/client";
import { Size } from "@/src/interfaces";
import { Gender, Product } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import z from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const formDataSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.coerce.number().transform((v) => Number(v.toFixed(2))),
  tags: z.string(),
  inStock: z.coerce.number(),
  gender: z.nativeEnum(Gender),
  categoryId: z.string(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
});

export async function createProductAction(formData: FormData) {
  const data = Object.fromEntries(formData);
  const res = formDataSchema.safeParse(data);

  if (!res.success) {
    console.log(res.error);
    return {
      ok: false,
      error: res.error,
    };
  }

  const product = res.data;

  const { id, ...rest } = product;

  product.slug = product.title.toLowerCase().replace(/ /g, "-").trim();

  try {
    const prismaTx = await prisma.$transaction(async () => {
      let product: Product;
      // todo el contenido de tags debe ser una lista de strings en minusculas
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      //update product
      if (id) {
        product = await prisma.product.update({
          where: {
            id,
          },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      //cargar imagenes
      if (formData.getAll("images")) {
        const images: unknown = await uploadImages(
          formData.getAll("images") as File[]
        );
        if (!images) throw new Error("Error al cargar las imagenes , rollback");
        if (!Array.isArray(images))
          throw new Error("Error al cargar las imagenes , rollback");

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            productId: product.id,
            url: image,
          })),
        });
      }

      return {
        product,
      };
    });

    // Todo: Revalidate path
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);

    return {
      ok: true,
      prodct: prismaTx.product,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
}

const uploadImages = async (files: File[]) => {
  try {
    const uploadResult = files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");

      return cloudinary.uploader
        .upload(`data:image/png;base64,${base64Image}`)
        .then((r) => r.secure_url);
    });
    const uploadImages = await Promise.all(uploadResult);
    return uploadImages;
  } catch (error) {
    console.log(error);
    return error;
  }
};
