"use server";
import { prisma } from "@/src/config/client";
import { Size } from "@/src/interfaces";
import { Gender, Product } from "@prisma/client";
import z from "zod";

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

    console.log({ updateProduct: product });
    // Todo: Revalidate path
    return {
      ok: true,
      product,
    };
  });
}
