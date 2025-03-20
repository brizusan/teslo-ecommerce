import { CartProduct } from "@/src/interfaces";
import { useCartStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";
import Image from "next/image";
import { ProductQuantity } from "../../product/product-quantity/ProductQuantity";

type Props = {
  product: CartProduct;
};

export const CartItem = ({ product }: Props) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="flex gap-4 items-center bg-white shadow">
      <Image
        src={`/products/${product.image}`}
        width={150}
        height={150}
        alt="imagen de producto"
        className="object-cover"
      />
      <div className="flex-1 space-y-1.5  py-3">
        <h3 className="font-bold antialiased">{product.title}</h3>
        <p className="font-medium text-slate-700">
          {formatCurrency(product.price)}
        </p>
        <ProductQuantity
          quantity={product.quantity}
          onUpdateQuantity={(quantity) => updateQuantity(product.id, quantity)}
        />
        <button
          onClick={() => removeFromCart(product.id)}
          type="button"
          className="underline-offset-2 underline cursor-pointer hover:no-underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
