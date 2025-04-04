import { getCategories } from "@/src/actions";
import { Title } from "@/src/components";
import { ProductForm } from "../components/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <section className="px-10">
      <Title title="Nuevo Producto" />

      <ProductForm categories={categories} />
    </section>
  );
}
