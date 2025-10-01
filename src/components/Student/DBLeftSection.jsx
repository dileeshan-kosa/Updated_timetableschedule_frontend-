import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo2 } from "../../assets";
import { motion } from "framer-motion";

const DBLeftSection = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [isFocuss, setIsFocuss] = useState(false);
  const [isFocusss, setIsFocusss] = useState(false);
  return (
    <div className="h-full py-12 bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <div to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo2} className="w-32" alt="" />
      </div>

      <div className="gap-10 m-14">
        <NavLink
          to={"/dashboard/Calendar"}
          className={`flex px-12 items-center justify-center p-2 bg-blue-800 text-white font-semibold rounded py-4 cursor-pointer hover:bg-blue-950 mb-24 ${
            isFocus ? "shadow-md shadow-red-500" : "shadow-none"
          }`}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        >
          <p>Calendar</p>
        </NavLink>

        <NavLink
          to={"/dashboard/feedback"}
          className={`flex items-center justify-center p-2 bg-blue-800 font-semibold text-white rounded py-4 px-12 cursor-pointer hover:bg-blue-950 mb-24 ${
            isFocuss ? "shadow-md shadow-red-500" : "shadow-none"
          }`}
          onFocus={() => setIsFocuss(true)}
          onBlur={() => setIsFocuss(false)}
        >
          <p>Feedback</p>
        </NavLink>

        <NavLink
          to={"/dashboard/notification"}
          className={`flex items-center justify-center p-2 bg-blue-800 font-semibold text-white rounded py-4 px-12 cursor-pointer hover:bg-blue-950 ${
            isFocusss ? "shadow-md shadow-red-500" : "shadow-none"
          }`}
          onFocus={() => setIsFocusss(true)}
          onBlur={() => setIsFocusss(false)}
        >
          <p>Notification</p>
        </NavLink>
      </div>
    </div>
  );
};

export default DBLeftSection;
