"use client";

import useSWR from 'swr'
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { getCookies } from "@/app/lib/actions";
import { getTicketDeailsById } from "@/app/hooks/GetTicketsDetailById";
import Image from "next/image";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import {
  replyTicket,
  getTicketMessages,
} from "@/app/tickets/hooks/replyTicket";


export default function Page({ params }) {
  const avatarPic =
    "https://demos.creative-tim.com/argon-dashboard-pro/assets/img/team-3.jpg";
  const id = params.slug;
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    message: "",
  });
  const [ticketData, setTicketData] = useState({
    subject: <LoadingSpinner />,
    description: <LoadingSpinner />,
    status: <LoadingSpinner />,
    priority: <LoadingSpinner />,
    category: <LoadingSpinner />,
    createdAt: <LoadingSpinner />,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [replyData, setReplyData] = useState(null);
  const [messages, setMessages] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const sessionData = await getCookies();
      setSession(sessionData);
      const resId = await getTicketDeailsById(parseInt(id));
      setTicketData(resId);
      const messagesResponse = await getTicketMessages(parseInt(id));
      setMessages(messagesResponse.messages);
      setTimeout(function() {
        setTimer(timer + 1);
      }, 300000);
    };
    fetchUser();
    setIsLoading(false);
    // console.log("messages Data: ", messages);
  }, [id, replyData, timer]);

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "badge badge-sm badge-success opacity-8";
      case "CLOSED":
        return "badge badge-sm badge-secondary opacity-8";
      case "RESOLVED":
        return "badge badge-sm badge-primary opacity-8";
      default:
        return "badge badge-sm badge-warning opacity-8";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "text-primary  badge badge-sm  bg-gradient-light";
      case "MEDIUM":
        return "text-secondary bagde badge-sm badge bg-gradient-light ";
      default:
        return "text-danger bagde badge-sm badge bg-gradient-light ";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "TECHNICAL":
        return "text-warning badge badge-sm  py-1 font-weight-bold border border-primary border-radius-md  ";
      case "GENERAL":
        return "text-primary badge badge-sm  py-1 font-weight-bold border border-primary border-radius-md ";
      default:
        return "text-danger badge badge-sm  py-1 font-weight-bold border border-primary border-radius-md ";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { response, stateData, messageRelay, responseCode } = await replyTicket(id, formData?.message, session);
    if (responseCode == 200){
      setReplyData(stateData);
    }
    setIsLoading(false);
    setFormData({ message: "" });
    console.log("Reply Data: ", messages?.tickers);
  };


  return (
    <div className="card col-lg-9 col-12 py-1 ">
      <div className="d-flex flex-row justify-content-between mx-2">
        <h6 className="text-sm mt-2">Ticket ID: {id}</h6>
        <h6 className="text-sm mt-2 opacity-7">
          {!ticketData?.updatedAt ? (
            <LoadingSpinner />
          ) : (
            formatDate(ticketData?.createdAt)
          )}
        </h6>
      </div>
      <div className="card pb-3 z-index-0">
        <div className="card-header mb-0 pb-0 d-flex flex-row justify-content-between z-index-3 ">
          <div className="col-lg-10 col-6 d-flex align-baseline px-0">
            <div>
              <Image
                className="avatar avatar-md me-2"
                width={30}
                height={30}
                src={avatarPic}
                alt=""
              />
            </div>
            <div>
              <h6 className="text-sm m-0">
                {!ticketData?.email ? <LoadingSpinner /> : session?.user?.name}
              </h6>
              <div className="text-sm m-0">
                {!ticketData?.email ? <LoadingSpinner /> : ticketData?.email}
              </div>
            </div>
          </div>
          <div className="d-flex  flex-row gap-2 text-sm align-items-start">
            <span className={getStatusColor(ticketData?.status || "")}>
              {!ticketData?.updatedAt ? (
                <LoadingSpinner />
              ) : (
                ticketData?.status + " " || ""
              )}
            </span>
            <span className={getPriorityColor(ticketData?.priority || "")}>
              {!ticketData?.updatedAt ? (
                <LoadingSpinner />
              ) : (
                ticketData?.priority + " " || ""
              )}
            </span>
          </div>
        </div>
        <div className="card-body my-0 py-0">
          <hr
            className="horizontal bg-primary mb-2"
            style={{ height: "1px" }}
          />
          <div className="d-flex flex-row justify-content-between align-items-start">
            <div className="d-flex flex-col gap-2">
              <h6 className="text-sm m-0">Subject: </h6>
              <h className="text-sm m-0 font-weight-bold">
                {ticketData?.subject || "email@neomail.com"}
              </h>
            </div>
            <span className={getCategoryColor(ticketData?.category || "")}>
              {!ticketData?.updatedAt ? (
                <LoadingSpinner />
              ) : (
                ticketData?.category + " "
              )}
            </span>
          </div>
          <hr
            className="horizontal bg-primary mb-2 mt-2"
            style={{ height: "1px" }}
          />
          <div>
            <h6 className="text-sm m-0"> </h6>
            <div className=" text-sm font-weight-medium ">
              {ticketData?.description || ""}
            </div>
          </div>
          {/* <hr className="horizontal bg-primary mb-2" style={{ height: "1px" }} /> */}
        </div>
      </div>



      {Array.isArray(messages) &&
        messages.map((message, index) => (
          <div key={index} className={(session?.user?.email === message?.data) ? `bg-gray-200 card z-index-1 mt-3 p-3 ` :` card z-index-1 mt-3 p-3`}>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex flex-row gap-2">
                <div>
                  <Image
                    className="avatar avatar-xs me-2"
                    width={30}
                    height={30}
                    src={avatarPic}
                    alt=""
                  />
                </div>
                <div>
                  <h6 className="text-sm m-0">{message?.owner || ""}</h6>
                  <div className="text-sm m-0">{message?.data || ""}</div>
                </div>
              </div>
              <div className="d-flex flex-row gap-2">
                <span className="text-sm font-weight-bold">
                  {formatDate(message?.createdAt)}
                </span>
              </div>
            </div>
            <hr
              className="horizontal bg-primary mb-1"
              style={{ height: "1px" }}
            />
            <div>
              <div className="text-sm font-weight-medium">
                {message?.message || ""}
              </div>
            </div>
          </div>
        ))}
    

      <div className="card my-3 p-4 pb-1">
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Reply</label>
          <textarea
            value={formData.message || ""}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="8"
            placeholder="Reply to this message here..."
            onChange={handleChange}
            name="message"
          ></textarea>
          <div className="d-flex flex-row mt-4 mb-0 pb-0 justify-content-end">
            <button
              type="submit"
              className="btn bg-gradient-primary btn-sm"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Reply
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
