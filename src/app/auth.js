import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/app/lib/db";

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
  } catch (error) {
    console.log(error);
    throw new Error("Error logging in");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await db.users.findFirst({
            where: { email: credentials.email },
          });

          // if (user && bcrypt.compareSync(credentials.password, user.password)) {
          if (user && (credentials.password === user.password)) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.type,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
