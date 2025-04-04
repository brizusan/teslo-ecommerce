"use client";

import { createProductAction } from "@/src/actions";
import { ProductImage } from "@/src/components";
import type { Categories, Product } from "@/src/interfaces";
import type { ProductImage as ProductImageType } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product?: Partial<Product> & {
    ProductImage?: ProductImageType[];
  };
  categories: Categories[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  tags: string[];
  inStock: number;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  sizes: string[];
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product?.tags ?? [],
      sizes: product?.sizes ?? [],
      images: undefined,
    },
  });

  watch("sizes");

  const onSizeChange = (size: string): void => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { images, ...productToSave } = data;

    if (product?.id) {
      formData.append("id", product?.id);
    }
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("tags", Array(productToSave.tags).join(","));
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("gender", productToSave.gender);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("sizes", productToSave.sizes.join(",").trim());

    if (images) {
      for (const image of images) {
        formData.append("images", image);
      }
    }

    const { ok, prodct } = await createProductAction(formData);

    if (!ok) {
      alert("Error al realizar la operacion");
      return;
    }

    router.replace("/admin/products");
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
          <span>InSotck</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", {
              required: "Stock de productos es obligatorio",
              pattern: {
                value: /^[0-9]+$/,
                message: "El stock debe ser un número",
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
                onClick={() => onSizeChange(size)}
                className={clsx(
                  "flex  items-center justify-center cursor-pointer w-10 h-10 mr-2 border rounded-md transition-all",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  }
                )}
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
              accept="image/avif, image/png, image/jpeg"
              {...register("images")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {product?.ProductImage?.map((image) => (
              <div
                key={image.id}
                className=" border border-gray-100 overflow-hidden rounded-md"
              >
                <ProductImage
                  src={image.url}
                  alt={product.title ?? ""}
                  width={350}
                  height={350}
                  className="rounded-md w-full"
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
