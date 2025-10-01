import React, { useEffect, useState } from "react";
import { signin } from "../../assets";
import axios from "axios";

const StudentMyProfile = () => {
  // Get the _id from local storage
  const id = localStorage.getItem("userId");

  // Get student data
  const [studentData, setStudentData] = useState([]);

  const fetchStudentData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/get-managestudent/${id}`
      );
      console.log("student data", res.data);
      setStudentData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  return (
    <div className="w-screen h-auto min-h-screen bg-gradient-to-b from-sky-900 to-sky-600 scroll">
      <div className="flex flex-col items-center h-full pt-4 text-center text-white md:text-[60px] font-2xl font-semibold">
        My Profile
        <div className="mt-10 relative rounded-full">
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <img
              src={studentData?.profilepic || signin}
              alt="Profile"
              className="mx-auto rounded-full"
            />
          </div>
        </div>
        <div className="mt-12 md:text-[20px] font-xl font-semibold">
          Student Details
        </div>
        {/* Display Boxes for Student Details */}
        <div className="mt-6 w-full max-w-3xl p-4 flex flex-col gap-6 items-center">
          {/* First row - Student Name & Student ID */}
          <div className="flex flex-col md:flex-row justify-center items-center space-x-12">
            {/* Student Name Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">
                Student Name
              </div>
              <div className="mt-2 text-lg">
                {studentData?.studentname || "N/A"}
              </div>
            </div>

            {/* Student ID Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">
                Student ID
              </div>
              <div className="mt-2 text-lg">
                {studentData?.studentid || "N/A"}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-x-12 mt-6">
            {/* Degree Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">Degree</div>
              <div className="mt-2 text-lg">{studentData?.degree || "N/A"}</div>
            </div>

            {/* Gender Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">Gender</div>
              <div className="mt-2 text-lg">{studentData?.gender || "N/A"}</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-x-12 mt-6">
            {/* Faculty Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">Faculty</div>
              <div className="mt-2 text-lg">
                {studentData?.faculty || "N/A"}
              </div>
            </div>

            {/* Email Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">Email</div>
              <div className="mt-2 text-lg">{studentData?.email || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMyProfile;
