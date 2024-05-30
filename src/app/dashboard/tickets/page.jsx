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

export default function Tickets() {
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
      setTicketData(dataResponse);
      // localStorage.setItem("ticket_data", JSON.stringify(dataResponse));
    };

    revalidateData(prevData);
    setIsLoading(false);
  }, [email, formData]);

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
      <div
        className=" min-vh-100 px-sm-2 px-md-4 px-lg-8 px-4 "
        style={styles.transitionAll}
      >
        <div className="container px-0 px-lg-4 my-8">
          <div className="bg-white shadow-sm border-radius-xl py-4 py-lg-4 py-md-4 px-4 px-lg-4 px-sm-4">
            <form onSubmit={handleSubmit}>
              {session && <h6>Welcome, {session?.user?.name}</h6>}
              <h6>Create New Ticket</h6>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Email address</label>
                <input
                  value={email || formData.email || ""}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Subject</label>
                <input
                  value={formData.subject || ""}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="Subject"
                  onChange={handleChange}
                  name="subject"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Priority</label>
                <select
                  value={formData.priority || "LOW"}
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={handleChange}
                  name="priority"
                >
                  <option>LOW</option>
                  <option>MEDIUM</option>
                  <option>HIGH</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Category</label>
                <select
                  value={formData.category || "GENERAL"}
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={handleChange}
                  name="category"
                >
                  <option>GENERAL</option>
                  <option>TECHNICAL</option>
                  <option>SALES</option>
                  <option>BILLING</option>
                  <option>ACCOUNT</option>
                  <option>OTHER</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Description</label>
                <textarea
                  value={formData.description || ""}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Please describe your issue here..."
                  onChange={handleChange}
                  name="description"
                ></textarea>
              </div>
              <Button className="btn btn-primary" type="submit">
                Submit
              </Button>
            </form>
            {state && (
              <p className="alert-info text-white text-lg px-4 py-2 border-radius-md">
                {state}
              </p>
            )}
          </div>

          <div className="bg-white shadow-sm border-radius-xl py-4 py-lg-4 py-md-4 px-4 px-lg-4 px-sm-4 mt-4">
            <span className="d-flex gap-3">
              <h6>Tickets History</h6>{" "}
              {isLoading && (
                <div className="my-0 p-0">
                  <LoadingSpinner className="small-spinner" />
                </div>
              )}
            </span>

            {!isLoading && (
            Array.isArray(ticketData) && ticketData.length > 0 ? (
              <TicketTable ticketData={ticketData} />
            ) : (
              <p>You have no tickets at the moment.</p>
            )
          )}
          </div>
        </div>
      </div>
    </>
  );
}

