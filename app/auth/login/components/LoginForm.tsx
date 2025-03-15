"use client";

import { authenticate } from "@/src/actions";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email-id">Correo electrónico</label>
      <input
        className="px-5 py-2 border border-gray-200 bg-gray-100 rounded mb-5"
        type="email"
        name="email"
        id="email-id"
      />

      <label htmlFor="password-id">Contraseña</label>
      <input
        id="password-id"
        name="password"
        className="px-5 py-2 border border-gray-200 bg-gray-100 rounded mb-5"
        type="password"
      />
      {errorMessage && (
        <>
          <p className="text-sm text-red-500 text-center mb-4 italic">
            {errorMessage}
          </p>
        </>
      )}

      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button
        type="submit"
        aria-disabled={isPending}
        className={clsx({
          "btn-primary": !isPending,
          "btn-disabled": isPending,
        })}
      >
        Ingresar
      </button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
