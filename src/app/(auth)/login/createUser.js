"use server";

import  db  from '../../lib/db';

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
// };

export const findUser = async (formData) => {
  console.log('formData passed!');
  const { email } = Object.fromEntries(formData);
  // const email = formData;
  try {
    const user = await db.users.findFirst({
      where: {
        email: email,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export const findUserBasic = async (email, pass) => {
  try {
    const user = await db.users.findFirst({
      where: {
        email: email,
      },
    });

    if (user?.password != pass){
      return null;
    }
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}
