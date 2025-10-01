import axios from "axios";
import React, { useEffect, useState } from "react";
import { signin } from "../../assets";

const LecturerMyProfile = () => {
  // Get the _id from localstorage
  const id = localStorage.getItem("Lecturer");
  //get lecturer data
  const [lecturerData, setLecturerData] = useState([]);

  const fetchLecturerData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/get-managelecturer/${id}`
      );
      console.log("Lecturer data", res.data);
      setLecturerData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchLecturerData();
  }, [id]);
  return (
    <div className="w-screen h-auto min-h-screen bg-gradient-to-b from-sky-900 to-sky-600 scroll">
      <div className="flex flex-col items-center h-full pt-4 text-center text-white md:text-[60px] font-2xl font-semibold">
        My Profile
        <div className="mt-10 relative rounded-full">
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <img
              src={lecturerData?.profilepic || signin}
              alt="Profile"
              className="mx-auto rounded-full"
            />
          </div>
        </div>
        <div className="mt-12 md:text-[20px] font-xl font-semibold">
          Lecturer Details
        </div>
        {/* Display Boxes for Student Details */}
        <div className="mt-6 w-full max-w-3xl p-4 flex flex-col gap-6 items-center">
          {/* First row - Student Name & Student ID */}
          <div className="flex flex-col md:flex-row justify-center items-center space-x-12">
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">
                Lecturer Name
              </div>
              <div className="mt-2 text-lg">
                {lecturerData?.lecturername || "N/A"}
              </div>
            </div>

            {/* Student ID Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">
                Lecture ID
              </div>
              <div className="mt-2 text-lg">
                {lecturerData?.lecturerid || "N/A"}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-x-12 mt-6">
            {/* Faculty Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">Faculty</div>
              <div className="mt-2 text-lg">
                {lecturerData?.faculty || "N/A"}
              </div>
            </div>

            {/* Gender Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">Gender</div>
              <div className="mt-2 text-lg">
                {lecturerData?.gender || "N/A"}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-x-12 mt-6">
            {/* Email Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">Email</div>
              <div className="mt-2 text-lg">{lecturerData?.email || "N/A"}</div>
            </div>

            {/* first day at work Box */}
            <div className="flex flex-col w-80 bg-white text-black rounded-md shadow-md p-6">
              <div className="font-semibold text-xl text-blue-700">
                First Day at Work
              </div>
              <div className="mt-2 text-lg">
                {lecturerData?.first_day_at_work || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerMyProfile;
