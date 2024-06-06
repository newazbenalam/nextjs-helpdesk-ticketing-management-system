"use client";

import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { getCookies } from "@/app/lib/actions";
import { getTicketDeailsById } from "@/app/hooks/GetTicketsDetailById";
import Image from "next/image";
import LoadingSpinner from "@/app/components/LoadingSpinner";

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

  useEffect(() => {
    const fetchUser = async () => {
      const sessionData = await getCookies();
      setSession(sessionData);
      const resId = await getTicketDeailsById(parseInt(id));
      setTicketData(resId);
    };
    fetchUser();
  }, [id]);

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

  return (
    <div
      className="page-header px-sm-2 px-md-4 px-lg-6 px-4"
    >
      <div className="container px-0 px-lg-4 my-8">
        <div className="card col-12 py-1 ">
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
          <div className="card  p-2 z-index-1">
            <div className="card-header mb-0 pb-0 d-flex flex-row justify-content-between z-index-3 ">
              <div className="col-lg-10 col-6 d-flex align-baseline px-0 text-truncate overflow-auto">
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
                  <h6 className="text-sm m-0 ">
                    {!ticketData?.email ? (
                      <LoadingSpinner />
                    ) : (
                      session?.user?.name || "Anonymous"
                    )}
                  </h6>
                  <div className="text-sm m-0">
                    {!ticketData?.email ? (
                      <LoadingSpinner />
                    ) : (
                      ticketData?.email
                    )}
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

          <div className="card my-3 p-4">
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
            </div>

            <div className=" d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex flex-row gap-2">
                <div className="d-flex flex-row gap-2">
                  {/* <button className="btn bg-gradient-primary btn-sm">
                  Close
                </button> */}
                </div>
              </div>
              <div className="d-flex flex-row gap-2">
                {/* <button className="btn bg-gradient-primary btn-sm">Delete</button> */}
                <button className="btn bg-gradient-primary btn-sm">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
