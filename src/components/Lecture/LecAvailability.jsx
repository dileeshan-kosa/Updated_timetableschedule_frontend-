import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker, TimePicker } from "antd";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const { RangePicker } = TimePicker;

// Connect to socket server
const socket = io.connect("http://localhost:3001");

const LecAvailability = () => {
  // Get the _id from localstorage
  const id = localStorage.getItem("Lecturer");
  //get lecturer data
  const [lecturerData, setLecturerData] = useState([]);

  // Initial state for form data
  const initialData = {
    faculty: "",
    department: "",
    lecturername: "",
    start_time: null,
    end_time: null,
    lecture_date: null,
  };

  const [data, setData] = useState(initialData);

  // Fetch lecturer data and set lecturername in state
  const fetchLecturerData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/get-managelecturer/${id}`
      );
      console.log("Lecturer data", res.data);
      setLecturerData(res.data);
      setData((prev) => ({
        ...prev,
        lecturername: res.data.lecturername, // Set lecturername here
        faculty: res.data.faculty, // Set faculty here as well
        department: res.data.department,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchLecturerData();
  }, [id]);

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to reset the form
  const resetForm = () => {
    setData(initialData); // Reset form data to initial values
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const messageData = { message: "Availability has been updated" };
    // socket.emit("send_message", messageData);

    // Format date and time
    const formattedDate = data.lecture_date
      ? dayjs(data.lecture_date).format("DD/MM/YYYY")
      : "N/A";
    const startTime = data.start_time ? data.start_time : "N/A";
    const endTime = data.end_time ? data.end_time : "N/A";
    const currentTime = new Date().toLocaleTimeString();

    const messageData = {
      message:
        `Availability has been updated on ${formattedDate} at ${currentTime}\n` +
        `Faculty: ${data.faculty}\n` +
        `Department: ${data.department}\n` +
        `Time slots: ${startTime} - ${endTime},`,
    };

    // Emit the notification via Socket.io
    socket.emit("send_message", messageData); // Emit the notification via Socket.io

    // Display success message
    toast.success("Data successfully submitted!");

    // Reset the form data to initial state
    setData(initialData);
  };
  console.log("data login", data);

  // Handle DatePicker change
  const handleDateChangeDate = (newValue) => {
    setData((prev) => ({
      ...prev,
      lecture_date: newValue ? newValue.format("YYYY-MM-DD") : "",
    }));
  };

  // Handle TimePicker changes - Time Range
  const handleTimeRangeChange = (times) => {
    const [start, end] = times;
    setData((prev) => ({
      ...prev,
      start_time: start ? start.format("hh:mm A") : "",
      end_time: end ? end.format("hh:mm A") : "",
    }));
  };

  return (
    <div
      className="flex h-screen justify-center items-center"
      style={{ marginTop: "50px" }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-start p-10 font-semibold text-black gap-6 w-1/2 rounded-lg shadow-md"
      >
        <div className="flex flex-col w-full mb-5">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Choose the faculty:
          </label>

          <select
            className="w-full h-12 bg-slate-300 rounded-md"
            value={lecturerData?.faculty}
            onChange={(e) => handleOnChange("faculty", e.target.value)}
            name="faculty"
          >
            <option value={data.faculty}>{lecturerData?.faculty}</option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Choose the Department:
          </label>
          <select
            className="w-full h-12 bg-slate-300 rounded-md"
            value={lecturerData?.department}
            onChange={(e) => handleOnChange("department", e.target.value)}
            name="department"
          >
            <option value={data.department}>{lecturerData?.department}</option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Lecture Name:
          </label>

          <select
            className="w-full h-12 bg-slate-300 rounded-md"
            value={data.lecturername}
            onChange={(e) => handleOnChange("lecturername", e.target.value)}
            name="lecturername"
          >
            <option value={data.lecturername}>
              {lecturerData?.lecturername}
            </option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2 ">
            Available Date:
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Lecture Date"
                  value={data.lecture_date ? dayjs(data.lecture_date) : null}
                  onChange={handleDateChangeDate}
                  className="w-100 h-12 bg-slate-300 rounded-md"
                  format="YYYY-MM-DD"
                />
              </DemoContainer>
            </LocalizationProvider>
          </label>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Time Range:
            <RangePicker
              format="hh:mm A"
              onChange={handleTimeRangeChange}
              className="w-100 h-12 bg-slate-300 rounded-md"
            />
          </label>
        </div>

        <button
          type="submit"
          onClick={(e) => handleSubmit}
          className="bg-orange-500 px-11 py-3 hover:bg-orange-600 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mt-8 ml-96"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LecAvailability;
