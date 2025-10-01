import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const LecFeedback = () => {
  //get feedback data
  const [feedbackData, setFeedbackData] = useState([]);
  const fetchFeedbackData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8000/api/get-feedbacktable")
        .then((response) => {
          setFeedbackData(response.data);
          console.log("____feedback data", response.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  return (
    <div className="text-center m-10">
      <h2 className="font-semibold text-center mt-2 mb-24">Student Feedback</h2>

      <div className="w-auto h-auto overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Student ID</th>
              <th className="border border-gray-300 px-4 py-2">Module ID</th>
              <th className="border border-gray-300 px-4 py-2">Module Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Department Name
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Student Feedback
              </th>
              {/* <th className="border border-gray-300 px-4 py-2">Action</th> */}
            </tr>
          </thead>

          <tbody>
            {feedbackData
              .filter(
                (singleLecfeedback) =>
                  singleLecfeedback.modulename ===
                  localStorage.getItem("lectureModulename")
              )
              .map((item, index) => (
                <tr key={index} className="hover:bg-gray-500">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.studentid}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.modulecode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.modulename}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.department}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.feedback}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LecFeedback;
