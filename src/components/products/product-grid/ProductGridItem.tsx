"use client";
import { Product } from "@/src/interfaces";
import { urlImageCloud } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  product: Product;
};

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  if (displayImage === undefined) return null;

  return (
    <div className="rounded-md overflow-hidden fade-in ">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={urlImageCloud(displayImage)}
          width={500}
          height={500}
          className="w-full object-cover rounded-md"
          alt={`imagen de producto ${product.title}`}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
          priority
        />
      </Link>

      <div className="p-4 space-y-3">
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-blue-600 font-medium transition-colors"
        >
          <h3 className="text-lg">{product.title}</h3>
        </Link>
        <span className="font-bold text-slate-800">${product.price}</span>
      </div>
    </div>
  );
};
