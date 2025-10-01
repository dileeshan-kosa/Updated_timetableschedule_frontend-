import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, TimePicker } from "antd";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";

// Connect to socker server
const socket = io.connect("http://localhost:3001");

const LecRequest = () => {
  const initialState = {
    date: null,
    startTime: dayjs(),
    endTime: dayjs(),
    lectureHall: "",
    reasone: "",
    building: "",
    halls: "",
  };
  const [data, setData] = useState(initialState);
  const [lectureHallData, setLectureHallData] = useState([]);
  const [selectedBuildingHalls, setSelectedBuildingHalls] = useState([]);

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //fetchlecture halls
  const fetchlecHallData = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:8000/api/get-managelecturehalls"
      );
      setLectureHallData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchlecHallData();
  }, []);

  const handleLectureHallChange = (e) => {
    const selectedLectureHall = e.target.value;
    const lecturehall = lectureHallData.find(
      (lehall) => lehall.building === selectedLectureHall
    );
    setData((prev) => ({
      ...prev,
      building: selectedLectureHall,
      lectureHall: "", // Reset lecture hall when building is changed
    }));
    setSelectedBuildingHalls(lecturehall ? lecturehall.halls : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = data.date
      ? new Date(data.date).toLocaleDateString()
      : "N/A";
    const startTime = data.startTime ? data.startTime.format("HH:mm") : "N/A";
    const endTime = data.endTime ? data.endTime.format("HH:mm") : "N/A";

    const messageDateRequest = {
      message:
        `Request has been updated\n` +
        `Select Date - ${formattedDate}\n` +
        `Start Time - ${startTime}\n` +
        `End Time - ${endTime}\n` +
        `Lecture Hall - ${data.lectureHall}\n` +
        `Reasone - ${data.reasone}`,
    };
    socket.emit("send_requestMSG", messageDateRequest);

    // Display success message
    toast.success("Data successfully submitted!");

    // Reset the form data to initial state
    setData(initialState); // Reset the form fields
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ marginTop: "50px" }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-start p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-md "
      >
        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2">Select Date</label>
          <DatePicker
            selected={data.date}
            onChange={(date) => handleOnChange("date", date)}
            className="w-full h-12 bg-slate-300 rounded-md p-2"
            placeholderText="Select Date"
            required
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2">Start Time</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={data.startTime}
              onChange={(newValue) => handleOnChange("startTime", newValue)}
              className="w-full h-12 bg-slate-300 rounded-md p-2"
              renderInput={(params) => <input {...params} />}
              required
            />
          </LocalizationProvider>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2">End Time</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={data.endTime}
              onChange={(newValue) => handleOnChange("endTime", newValue)}
              className="w-full h-12 bg-slate-300 rounded-md p-2"
              renderInput={(params) => <input {...params} />}
              required
            />
          </LocalizationProvider>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2">Building</label>
          <select
            value={data.building}
            onChange={handleLectureHallChange}
            className="w-full h-12 bg-slate-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Building
            </option>
            {lectureHallData.map((lecHall) => (
              <option key={lecHall.building} value={lecHall.building}>
                {lecHall.building}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2">Lecture Hall</label>
          <select
            value={data.lectureHall}
            onChange={(e) => handleOnChange("lectureHall", e.target.value)}
            className="w-full h-12 bg-slate-300 rounded-md p-2"
            required
          >
            <option value="" disabled>
              Select Lecture Hall
            </option>
            {selectedBuildingHalls.map((hall, index) => (
              <option key={index} value={hall}>
                {hall}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2">Lecture Hall</label>
          <input
            type="text"
            value={data.lectureHall}
            onChange={(e) => handleOnChange("lectureHall", e.target.value)}
            className="w-full h-12 bg-slate-300 rounded-md p-2"
            placeholder="Enter Lecture Hall"
            required
          />
        </div> */}

        <div className="flex flex-col w-full mb-5">
          <label className="text-lg mb-2">Reasone</label>
          <input
            type="text"
            value={data.reasone}
            onChange={(e) => handleOnChange("reasone", e.target.value)}
            className="w-full h-12 bg-slate-300 rounded-md p-2"
            placeholder="Type the Reasone"
            required
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-48 h-14 bg-orange-500 rounded-full text-white mt-4 transform transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LecRequest;
