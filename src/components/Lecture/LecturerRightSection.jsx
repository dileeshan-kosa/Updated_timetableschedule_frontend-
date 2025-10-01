import React from "react";
import LecHeader from "./LecHeader";
import { Route, Routes } from "react-router-dom";
import LecCalendar from "./LecCalendar";
import LecAvailability from "./LecAvailability";
import LecFeedback from "./LecFeedback";
import LecRequest from "./LecRequest";
import LectureDesignUiux from "./LectureDesignUiux";

const LecturerRightSection = () => {
  return (
    <div className="flex flex-col py-12 flex-1 h-full">
      <LecHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll">
        <Routes>
          <Route path="/" element={<LectureDesignUiux />} />
          <Route path="/lecCalendar" element={<LecCalendar />} />
          <Route path="/lecAvailability" element={<LecAvailability />} />
          <Route path="/lecFeedback" element={<LecFeedback />} />
          <Route path="/lecRequest" element={<LecRequest />} />
        </Routes>
      </div>
    </div>
  );
};

export default LecturerRightSection;
