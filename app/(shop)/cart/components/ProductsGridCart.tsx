import { CartItem } from "@/src/components";
import { useCartStore } from "@/src/store";

export const ProductsGridCart = () => {
  const cart = useCartStore((state) => state.cart);
  return (
    <div className="col-span-2 grid grid-cols-1 gap-2">
      {cart.map((item) => (
        <CartItem key={item.id} product={item} />
      ))}
    </div>
  );
};
