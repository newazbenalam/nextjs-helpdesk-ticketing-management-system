"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCookies } from "@/app/lib/actions";
import { create } from "domain";
import { createTicket } from "@/app/tickets/hooks/createTicket";
import { Button } from "react-bootstrap";
import Image from "next/image";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import TicketTable from "@/app/Tickets/components/TickketTable";
import { revalidateLocalData } from "@/app/tickets/hooks/revelidateTickets";
import { useSearchParams } from "next/navigation";

export default function Tickets() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status") || "ALL";

  const [session, setSession] = useState(null);
  const [state, setState] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);

  const [formData, setFormData] = useState({
    email: session?.user?.email || "",
    subject: null,
    description: null,
    assign_to: "",
    assign_on: "",
    status: "OPEN",
    category: "GENERAL",
    priority: "LOW",
    ticketId: null,
  });

  // Use useEffect to fetch cookies (session data) when the component mounts
  useEffect(() => {
    var sessionData = null;
    const fetchCookies = async () => {
      sessionData = await getCookies();
      await setSession(sessionData);
      setEmail(sessionData?.user?.email);
    };
    fetchCookies();

    const prevData = JSON.parse(localStorage.getItem("ticket_data")) || [];
    console.log("Previous data: ", prevData);

    const revalidateData = async (prevDataReq) => {
      const dataResponse = await revalidateLocalData(prevDataReq, email);
      console.log("Data sessionData email: ", email);
      console.log("Previous dataResponse: ", dataResponse);
      if (statusFilter !== "ALL") {
        setTicketData(() => dataResponse.filter((data) =>( data.status === statusFilter)));
      } else {
        setTicketData(dataResponse);
      }
      // localStorage.setItem("ticket_data", JSON.stringify(dataResponse));
    };

    revalidateData(prevData);
    setIsLoading(false);
  }, [email, statusFilter]);
  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });

    const updatedFormData = { ...formData, [e.target.name]: e.target.value };

    if (session?.user) {
      updatedFormData.email = session.user.email;
      updatedFormData.ticketId = session.user.email;
    }
    setFormData(updatedFormData);
    // remove flash message
    setState(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let prevData = [];
    const { response, stateData } = await createTicket(formData);
    setState(response);

    if (response === "Ticket created successfully") {
      if (localStorage.getItem("ticket_data")) {
        prevData = JSON.parse(localStorage.getItem("ticket_data")) || [];
        if (!Array.isArray(prevData)) {
          prevData = [];
        }
      }
      prevData = [...prevData, stateData];
      if (!session?.user) {
        localStorage.setItem("ticket_data", JSON.stringify(prevData));
      }
      setTicketData(prevData);
      console.log("Ticket data: ", prevData);
      // clear all field values
      setFormData({
        email: session?.user?.email || "",
        subject: null,
        description: null,
        assign_to: "",
        assign_on: "",
        status: "OPEN",
        category: "GENERAL",
        priority: "LOW",
        ticketId: null,
      });
    }
  };

  const styles = {
    transitionAll: {
      transition: "all 0.3s ease-in-out",
    },
  };

  return (
    <>
      <div className="bg-white shadow-sm border-radius-xl py-4 py-lg-4 py-md-4 px-4 px-lg-4 px-sm-4 mt-4">
        <span className=" d-flex gap-3">
          <h6>  {statusFilter.charAt(0).toUpperCase() + statusFilter.substring(1).toLowerCase() } Tickets History</h6>{" "}
          {isLoading && (
            <div className="my-0 p-0">
              <LoadingSpinner className="small-spinner" />
            </div>
          )}
        </span>

        {!isLoading &&
          (Array.isArray(ticketData) && ticketData.length > 0 ? (
            <TicketTable
              ticketData={ticketData}
              classNamez="card"
              perPage="20"
            />
          ) : (
            isLoading && (
              <p className="p-3 pt-0 pb-2">
                You have no tickets at the moment.
              </p>
            )
          ))}
      </div>
    </>
  );
}
