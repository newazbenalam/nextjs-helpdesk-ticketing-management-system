"use server";

import db from "@/app/lib/db";

export const revalidateLocalData = async (arrOfFormData, email) => {
  try {
    const resultArr = [];
    let userResult = null;
    console.log("email: ", email);
    // Find the user data with the provided email
    if (email != null) {
      userResult = await db.users.findFirst({
        where: {
          email: email,
        },
      });
    }

    // If user data is found, find the tickets associated with that user
    if (userResult?.type === ("ADMIN" || "EMPLOYEE")) {
      const userTickets = await db.tickets.findMany();
      resultArr.push(...userTickets);
    } else {
      if (userResult !== null) {
        const userTickets = await db.tickets.findMany({
          where: {
            userId: userResult.id,
          },
        });
        resultArr.push(...userTickets);
      }
    }

    for (let i = 0; i < arrOfFormData.length; i++) {
      const ticketData = await db.tickets.findFirst({
        where: {
          id: arrOfFormData[i].id,
        },
      });
      if (ticketData) {
        resultArr.push(ticketData);
      }
    }

    // await Promise.all(
    //   arrOfFormData.map(async (formData) => {
    //     if (formData.ticketId == userResult.id) {
    //       return;
    //     }
    //     console.log("formData: ", formData);
    //     const ticketData = await db.tickets.findFirst({
    //       where: {
    //         id: formData.id,
    //       },
    //     });
    //     if (ticketData) {
    //       resultArr.push(ticketData);
    //     }
    //   })
    // );

    // console.log(resultArr);
    return resultArr;
  } catch (error) {
    console.error("Error retrieving ticket data:", error);
    return { response: "Error retrieving ticket data " + error };
  }
};
