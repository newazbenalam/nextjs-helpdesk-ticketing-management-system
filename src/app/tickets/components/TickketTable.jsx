"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookies } from "@/app/lib/actions";

export default function TicketTable({ ticketData, classNamez, params, perPage = 8 }) {
  const router = useRouter();
  const [order, setOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("");
  const [parsedTicketData, setParsedTicketData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationState, setPaginationState] = useState(false);
  const itemsPerPage = perPage;
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const sessionData = await getCookies();
      setSession(sessionData);
    };
    fetchUser();
    setParsedTicketData(ticketData);
    if (ticketData.length > itemsPerPage) {
      setPaginationState(true);
    }
    // restore sorted column from local storage
    const persistSort = (col) => {
      // save col to local storage
      const persistOrder = localStorage.getItem("order");
      const sortedData = [...ticketData].sort((a, b) => {
        if (persistOrder === "asc") {
          return a[col] > b[col] ? 1 : -1;
        } else {
          return a[col] < b[col] ? 1 : -1;
        }
      });
      setOrder(persistOrder);
      setSortedColumn(col);
      setParsedTicketData(sortedData);
    };

    const persistCol = localStorage.getItem("sortedColumn");
    if (persistCol) {
      persistSort(persistCol);
    }
  }, [order, ticketData]);

  const sort = (col) => {
    // save col to local storage
    localStorage.setItem("sortedColumn", col);
    const sortedData = [...ticketData].sort((a, b) => {
      if (order === "asc") {
        return a[col] > b[col] ? 1 : -1;
      } else {
        return a[col] < b[col] ? 1 : -1;
      }
    });
    setOrder(order === "asc" ? "desc" : "asc");
    localStorage.setItem("order", order === "asc" ? "desc" : "asc");
    setSortedColumn(col);
    setParsedTicketData(sortedData);
  };

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
        return "text-success text-xs";
      case "MEDIUM":
        return "text-secondary text-xs";
      default:
        return "text-danger text-xs";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "TECHNICAL":
        return "text-warning hover:bg-grey";
      case "GENERAL":
        return "text-primary hover:bg-grey";
      default:
        return "text-danger hover:bg-grey";
    }
  };

  const getArrow = (col) => {
    if (sortedColumn === col) {
      return order === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(ticketData.length / itemsPerPage);
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers;
  };

  // Calculate the current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = parsedTicketData.slice(startIndex, endIndex);

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

  const pathname = usePathname();
  const handleRowClick = (ticketId) => {
    if (session) router.push(`/dashboard/tickets/${ticketId}`);
    else {
      router.push(`${pathname}/${ticketId}`);
    }
  };

  return (
    <>
      <div className={classNamez}>
        <div className="table-responsive">
          <table className="table align-items-center mb-0 table-hover hover">
            <thead>
              <tr>
                <th
                  onClick={() => sort("id")}
                  className="text-uppercase text-secondary text-xxs font-weight-bolder cursor-pointer"
                >
                  TICKET ID {getArrow("id")}
                </th>
                <th
                  onClick={() => sort("subject")}
                  className="text-uppercase text-secondary text-xxs font-weight-bolder cursor-pointer"
                >
                  Subject {getArrow("subject")}
                </th>
                <th
                  onClick={() => sort("category")}
                  className="text-uppercase text-secondary text-xxs font-weight-bolder cursor-pointer ps-2"
                >
                  Department {getArrow("category")}
                </th>
                <th
                  onClick={() => sort("priority")}
                  className="text-uppercase text-secondary text-xxs font-weight-bolder cursor-pointer ps-2"
                >
                  Priority {getArrow("priority")}
                </th>
                <th
                  onClick={() => sort("status")}
                  className="text-uppercase text-secondary text-xxs font-weight-bolder cursor-pointer ps-2"
                >
                  Status {getArrow("status")}
                </th>
                <th
                  onClick={() => sort("description")}
                  className="text-uppercase text-secondary text-xxs font-weight-bolder cursor-pointer ps-2"
                >
                  Description {getArrow("description")}
                </th>
                <th
                  onClick={() => sort("createdAt")}
                  className="text-uppercase text-secondary text-xxs font-weight-normal cursor-pointer ps-2"
                >
                  Created At {getArrow("createdAt")}
                </th>
                <th style={{ maxWidth: "5px" }}></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentItems) &&
                currentItems.map((ticket, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(ticket.id)}
                    className="cursor-pointer"
                  >
                    <td>
                      <div className="d-flex px-2">
                        <div className="my-auto pl-0">
                          <h6 className="mx-2 mb-0 text-xs">{ticket?.id}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex px-2">
                        <div className="my-auto pl-0">
                          <h6
                            className="mx-2 mb-0 text-xs text-truncate bg-black:hover hover:text-white"
                            style={{
                              maxWidth: "180px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {ticket?.subject}
                          </h6>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-dot me-4 border border-gray-700">
                        <i className="bg-info"></i>
                        <span
                          className={getCategoryColor(
                            ticket?.category || "GENERAL"
                          )}
                        >
                          {ticket?.category + " "}
                        </span>
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-dot me-4 border border-gray-700">
                        <i className="bg-info"></i>
                        <span
                          className={getPriorityColor(
                            ticket?.priority || "MEDIUM"
                          )}
                        >
                          {ticket?.priority + " "}
                        </span>
                      </span>
                    </td>
                    <td className="text-sm">
                      <span className={getStatusColor(ticket?.status)}>
                        {ticket?.status + " "}
                      </span>
                    </td>
                    <td>
                      <h6
                        className="mb-0 text-xs text-truncate"
                        style={{
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {ticket?.description}
                      </h6>
                    </td>
                    <td>
                      <h6
                        className="mb-0 text-xs text-truncate"
                        style={{
                          maxWidth: "150px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {formatDate(ticket?.createdAt)}
                      </h6>
                    </td>
                    <td className="align-middle">
                      <button className="btn btn-link text-secondary mb-0">
                        <i
                          className="fa fa-ellipsis-v text-xs"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {paginationState && (
        <div className="d-flex justify-content-center pagination mt-2">
          <button
            className="btn btn-primary p-2 text-xs text-white mx-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {generatePageNumbers().map((page, index) => (
            <button
              key={index}
              className={`btn bg-primary p-2 text-xs mx-1 text-white ${
                page === currentPage ? "bg-secondary " : ""
              }`}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-primary p-2 text-xs text-white mx-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= ticketData.length}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
