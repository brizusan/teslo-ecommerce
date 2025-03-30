"use client";

import type { Categories, Product } from "@/src/interfaces";
import { ProductImage } from "@prisma/client";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  product: Product & {
    ProductImage?: ProductImage[];
  };
  categories: Categories[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  tags: string;
  inStock: number;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  sizes: string;

  // Images
}

export const ProductForm = ({ product, categories }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(","),
      sizes: product.sizes.join(","),
    },
  });

  const onSubmit = async (data: FormInputs) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3 lg:gap-8 max-w-7xl mx-auto"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", {
              required: "El título es obligatorio",
            })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", {
              required: "El slug es obligatorio",
            })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", {
              required: "El precio es obligatorio",
              pattern: {
                value: /^[0-9]+$/,
                message: "El precio debe ser un número",
              },
            })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", {
              required: "Las etiquetas son obligatorias",
            })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", {
              required: "El género es obligatorio",
            })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", {
              required: "La categoria es obligatoria",
            })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                className="flex  items-center justify-center w-10 h-10 mr-2 border rounded-md"
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => (
              <div
                key={image.id}
                className=" border border-gray-100 overflow-hidden rounded-md"
              >
                <Image
                  src={`/products/${image.url}`}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="rounded-md "
                />

                <div className="text-center ">
                  <button
                    type="button"
                    onClick={() => console.log(image.id, image.url)}
                    className="w-full bg-red-500 text-white py-2 hover:tracking-widest transition-all cursor-pointer "
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
