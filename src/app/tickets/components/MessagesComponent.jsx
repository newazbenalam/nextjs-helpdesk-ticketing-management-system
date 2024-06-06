import { useEffect, useState } from "react";
import Image from "next/image"; // Adjust the import path based on your project structure

const MessagesComponent = ({ id, getTicketMessages, avatarPic, formatDate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [replyData, setReplyData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
 

        const messagesResponse = await getTicketMessages(parseInt(id));
        console.log("messages Data: ", messagesResponse); // Log the response here
        setMessages(messagesResponse);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false); // Set loading to false in the finally block to ensure it's called regardless of success or failure
      }
    };

    fetchUser();
  }, [id, getTicketMessages ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderMessages = () => {
    const messageElements = [];
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      messageElements.push(
        <div key={i} className="card my-3 p-4 pb-1">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row gap-2">
              <div className="d-flex flex-row gap-2">
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
                  <h6 className="text-sm m-0">{message?.name || ""}</h6>
                  <div className="text-sm m-0">{message?.email || ""}</div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row gap-2">
              <span className="text-sm font-weight-bold">
                {formatDate(message?.createdAt)}
              </span>
            </div>
          </div>
          <hr
            className="horizontal bg-primary mb-2"
            style={{ height: "1px" }}
          />
          <div>
            <h6 className="text-sm m-0"> </h6>
            <div className="text-sm font-weight-medium">
              {message?.message || ""}
            </div>
          </div>
        </div>
      );
    }
    return messageElements;
  };

  return (
    <>
      {renderMessages()}
      {replyData && (
        <div className="card my-3 p-4 pb-1">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row gap-2">
              <div className="d-flex flex-row gap-2">
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
                  <h6 className="text-sm m-0">{session?.user?.name || ""}</h6>
                  <div className="text-sm m-0">{session?.user?.email || ""}</div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row gap-2">
              <span className="text-sm font-weight-bold">
                {formatDate(replyData?.createdAt)}
              </span>
            </div>
          </div>
          <hr
            className="horizontal bg-primary mb-2"
            style={{ height: "1px" }}
          />
          <div>
            <h6 className="text-sm m-0"> </h6>
            <div className="text-sm font-weight-medium">
              {replyData?.message || ""}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagesComponent;
