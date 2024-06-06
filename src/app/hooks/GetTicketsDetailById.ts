"use server";

import db from "@/app/lib/db";

export const getTicketDeailsById = async (id: number) => {
  try {
    console.log("ticket id", id);
    const data = await db.tickets.findFirst({
      where: {
        id: id,
      },
    });
    
    return data;
  } catch (error) {
    console.error(error);
  }
};