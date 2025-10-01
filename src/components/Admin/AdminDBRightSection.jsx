import React from "react";
import AdminDBHeader from "./AdminDBHeader";
import { Route, Router, Routes } from "react-router-dom";
import ManageLectures from "./ManageLectures";
import ManageStudents from "./ManageStudents";
import ManageModule from "./ManageModule";
import ManageLectureHalls from "./ManageLectureHalls";
import GenerateTimetable from "./GenerateTimetable";
import ManageTimeTable from "./ManageTimeTable";
import UpdateTimetable from "./UpdateTimetable";
import AdminDesignUiux from "./AdminDesignUiux";

const AdminDBRightSection = () => {
  return (
    <div className="flex flex-col py-12 flex-1 h-full">
      <AdminDBHeader />
      {/* <AdminDesignUiux /> */}

      <div className="flex flex-col flex-1 overflow-y-scroll">
        <Routes>
          <Route path="/" element={<AdminDesignUiux />} />
          <Route path="/managelecture" element={<ManageLectures />} />
          <Route path="/managestudent" element={<ManageStudents />} />
          <Route path="/managemodule" element={<ManageModule />} />
          <Route path="/managelacturehall" element={<ManageLectureHalls />} />
          <Route path="/generatetimetable" element={<GenerateTimetable />} />
          <Route path="/managetimetable" element={<ManageTimeTable />} />
          <Route path="/updatetimetable/:id" element={<UpdateTimetable />} />
          {/* <Route path="/updatetimetable" element={<UpdateTimetable/>} /> */}
          {/* <Route path="/updatetimetable/*" element={<UpdateTimetable />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDBRightSection;
