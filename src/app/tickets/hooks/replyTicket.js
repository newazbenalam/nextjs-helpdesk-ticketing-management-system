"use server";

import db from "@/app/lib/db";

export const replyTicket = async (ticketId, message, session) => {
  try {
    const result = await db.tickets.update({
      where: {
        id: parseInt(ticketId),
      },
      data: {
        messages: {
          create: {
            message: message,
            owner: session?.user?.name,
            data: session?.user?.email,
          },
        },
      },
      select: {
        users: true,
      },
    });
    // console.log("Replying to ticket result: ", message, );
    return { response: "Ticket replied successfully", stateData: result , messageRelay: message, responseCode: 200 };
  } catch (error) {
    console.error("Replying to ticket error logs: ", error);
    return { response: "Error replying to ticket" };
  }
};

export const getTicketMessages = async (ticketId) => {
  try {
    const ticketMessages = await db.tickets.findUnique({
      where: {
        id: ticketId,
      },
      include: {
        users: true,
        messages: {
          include: {
            attachments: true,
            tickets: {
              include: {
                users: true,  // Include user information related to the ticket
              }
            }
          },
        },
      },
    });
    return ticketMessages;
  } catch (error) {
    console.error("Getting ticket messages error logs: ", error);
    return { response: "Error getting ticket messages" };
  }
};