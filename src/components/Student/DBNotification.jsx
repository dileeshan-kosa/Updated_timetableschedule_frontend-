import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const DBNotification = () => {
  // State to store notifications
  const [calandernotifications, setCalanderNotifications] = useState([]);

  useEffect(() => {
    // Listen for 'receive_message' event and update the notifications state
    socket.on("receive_CalanderMsg", (data) => {
      setCalanderNotifications((prevNotifications) => {
        // Limit notifications to the last 10
        const updatedNotifications = [
          `${data.message} on ${data.date} at ${data.time}`,
          ...prevNotifications,
        ].slice(0, 10); // Keep the latest 10 notifications
        return updatedNotifications;
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receive_CalanderMsg");
      // socket.off("receive_MessageRequest");
    };
  }, []);

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6  text-center text-black">
        Notifications
      </h1>
      <ul className="space-y-4 max-w-3xl mx-auto ml-20">
        {calandernotifications.length > 0 ? (
          calandernotifications.map((notification, index) => (
            <li
              key={index}
              className="p-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500 text-lg mb-2 transition-transform hover:-translate-y-1"
              style={{ whiteSpace: "pre-line" }}
            >
              <p className="text-blue-700 font-semibold">
                Notification {index + 1}
              </p>
              <p className="text-gray-700 mt-2">{notification}</p>
            </li>
          ))
        ) : (
          <p className="text-lg text-center text-gray-500">
            No new notifications
          </p>
        )}
      </ul>
    </div>
  );
};

export default DBNotification;
