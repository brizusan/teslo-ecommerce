"use client";
import Link from "next/link";

export const RegisterForm = () => {
  return (
    <form className="flex flex-col">
      <label htmlFor="name">Nombre completo</label>
      <input
        className="px-5 py-2 border border-gray-200 bg-gray-100 rounded mb-5"
        type="text"
      />
      <label htmlFor="name">Correo electrónico</label>
      <input
        className="px-5 py-2 border border-gray-200 bg-gray-100 rounded mb-5"
        type="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border border-gray-200 bg-gray-100 rounded mb-5"
        type="email"
      />

      <button className="btn-primary">Registrarse</button>

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
  );
};
