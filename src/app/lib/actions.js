"use server";

import { signIn, signOut, auth } from "../auth";
import bcrypt from "bcryptjs";
import db from "./db";
import { findUserBasic } from "../(auth)/login/createUser";

export const authenticate = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    if (findUserBasic(email) === null){
      return "Wrong Credentials";
    }
    await signIn("credentials", { email, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};

export const logOut = async () => {
  await signOut();
};

export const getCookies = async () => {
  const session =  await auth();
  return session;
};


// export const createUser = async (email, password) => {
//   try {
//     const results = await db.user.create({
//       data: {
//         email: email,
//         password: password,
//       },
//     });
//     console.log(results);
//     return results;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export const loginUser = async (credentials) => {
//   try {
//     const user = await db.user.findFirst({
//       where: {
//         email: credentials.email,
//       },
//     });
//     if (!user) throw new Error('Wrong Credentials!');

//     const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
//     if (!passwordsMatch) throw new Error('Wrong Credentials!');
//     return user;

//   } catch (error) {
//     console.log(error);
//     throw new Error('Error logging in');
//   }
// }
