"use server";

import { signIn } from "@/src/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
