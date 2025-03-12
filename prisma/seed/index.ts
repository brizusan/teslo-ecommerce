import { prisma } from "@/src/config/client";
import { initialData } from "@/src/seed/seed";

async function main() {
  // resetar base de datos
  // await Promise.all([
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);
  // creacion de categorias

  const { categories, products } = initialData;

  const categoriesData = categories.map((category) => ({
    name: category,
  }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  // tomar todas las categories registradas
  const categoriesDB = await prisma.category.findMany();
  // conversion de categories a category : categoryId como objeto
  const categoriesMap = categoriesDB.reduce((acc, category) => {
    acc[category.name.toLowerCase()] = category.id;
    return acc;
  }, {} as Record<string, string>);

  // creacion de productos

  products.forEach(async (product) => {
    const { images, type, ...rest } = product;

    const productData = {
      ...rest,
      categoryId: categoriesMap[type],
    };

    const productDB = await prisma.product.create({
      data: productData,
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: productDB.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seed ejecutado");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
