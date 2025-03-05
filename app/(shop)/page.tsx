import { ProductGrid, Title } from "@/src/components";
import { initialData } from "@/src/seed/seed";

const products = initialData.products;

export default function HomePage() {
  return (
    <section className="px-10">
      <Title
        title="Tienda"
        subtitle="Todos los productos , accesorios y más"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </section>
  );
}
