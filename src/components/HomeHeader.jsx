// import React from "react";
// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   HPLogo,
//   NoInstallation,
//   HpPhoto,
//   EasyTimetabble,
//   Feedback,
//   Notification,
//   Responsive,
// } from "../assets";
// import { isActiveStyles, isNotActiveStyles } from "../utils/Styles";

// const HomeHeader = () => {
//   return (
//     <header className="bg-opacity-50 backdrop-blur-md bg-gradient-to-t from-sky-900 to-sky-600 text-white p-6 fixed top-0 inset-x-0 z-50">
//       <div className="container mx-auto flex justify-between items-start">
//         <NavLink to={"/"} className="flex items-center mr-auto">
//           <img src={HPLogo} className="w-20" alt="Logo" />
//         </NavLink>
//         <nav className="space-x-8 flex ml-4">
//           <NavLink
//             className={({ isActive }) =>
//               isActive ? isActiveStyles : isNotActiveStyles
//             }
//             to={"/"}
//           >
//             Home
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               isActive ? isActiveStyles : isNotActiveStyles
//             }
//             to={"/about"}
//           >
//             About
//           </NavLink>
//           <NavLink
//             className={({ isActive }) =>
//               isActive ? isActiveStyles : isNotActiveStyles
//             }
//             to={"/contact"}
//           >
//             Contact
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               isActive ? isActiveStyles : isNotActiveStyles
//             }
//             to={"/feature"}
//           >
//             Features
//           </NavLink>
//         </nav>

//         <NavLink to="/login" className="ml-auto">
//           <motion.button
//             // {...buttonClick}
//             className="px-4 py-2 rounded-md bg-headingColor border border-purple-200 cursor-pointer text-white text-lg font-semibold"
//           >
//             Login
//           </motion.button>
//         </NavLink>
//       </div>
//     </header>
//   );
// };

// export default HomeHeader;

import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { HPLogo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/Styles";

const HomeHeader = ({ featuresRef, footerRef }) => {
  // Scroll to Features section
  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to Footer section
  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-opacity-50 backdrop-blur-md bg-gradient-to-t from-sky-900 to-sky-600 text-white p-6 fixed top-0 inset-x-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - positioned on the far left */}
        <NavLink to={"/"} className="flex items-center mr-16">
          <img src={HPLogo} className="w-20" alt="Logo" />
        </NavLink>

        {/* Navigation Links - centered with more spacing */}
        <nav className="space-x-16 flex gap-12">
          <button
            className="ml-20 relative group text-lg font-semibold hover:text-gray-200"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Home
            {/* Orange underline on hover */}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#ff5303] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          <NavLink
            className="relative group text-lg font-semibold hover:text-gray-200"
            to={"/about"}
          >
            About
            {/* Orange underline on hover */}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#ff5303] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </NavLink>
          <button
            className="relative group text-lg font-semibold hover:text-gray-200"
            onClick={scrollToFeatures}
          >
            Features
            {/* Orange underline on hover */}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#ff5303] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          <button
            className="relative group text-lg font-semibold hover:text-gray-200"
            onClick={scrollToFooter}
          >
            Contact
            {/* Orange underline on hover */}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#ff5303] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </nav>

        {/* Login Button - aligned on the far right */}
        <NavLink to="/login" className="ml-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-md bg-[#ff5303] border border-white cursor-pointer text-white text-lg font-semibold"
          >
            Login
          </motion.button>
        </NavLink>
      </div>
    </header>
  );
};

export default HomeHeader;
