"use server";

import db from "@/app/lib/db";
import { randomInt } from "crypto";

export const signup = async (prevState, formData) => {
  try {
    // console.log("formData passed!, ", formData);
    const { email, name, mobile, password } = Object.fromEntries(formData);
    const user = await db.users.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return { response: "User already exists!" };
    } 
    const newUser = await db.users.create({
      data: {
        email: email,
        name: name,
        mobile: mobile,
        password: password,
        type: "USER",
        username: name+randomInt(1000, 9999)
      },
    });

    // console.log("New User: ", newUser);

    return { responseCode: 200 ,response: "Data created successfully!" , user: newUser};
  } catch (error) {
    console.error("Error creating data:", error);
    return { response: "Error creating data " + error };
  }
};
