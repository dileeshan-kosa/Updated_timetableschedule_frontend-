import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setAdminDetails } from "../../store/adminSlice";
import { AiFillBell } from "react-icons/ai";
import { notification, Badge } from "antd"; // Import Ant Design notification
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const AdminDBHeader = () => {
  // State to store both availability and request notifications
  const [availabilityNotifications, setAvailabilityNotifications] = useState(
    []
  );
  const [requestNotifications, setRequestNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0); // Track unread notifications

  const admin = useSelector((state) => state?.user?.admin?.data);
  const dispach = useDispatch();
  const navigate = useNavigate();

  // Listen for notifications from the server via socket.io
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAvailabilityNotifications((prevNotifications) => {
        const updatedNotifications = [
          `${data.message} on ${data.date} at ${data.time}`,
          ...prevNotifications,
        ].slice(0, 10); // Keep the latest 10 availability notifications
        return updatedNotifications;
      });
      setUnreadCount((prevCount) => prevCount + 1); // Increment unread count on new notification
    });

    // Listen for request notifications from the server via socket.io
    socket.on("receive_MessageRequest", (data) => {
      setRequestNotifications((prevReqNotifications) => {
        const updatedReqNotifications = [
          `${data.message} on ${data.date} at ${data.time}`,
          ...prevReqNotifications,
        ].slice(0, 10); // Keep the latest 10 request notifications
        return updatedReqNotifications;
      });
      setUnreadCount((prevCount) => prevCount + 1); // Increment unread count on new notification
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receive_message");
      socket.off("receive_MessageRequest");
    };
  }, []);

  // Notification logic to open multiple notifications
  const [api, contextHolder] = notification.useNotification();

  // const openNotification = () => {
  //   if (unreadCount > 0) {
  //     // Loop through each unread notification and open a notification box
  //     notifications.slice(0, unreadCount).forEach((notificationText, index) => {
  //       api.open({
  //         message: `Notification ${index + 1}`,
  //         description: notificationText, // Show each notification
  //         duration: 0, // Notification stays until user closes it
  //       });
  //     });
  //     setUnreadCount(0); // Reset unread count after opening notifications
  //   } else {
  //     api.open({
  //       message: "No New Notifications",
  //       description: "There are currently no new notifications.",
  //       duration: 0,
  //     });
  //   }
  // };
  // Function to open availability notifications in red
  const openAvailabilityNotifications = () => {
    if (availabilityNotifications.length > 0) {
      availabilityNotifications.forEach((notificationText, index) => {
        api.open({
          message: `Availability Notification ${index + 1}`,
          description: notificationText, // Show each availability notification
          duration: 0, // Notification stays until user closes it
          style: { backgroundColor: "#FFCCCC" }, // Red background for availability notifications
        });
      });
    }
  };

  // Function to open request notifications in green
  const openRequestNotifications = () => {
    if (requestNotifications.length > 0) {
      requestNotifications.forEach((notificationText, index) => {
        api.open({
          message: `Request Notification ${index + 1}`,
          description: notificationText, // Show each request notification
          duration: 0, // Notification stays until user closes it
          style: { backgroundColor: "#CCFFCC" }, // Green background for request notifications
        });
      });
    }
  };

  // Open all notifications (both availability and request)
  const openAllNotifications = () => {
    openAvailabilityNotifications();
    openRequestNotifications();
    setUnreadCount(0); // Reset unread count after opening notifications
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/adminLogout",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        dispach(setAdminDetails(null));
        navigate("/");
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("cannot log out admin", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-3">
      {contextHolder} {/* Render the notification context */}
      <p className="text-center font-bold text-white text-5xl ml-96 mb-5">
        Admin
      </p>
      <div className="rounded-full relative flex items-center justify-center mb-5">
        <div className=" text-4xl cursor-pointer mt-1 ml-20 mr-14">
          {admin?.profilepic ? (
            <img
              src={admin?.profilepic}
              className="mr-6 w-16 h-16 rounded-full border-4 border-red-600"
              alt={admin.name}
            />
          ) : (
            <FaRegUserCircle />
          )}
        </div>
        <div className="mr-16">
          <Badge count={unreadCount} overflowCount={99}>
            <AiFillBell
              className="w-12 h-12 cursor-pointer"
              onClick={openAllNotifications} // Trigger notification on bell click
            />
          </Badge>
        </div>
        <NavLink className="mr-24">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-headingColor border border-purple-200 cursor-pointer"
          >
            Logout
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminDBHeader;
