"use server";
import { prisma } from "@/src/config/client";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export async function deleteProductImage(imageId: number, imageUrl: string) {
  if (imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "Invalid image url",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0];

  try {
    if (!imageName) return;
    await cloudinary.uploader.destroy(imageName);
    const deleteImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    // Todo: Revalidate path
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${deleteImage.product.slug}`);
    revalidatePath(`/products/${deleteImage.product.slug}`);
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "Error al eliminar la imagen",
    };
  }

  console.log(imageName);
}
