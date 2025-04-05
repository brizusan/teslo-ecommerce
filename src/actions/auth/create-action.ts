"use server";

import { FormData } from "@/app/auth/new-account/components/RegisterForm";
import { prisma } from "@/src/config/client";
import bcryptjs from "bcryptjs";

export async function createUser(data: FormData) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return { ok: false, error: "El correo ya está registrado" };
  }

  try {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: await bcryptjs.hash(data.password, 10),
      },
    });
  } catch (error) {
    console.log(error);
    return { ok: false, error: "Error al crear la cuenta" };
  }
  return { ok: true, success: "Cuenta creada correctamente" };
}
