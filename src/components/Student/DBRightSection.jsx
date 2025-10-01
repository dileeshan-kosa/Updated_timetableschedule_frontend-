import React from "react";
import DBHeader from "./DBHeader";
import { Route, Routes } from "react-router-dom";
import DBFeedback from "./DBFeedback";
import DBNotification from "./DBNotification";
import DBCalendar from "./DBCalendar";
import StudentDesignUiux from "./StudentDesignUiux";

const DBRightSection = () => {
  return (
    <div className="flex flex-col py-12 flex-1 h-full">
      <DBHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll">
        <Routes>
          <Route path="/" element={<StudentDesignUiux />} />
          <Route path="/Calendar" element={<DBCalendar />} />
          <Route path="/feedback" element={<DBFeedback />} />
          <Route path="/notification" element={<DBNotification />} />
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
