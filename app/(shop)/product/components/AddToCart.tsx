"use client";

import { ProductQuantity, SizeSelector } from "@/src/components";
import { Product, Size } from "@/src/interfaces";
import { useCartStore } from "@/src/store";
import { useState } from "react";

type Props = {
  product: Product;
};

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState("");

  const addProductCart = useCartStore((state) => state.addProductToCart);

  const handleAddToCart = () => {
    if (!size) return setError("Por favor seleccione una talla");
    if (product.inStock < quantity) return setError("No hay stock disponible");

    setError("");

    const productData = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      size: size,
    };

    addProductCart(productData);
    alert("Producto agregado al carrito");
    resetStates();
  };

  const resetStates = () => {
    setSize(undefined);
    setQuantity(1);
    setError("");
  };

  return (
    <>
      {/* Selector de Tallas */}
      <h3 className="font-semibold text-lg">Tallas disponibles</h3>
      <SizeSelector
        avaliableSizes={product.sizes}
        sizeSelected={size}
        onChangeSize={setSize}
      />

      {/* Selector de Cantidad */}
      <ProductQuantity quantity={quantity} onUpdateQuantity={setQuantity} />
      {error && (
        <p className="fade-in text-red-500 text-sm italic font-semibold">
          {error}
        </p>
      )}
      <button
        onClick={handleAddToCart}
        type="button"
        className="btn-primary my-4"
      >
        Agregar al carrito
      </button>
    </>
  );
};
