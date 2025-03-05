import {
  ProductQuantity,
  SizeSelector,
  SliderProduct,
  SliderProductMobile,
} from "@/src/components";
import { titleFont } from "@/src/config/fonts";
import { initialData } from "@/src/seed/seed";
import { formatCurrency } from "@/src/utils";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductBySlug({ params }: Props) {
  const { slug } = await params;
  const products = initialData.products;
  const product = products.find((item) => item.slug === slug);
  if (!product) return notFound();

  return (
    <>
      <section className="my-8 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 max-w-[1280px] lg:mx-auto">
        {/* SlideShow */}
        <div className="col-span-1 md:col-span-2 bg-blue-50/50 rounded-lg ">
          <div className="md:block hidden ">
            <SliderProduct images={product.images} title={product.title} />
          </div>
          <div className="block  md:hidden ">
            <SliderProductMobile
              images={product.images}
              title={product.title}
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="col-span-1 px-4  space-y-3">
          <h1
            className={`${titleFont.className} antialiased font-bold text-xl`}
          >
            {product.title}
          </h1>
          <p className="text-lg">{formatCurrency(product.price)}</p>

          {/* Selector de Tallas */}
          <h3 className="font-semibold text-lg">Tallas disponibles</h3>
          <SizeSelector avaliableSizes={product.sizes} />
          {/* Selector de Cantidad */}
          <ProductQuantity />
          {/* CTA - Agregar al carrito */}
          <button type="button" className="btn-primary my-4">
            Agregar al carrito
          </button>
          {/* Descripcion */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Descripcion</h3>
            <p className="text-pretty">{product.description}</p>
          </div>
        </div>
      </section>
    </>
  );
}
