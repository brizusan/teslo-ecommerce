import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./config/client";

export const { handlers, signOut, signIn, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }
        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password)) return null;

        const { password: contraseña, ...rest } = user;

        return rest;
      },
    }),
  ],
});
