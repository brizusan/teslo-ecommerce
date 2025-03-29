"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/config/client";
import { revalidatePath } from "next/cache";

export async function updateRole(id: string, role: string) {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "No tienes permisos para realizar esta acción",
    };
  }

  try {
    const newRole = role === "admin" ? "admin" : "user";
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return { ok: false, message: "Usuario no encontrado" };

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");

    return { ok: true, message: "Role actualizado correctamente" };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al actualizar el rol del usuario",
    };
  }
}
