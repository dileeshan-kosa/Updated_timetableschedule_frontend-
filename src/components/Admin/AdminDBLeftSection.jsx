import React, { useState } from "react";
import { Logo2 } from "../../assets";
import { NavLink } from "react-router-dom";

const AdminDBLeftSection = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [isFocuss, setIsFocuss] = useState(false);
  const [isFocusss, setIsFocusss] = useState(false);
  const [isfour, setIsfour] = useState(false);
  const [isfive, setIsfive] = useState(false);
  const [issixs, setIssixs] = useState(false);
  const [isseven, setIsseven] = useState(false);


  return (
    <div className="h-full py-12 bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3 overflow-auto">
      <div to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo2} className="w-32" alt="" />
      </div>

      <div className="gap-10 m-14">
        {/* firt button  */}
        <NavLink
          to={"/admindashboard/managelecture"}
          className={`flex px-13 items-center justify-center p-2 bg-blue-800 text-white font-semibold rounded py-4 cursor-pointer hover:bg-blue-950 mb-24 ${
            isFocus ? "shadow-md shadow-red-500" : "shadow-none"
          }`}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        >
          <p>Manage Lectures</p>
        </NavLink>

        {/* second button */}
        <NavLink
          to={"/admindashboard/managestudent"}
          className={`flex px-13 items-center justify-center p-2 bg-blue-800 text-white font-semibold rounded py-4 cursor-pointer hover:bg-blue-950 mb-24 ${
            isFocuss ? "shadow-md shadow-red-500" : "shadow-none"
          }`}
          onFocus={() => setIsFocuss(true)}
          onBlur={() => setIsFocuss(false)}
        >
          <p>Manage Students</p>
        </NavLink>

        {/* 3rd button  */}
        <NavLink
          to={"/admindashboard/managemodule"}
          className={`flex px-13 items-center justify-center p-2 bg-blue-800 text-white font-semibold rounded py-4 cursor-pointer hover:bg-blue-950 mb-24 ${
            isFocusss ? "shadow-md shadow-red-500" : "shadow-none"
          }`}
          onFocus={() => setIsFocusss(true)}
          onBlur={() => setIsFocusss(false)}
        >
          <p>Manage Modules</p>
        </NavLink>

        {/* 4th Button  */}
        <NavLink
          to={"/admindashboard/managelacturehall"}
          className={`flex px-13 items-center justify-center p-1 bg-blue-800 text-white font-semibold rounded py-4 cursor-pointer hover:bg-blue-950 mb-24 ${
            isfive ? "shadow-md shadow-red-500" : "shadow-none"
          }`}
          onFocus={() => setIsfive(true)}
          onBlur={() => setIsfive(false)}
        >
          <p>Manage Lecture Halls</p>
        </NavLink>

        {/* 5th Button  */}
        <NavLink
          to={"/admindashboard/generatetimetable"}
          className={`flex px-13 items-center justify-center p-2 bg-blue-800 text-white font-semibold rounded py-4 cursor-pointer hover:bg-blue-950 mb-24 ${
            issixs ? "shadow-md shadow-red-500" : "shadow-none"
          }`}
          onFocus={() => setIssixs(true)}
          onBlur={() => setIssixs(false)}
        >
          <p>Generate Timetable</p>
        </NavLink>

        {/* 6th Button  */}
        <NavLink
          to={"/admindashboard/managetimetable"}
          className={`flex px-13 items-center justify-center p-2 bg-blue-800 text-white font-semibold rounded py-4 cursor-pointer hover:bg-blue-950 mb-24 ${
            isseven ? "shadow-md shadow-red-500" : "shadow-none"
          }`}
          onFocus={() => setIsseven(true)}
          onBlur={() => setIsseven(false)}
        >
          <p>Manage Timetable</p>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminDBLeftSection;
