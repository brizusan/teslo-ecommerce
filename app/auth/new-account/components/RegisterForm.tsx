"use client";
import { createUser } from "@/src/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const registerSchema = z.object({
  name: z.string().nonempty({ message: "El nombre es requerido" }),
  email: z
    .string()
    .nonempty({ message: "El correo es requerido" })
    .email({ message: "El correo no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export type FormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const router = useRouter();
  const [response, setResponse] = useState<
    { error?: string; success?: string } | undefined
  >();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await createUser(data);
    setResponse(res);
  };

  useEffect(() => {
    if (response?.success) {
      setTimeout(() => {
        router.push("/auth/login");
        reset();
      }, 1500);
    }
  }, [response]);

  return (
    <>
      {response && response.success && (
        <p className="text-center mb-2 text-sm text-blue-500 font-medium">
          {response.success.toString()}
        </p>
      )}
      {response && response.error && (
        <p className="text-center mb-2 text-sm text-red-500 font-medium">
          {response.error.toString()}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nombre completo</label>
          <input
            className="px-5 py-2 border border-gray-200 bg-gray-100 rounded mb-1"
            type="text"
            {...register("name")}
          />
          <small className="text-sm font-medium text-red-500">
            {errors.name?.message}
          </small>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Correo electrónico</label>
          <input
            className="px-5 py-2 border border-gray-200 bg-gray-100 rounded mb-1"
            type="email"
            {...register("email")}
          />
          <small className="text-sm font-medium text-red-500">
            {errors.email?.message}
          </small>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Contraseña</label>
          <input
            className="px-5 py-2 border border-gray-200 bg-gray-100 rounded mb-1"
            type="password"
            id="password"
            {...register("password")}
          />
          <small className="text-sm font-medium text-red-500">
            {errors.password?.message}
          </small>
        </div>

        <div className="pt-3">
          <button type="submit" className="btn-primary w-full">
            Registrarse
          </button>
        </div>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Iniciar Sesión
        </Link>
      </form>
    </>
  );
};
