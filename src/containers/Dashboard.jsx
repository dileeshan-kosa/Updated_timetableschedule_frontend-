import React from "react";
import { DBLeftSection, DBRightSection } from "../components";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-gradient-to-b from-sky-900 to-sky-600">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};

export default Dashboard;
