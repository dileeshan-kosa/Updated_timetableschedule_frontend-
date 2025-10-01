import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ManageTimeTable = () => {
  //get calendar data
  const [allCalendar, setAllCalendar] = useState([]);
  const Navigate = useNavigate(); // Use useNavigate instead of Navigate

  const fetchData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8000/api/createtable")
        .then((Response) => {
          console.log(Response.data);
          setAllCalendar(Response.data);
        });
    } catch (error) {
      console.log("Enter fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (id) => {
    Navigate(`/admindashboard/updatetimetable/${id}`);
  };

  return (
    <div className="text-center m-10">
      <h1 className=" items-center justify-center text-center font-semibold mt-2 mb-24">
        Manage Time Table
      </h1>

      <div className="w-auto h-auto overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Batch</th>
              <th className="border border-gray-300 px-4 py-2">Module Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Lecturer Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Start Time</th>
              <th className="border border-gray-300 px-4 py-2">End Time</th>
            </tr>
          </thead>
          <tbody>
            {allCalendar.map((singleCalenderData, index) => (
              <tr
                key={singleCalenderData._id}
                // onClick={}
                onClick={() => handleRowClick(singleCalenderData._id)}
                className="cursor-pointer hover:bg-gray-500"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {singleCalenderData.batch}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {singleCalenderData.modulename}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {singleCalenderData.lecturername}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {singleCalenderData.start_time}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {singleCalenderData.end_time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTimeTable;
