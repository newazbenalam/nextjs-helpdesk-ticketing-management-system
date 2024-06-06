"use client";

import "@/app/globals.css";
import React, { use, useEffect, useState } from "react";
import { getTicketsStatus } from "./hooks/GetTicketsStatus";
import LoadingSpinner from "../components/LoadingSpinner";
import { getCookies } from "@/app/lib/actions";
import TicketTable from "../Tickets/components/TickketTable";
import { revalidateLocalData } from "../tickets/hooks/revelidateTickets";
import Link from "next/link";

export default function Dashboard() {
  const [openTickets, setOpenTickets] = useState(<LoadingSpinner />);
  const [closedTickets, setClosedTickets] = useState(<LoadingSpinner />);
  const [customerSupport, setCustomerSupport] = useState(<LoadingSpinner />);
  const [servicesStatus, setServicesStatus] = useState(<LoadingSpinner />);
  const [ticketData, setTicketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    var sessionData;
    const prevData = JSON.parse(localStorage.getItem("ticket_data")) || [];
    console.log("Previous data: ", prevData);

    const fetchTickets = async (prevDataReq) => {
      sessionData = await getCookies();
      const { openTickets, closedTickets, inProgressTickets, activeServices } =
        await getTicketsStatus(sessionData?.user?.id);
      setOpenTickets(openTickets?.length || 0);
      setClosedTickets(closedTickets?.length || 0);
      setCustomerSupport(inProgressTickets?.length || 0);
      setServicesStatus(activeServices?.length || 0);
      setEmail(sessionData?.user?.email);

      // const dataResponse = await revalidateLocalData(prevDataReq, email);
      console.log("Data sessionData email: ", email);
      // console.log("Previous dataResponse: ", dataResponse);
      // setTicketData(() => openTickets.filter((data) =>( data.priority === "HIGH")));
      // sort by decening order tickets id
      setTicketData(openTickets?.sort((a, b) => b.id - a.id).slice(0, 15));
    };

    // revalidateData(prevData);
    fetchTickets(prevData);
    setIsLoading(false);
  }, [email]);

  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <Link
                    href={"/dashboard/tickets/lists?status=OPEN"}
                    className="hover-decorate"
                  >
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        {"Open Tickets"}
                      </p>
                      <h5 className="font-weight-bolder pl-1">{openTickets}</h5>
                      <p className="mb-0">
                        <span className="text-success text-sm font-weight-bolder">
                          {/* +55% */}
                        </span>
                        Total open tickets
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                    <i
                      className="ni ni-money-coins text-lg opacity-10"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <Link
                    href={"/dashboard/tickets/lists?status=CLOSED"}
                    className="hover-decorate"
                  >
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        {" Closed Tickets"}
                      </p>
                      <h5 className="font-weight-bolder pl-1">
                        {closedTickets}
                      </h5>
                      <p className="mb-0">
                        <span className="text-success text-sm font-weight-bolder">
                          {/* +3% */}
                        </span>
                        Total closed tickets
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                    <i
                      className="ni ni-world text-lg opacity-10"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Customers Support
                    </p>
                    <h5 className="font-weight-bolder pl-1">
                      {customerSupport}
                    </h5>
                    <p className="mb-0">
                      <span className="text-danger text-sm font-weight-bolder">
                        {/* -2% */}
                      </span>
                      Last online 30 minutes ago
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                    <i
                      className="ni ni-paper-diploma text-lg opacity-10"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Services Status
                    </p>
                    <h5 className="font-weight-bolder pl-1">
                      {servicesStatus}
                    </h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        {/* +5% */}
                      </span>{" "}
                      Current active issues
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                    <i
                      className="ni ni-check-bold text-lg opacity-10"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row mt-4 h-100">
        <div className="col-lg-7 mb-lg-0 mb-4">
          <div className="card z-index-2 h-100">
            <div className="card-header pb-0 pt-3 bg-transparent">
              <h6 className="text-capitalize">Latest updates</h6>
            </div>
            <div className="card-body p-3">
              <div className="chart">
                <canvas
                  id="chart-line"
                  className="chart-canvas"
                  height="300"
                ></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card card-carousel overflow-hidden h-100 p-0">
            <div
              id="carouselExampleCaptions"
              className="carousel slide h-100"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner border-radius-lg h-100">
                <div
                  className="carousel-item h-100 active"
                  style={{
                    backgroundImage: 'url("/assets/img/carousel-1.jpg")',
                    backgroundSize: "cover",
                  }}
                >
                  <div className="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                    <div className="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                      <i className="ni ni-camera-compact text-dark opacity-10"></i>
                    </div>
                    <h5 className="text-white mb-1">Get started with Argon</h5>
                    <p>
                      There’s nothing I really wanted to do in life that I
                      wasn’t able to get good at.
                    </p>
                  </div>
                </div>
                <div
                  className="carousel-item h-100"
                  style={{
                    backgroundImage: 'url("/assets/img/carousel-2.jpg")',
                    backgroundSize: "cover",
                  }}
                >
                  <div className="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                    <div className="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                      <i className="ni ni-bulb-61 text-dark opacity-10"></i>
                    </div>
                    <h5 className="text-white mb-1">
                      Faster way to create web pages
                    </h5>
                    <p>
                      That’s my skill. I’m not really specifically talented at
                      anything except for the ability to learn.
                    </p>
                  </div>
                </div>
                <div
                  className="carousel-item h-100"
                  style={{
                    backgroundImage: 'url("/assets/img/carousel-3.jpg")',
                    backgroundSize: "cover",
                  }}
                >
                  <div className="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                    <div className="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                      <i className="ni ni-trophy text-dark opacity-10"></i>
                    </div>
                    <h5 className="text-white mb-1">
                      Share with us your design tips!
                    </h5>
                    <p>
                      Don’t be afraid to be wrong because you can’t learn
                      anything from a compliment.
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev w-5 me-3"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next w-5 me-3"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row mt-4">
        <div className="col-lg-7 mb-lg-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pb-2">
              <h6 className="mb-0">Tickets History</h6>
            </div>
            {isLoading && (
              <div className="pl-3 pb-3">
                <LoadingSpinner className="small-spinner" />
              </div>
            )}
            {!isLoading &&
              (Array.isArray(ticketData) && ticketData.length > 0 ? (
                <TicketTable ticketData={ticketData} className="z-index-0" />
              ) : (
                <p className="p-3 pt-0 pb-2">
                  You have no tickets at the moment.
                </p>
              ))}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card">
            <div className="card-header pb-0 p-3">
              <h6 className="mb-0">Categories</h6>
            </div>
            <div className="card-body p-3">
              <ul className="list-group">
                
                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div className="d-flex align-items-center">
                    <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                      <i className="ni ni-tag text-white opacity-10"></i>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark text-sm">Tickets</h6>
                      <span className="text-xs">
                        { closedTickets } closed,{" "}
                        <span className="font-weight-bold"> {openTickets } open</span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
                      <i className="ni ni-bold-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </li>
                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div className="d-flex align-items-center">
                    <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                      <i className="ni ni-box-2 text-white opacity-10"></i>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark text-sm">Error logs</h6>
                      <span className="text-xs">
                        0 is active,{" "}
                        <span className="font-weight-bold">4 closed</span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
                      <i className="ni ni-bold-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      {/* <LogOutButton /> */}
    </>
  );
}
