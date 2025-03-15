"use server";

import { signOut } from "@/src/auth.config";

export async function logout() {
  await signOut({ redirect: false });
}
