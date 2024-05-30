"use server";

import db from "@/app/lib/db";

export const createTicket = async (formData) => {
  try {
    const {
      email,
      subject,
      description,
      assign_to,
      assign_on,
      status,
      category,
      priority,
      ticketId,
    } = formData;

    if (!email || !subject || !description) {
      return { response: "Missing required fields" };
    }

    let userData = null;
    if (ticketId != null) {
      userData = await db.users.findFirst({
        where: {
          email: ticketId,
        },
      });
    }

    const result = await db.tickets.create({
      data: {
        email: email,
        subject: subject,
        description: description,
        assign_to: assign_to || null,
        assign_on: assign_on || null,
        status: status || "OPEN",
        category: category || "GENERAL",
        priority: priority || "LOW",
        ticketId: userData?.id || null,
      },
    });

    // console.log(result);
    return { response: "Ticket created successfully", stateData: result};
  } catch (error) {
    console.log("Creating tickets form data: ", formData);
    console.error("Creating tickets error logs: ", error);
    return { response: "Error creating ticket"};
  }
};
