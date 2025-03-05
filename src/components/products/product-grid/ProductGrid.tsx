import { Product } from "@/src/interfaces";
import { ProductGridItem } from "./ProductGridItem";

type Props = {
  products: Product[];
};
export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 my-10">
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
