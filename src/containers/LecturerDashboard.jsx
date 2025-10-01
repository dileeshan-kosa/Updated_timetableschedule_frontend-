import React from "react";
import { LecturerLeftSection, LecturerRightSection } from "../components";

const LecturerDashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-gradient-to-b from-sky-900 to-sky-600">
      <LecturerLeftSection />
      <LecturerRightSection />
    </div>
  );
};

export default LecturerDashboard;
