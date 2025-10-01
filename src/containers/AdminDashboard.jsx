import React from "react";
import { AdminDBLeftSection, AdminDBRightSection } from "../components";

const AdminDashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-gradient-to-b from-sky-900 to-sky-600">
      <AdminDBLeftSection />
      <AdminDBRightSection />
      
    </div>
  );
};

export default AdminDashboard;
