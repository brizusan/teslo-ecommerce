import { ProductGrid, ProductGridEmpty, Title } from "@/src/components";
import { Category } from "@/src/interfaces";
import { initialData } from "@/src/seed/seed";
import { notFound } from "next/navigation";
import { categories } from "../not-found";
type Props = {
  params: Promise<{ id: Category }>;
};

const categoryMap: Record<Category, string> = {
  men: "hombres",
  women: "mujeres",
  kid: "niños",
  unisex: "unisex",
};

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const products = initialData.products;
  const productsByCategory = products.filter(
    (product) => product.gender === id
  );

  const categoria = categories.find((category) => category.slug === id);

  if (!categoria) return notFound();

  return (
    <section className="px-10">
      <Title
        title="Categoría"
        subtitle={`Todos los productos , accesorios y más de ${categoryMap[id]}`}
        className="mb-2"
      />
      {productsByCategory.length > 0 ? (
        <ProductGrid products={productsByCategory} />
      ) : (
        <ProductGridEmpty
          title={`No hay productos en la categoría ${categoryMap[id]}`}
          description={`Lo sentimos, no pudimos encontrar productos en la categoría ${categoryMap[id]}. Puede que haya sido movida o eliminada.`}
        />
      )}
    </section>
  );
}
