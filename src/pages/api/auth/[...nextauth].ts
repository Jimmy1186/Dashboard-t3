import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",

      credentials: {
        id: { label: "使用者編號", type: "text", placeholder: "K10000" },
        password: { label: "密碼", type: "password",placeholder:"123" },
      },
      async authorize(credentials) {
        if (credentials === undefined) {
          return null;
        }
        const registeredUser = await prisma.user.findFirst({
          where: { id: { equals: credentials.id } },
          include: {
            role: true,
          },
        });

        if (registeredUser) {
          const match = await argon2.verify(
            registeredUser.password,
            credentials.password
          );

          if (match) {
            return {
              id: registeredUser.id,
              name: registeredUser.username,
              role: registeredUser.role.roles,
            };
          }
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60, updateAge: 24 * 60 * 60 },

  callbacks: {
    // async signIn(res) {
    //   console.log(res)
    //   return true
    // },
    async jwt({ token, account, user }) {
      // console.log("===== jwt =====");
      // console.log("user", user);
      // console.log("token", token);
      // console.log("user", account);

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token, user }) {
      // console.log("===== session =====");
      // console.log("session", session);
      // console.log("token", token);
      // console.log("user", user);

      if (token && session.user != undefined) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
