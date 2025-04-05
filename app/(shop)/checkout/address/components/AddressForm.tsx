"use client";
import { removeAddress, setUserAddress } from "@/src/actions";
import { Address, AddressSchema } from "@/src/schemas";
import { SeedCountry } from "@/src/seed/countries";
import { useAdressStore } from "@/src/store";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  countries: SeedCountry[];
  userAddress: Partial<Address>;
};

export const AddressForm = ({ countries, userAddress = {} }: Props) => {
  const router = useRouter();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    reset,
  } = useForm<Address>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      ...userAddress,
      rememberAdress: false,
    },
  });

  const address = useAdressStore((state) => state.address);
  const setAddress = useAdressStore((state) => state.setAdress);

  const { data: session } = useSession();

  const handleAddress = handleSubmit(async (data) => {
    setAddress(data);

    if (!data.rememberAdress) {
      await removeAddress(session!.user.id);
    }

    if (data.rememberAdress) {
      await setUserAddress(data, session!.user.id);
    }

    router.push("/checkout");
  });

  useEffect(() => {
    if (address.name) reset(address);
  }, [address, reset]);

  return (
    <form
      onSubmit={handleAddress}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-1">
        <span>Nombres</span>
        <input
          type="text"
          className="p-2 border border-gray-200 rounded-md bg-gray-100"
          {...register("name")}
        />
        {errors.name && (
          <span className="mt-1 text-red-500 text-right">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-1">
        <span>Apellidos</span>
        <input
          type="text"
          className="p-2 border border-gray-200 rounded-md bg-gray-100"
          {...register("lastName")}
        />
        {errors.lastName && (
          <span className="mt-1 text-red-500 text-right">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-1">
        <span>Dirección</span>
        <input
          type="text"
          className="p-2 border border-gray-200 rounded-md bg-gray-100"
          {...register("address")}
        />
        {errors.address && (
          <span className="mt-1 text-red-500 text-right">
            {errors.address.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-1">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className="p-2 border border-gray-200 rounded-md bg-gray-100"
          {...register("address2")}
        />
      </div>

      <div className="flex flex-col mb-1">
        <span>Código postal</span>
        <input
          type="text"
          className="p-2 border border-gray-200 rounded-md bg-gray-100"
          {...register("postalCode")}
        />
        {errors.postalCode && (
          <span className="mt-1 text-red-500 text-right">
            {errors.postalCode.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-1">
        <span>Ciudad</span>
        <input
          type="text"
          className="p-2 border border-gray-200 rounded-md bg-gray-100"
          {...register("city")}
        />
        {errors.city && (
          <span className="mt-1 text-red-500 text-right">
            {errors.city.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-1">
        <span>País</span>
        <select
          className="p-2 border border-gray-200 rounded-md bg-gray-100"
          {...register("country")}
        >
          <option value="">[ Seleccione ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <span className="mt-1 text-red-500 text-right">
            {errors.country.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-1">
        <span>Teléfono</span>
        <input
          type="text"
          className="p-2 border border-gray-200 rounded-md bg-gray-100"
          {...register("phone")}
        />
        {errors.phone && (
          <span className="mt-1 text-red-500 text-right">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          htmlFor="checkbox"
          data-ripple-dark="true"
        >
          <input
            type="checkbox"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
            id="checkbox"
            {...register("rememberAdress")}
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
        <span> Recordar direccion?</span>
      </div>

      <div></div>

      <div className="flex flex-col mb-1 sm:mt-4">
        <button
          type="submit"
          className={clsx({
            "btn-primary": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
