import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Providers from "next-auth/providers/credentials";
import { authConfig } from "@/app/authconfig";
import bcrypt from "bcrypt";
import db from "@/app/lib/db";
import { findUserBasic } from "./(auth)/login/createUser";

const login = async (credentials) => {
  console.log("auth.js:: ", credentials.email);
  const { email } = credentials;
  try {
    const user = await db.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user || !user.isAdmin) throw new Error("Wrong credentials!");
    console.log("====================USERDATA=============: " + user);
    return user;
    // const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
    // if (!passwordsMatch) throw new Error('Wrong Credentials!');
  } catch (error) {
    console.log(error);
    throw new Error("Error logging in");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          // const user = await db.user.findFirst({
          //   where: { email: credentials.email },
          // });

          const user = await findUserBasic(credentials.email, credentials.password);


          if (user != null) {
            return { id: user.id, name: user.name, email: user.email };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});
