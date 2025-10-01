import React, { useState } from "react";
import { Logo2 } from "../../assets";
import { NavLink } from "react-router-dom";

const LecturerLeftSection = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="h-full py-12 bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3 overflow-auto">
      <div to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo2} className="w-32" alt="" />
      </div>

      <ul className="flex flex-col gap-36 mt-20 mb-auto px-14">
        <NavLink
          to={"/lecturerdashboard/lecCalendar"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard/calendar" ? "bg-blue-950" : "bg-blue-800"
          } text-white hover:bg-blue-950`}
          onClick={() => handleLinkClick("/dashboard/calendar")}
          // className="flex items-center justify-center p-2 bg-blue-800 text-white font-semibold rounded py-4 cursor-pointer hover:bg-blue-950"
        >
          <span>Calendar</span>
        </NavLink>

        <NavLink
          to={"/lecturerdashboard/lecAvailability"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard/availability"
              ? "bg-blue-950"
              : "bg-blue-800"
          } text-white hover:bg-blue-950`}
          onClick={() => handleLinkClick("/dashboard/availability")}
          // className="flex items-center justify-center p-2 bg-blue-800 font-semibold text-white rounded py-4 px-12 cursor-pointer hover:bg-blue-950"
        >
          <span>Availability</span>
        </NavLink>

        <NavLink
          to={"/lecturerdashboard/lecFeedback"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard/feedback" ? "bg-blue-950" : "bg-blue-800"
          } text-white hover:bg-blue-950`}
          onClick={() => handleLinkClick("/dashboard/feedback")}
          // className="flex items-center justify-center p-2 bg-blue-800 font-semibold text-white rounded py-4 cursor-pointer hover:bg-blue-950"
        >
          <span>Feedback</span>
        </NavLink>

        <NavLink
          to={"/lecturerdashboard/lecRequest"}
          className={`flex items-center justify-center p-2 font-semibold rounded py-4 cursor-pointer ${
            activeLink === "/dashboard/request" ? "bg-blue-950" : "bg-blue-800"
          } text-white hover:bg-blue-950`}
          onClick={() => handleLinkClick("/dashboard/request")}
          // className="flex items-center justify-center p-2 bg-blue-800 font-semibold text-white rounded py-4 cursor-pointer hover:bg-blue-950"
        >
          <span>Request</span>
        </NavLink>
      </ul>
    </div>
  );
};

export default LecturerLeftSection;
