"use server";
import db from "@/app/lib/db";

export const getTicketsStatus = async (userId) => {
  try {
    console.log("userId: ", userId);

    const userData = await db.users.findFirst({
      where: {
        id: userId,
      },
    });

    let userTickets = [];

    if (userData?.type === "ADMIN" || userData?.type === "EMPLOYEE") {
      userTickets = await db.tickets.findMany();
    } else {
      userTickets = await db.tickets.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
    }

    if (!userTickets || userTickets.length === 0) {
      return { response: "No tickets found" };
    }

    const openTickets = userTickets.filter(
      (ticket) =>
        ticket.status === "OPEN" ||
        ticket.status === "PENDING" ||
        ticket.status === "IN PROGRESS"
    );
    const closedTickets = userTickets.filter(
      (ticket) => ticket.status === "CLOSED"
    );
    const inProgressTickets = userTickets.filter(
      (ticket) => ticket.status === "IN PROGRESS"
    );
    const activeServices = userTickets.filter(
      (ticket) => ticket.status === "PENDING"
    );

    return { openTickets, closedTickets, inProgressTickets, activeServices };
  } catch (error) {
    console.error("Error fetching ticket status:", error);
    return { response: "Error fetching ticket status" };
  }
};
