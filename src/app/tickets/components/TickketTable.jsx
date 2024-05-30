import React from "react";

export default function TickketTable({ ticketData }) {
  const styles = {
    transitionAll: {
      transition: "all 0.3s ease-in-out",
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "badge badge-sm badge-success opacity-8"; // Assuming you want "OPEN" status to have primary color
      case "CLOSED":
        return "badge badge-sm badge-secondary opacity-8"; // Assuming you want "CLOSED" status to have success color
      case "RESOLVED":
        return "badge badge-sm badge-primary opacity-8"; // Assuming you want "CLOSED" status to have success color
      default:
        return "badge badge-sm badge-warning opacity-8"; // Default color for other statuses
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "text-success text-xs"; // Assuming you want "HIGH" priority to have danger color
      case "MEDIUM":
        return "text-secondary text-xs"; // Assuming you want "MEDIUM" priority to have warning color
      default:
        return "text-danger text-xs"; // Default color for other priorities
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "TECHNICAL":
        return "text-warning hover:bg-grey"; // Assuming you want "TECHNICAL" category to have info color
      case "GENERAL":
        return "text-primary hover:bg-grey"; // Assuming you want "SALES" category to have success color
      default:
        return "text-danger hover:bg-grey"; // Default color for other categories
    }
  };
  return (
    <>
      <div className="card">
        <div className="table-responsive">
          <table className="table align-items-center mb-0 table-hover hover">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder ">
                  TICKET ID
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder ">
                  Subject
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                  Category
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                  Priority
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                  Status
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">
                  Description
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody style={styles.transitionAll}>
              {Array.isArray(ticketData) &&
                ticketData.map((ticket, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex px-2">
                        <div className="my-auto pl-0">
                          <h6
                            className="mx-2 mb-0 text-xs"
                          >
                            {ticket?.id}
                          </h6>
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
                      <span className="badge badge-dot me-4  border border-gray-700">
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
                      <span className="badge badge-dot me-4  border border-gray-700">
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
                    <td className=" text-sm">
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
    </>
  );
}
