import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { TimePicker } from "antd";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

// Connect to socket server
const socket = io.connect("http://localhost:3001");

const UpdateTimetable = () => {
  // Get the _id from URL parameters
  const { id } = useParams();

  // Getting the data related to the id
  const [allCalendar, setAllCalendar] = useState([]);
  const [notification, setNotification] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/createtable/${id}`
      );
      console.log("___res data__", response.data);
      setAllCalendar(response.data);
      setData((prev) => ({
        ...prev,
        faculty: response.data.faculty, //Set faculty here as well
        department: response.data.department, //set department here as well
        batch: response.data.batch, //set department here as well
        modulename: response.data.modulename,
        lecturername: response.data.lecturername,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  //get hall data
  const [lectureHallData, setLectureHallData] = useState([]);
  const [selectedBuildingHalls, setSelectedBuildingHalls] = useState([]);
  const fetchlecHallData = async () => {
    try {
      const resp = await axios
        .get("http://localhost:8000/api/get-managelecturehalls")
        .then((resp) => {
          setLectureHallData(resp.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchlecHallData();
  }, []);

  //Displaying the lecture hall related to the building
  const handleLectureHallChange = (e) => {
    const selectedLectureHall = e.target.value;
    const lecturehall = lectureHallData.find(
      (lehall) => lehall.building === selectedLectureHall
    );
    setData((prev) => ({
      ...prev,
      building: selectedLectureHall,
      halls: "",
    }));
    setSelectedBuildingHalls(lecturehall ? lecturehall.halls : []);
  };
  // Handle DatePicker change
  const handleDateChangeDate = (newValue) => {
    setData((prev) => ({
      ...prev,
      lecture_date: newValue ? newValue.format("YYYY-MM-DD") : "",
    }));
  };

  // Handle TimePicker changes - StartTime
  const handleStartTimeChange = (newValue) => {
    setData((prev) => ({
      ...prev,
      start_time: newValue ? newValue.format("hh:mm A") : "",
    }));
  };

  // Handle TimePicker changes - EndTime
  const handleEndTimeChange = (newValue) => {
    setData((prev) => ({
      ...prev,
      end_time: newValue ? newValue.format("hh:mm A") : "",
    }));
  };

  //Saving update calendar data in mongo db and clear this data part
  const initialData = {
    faculty: "",
    department: "",
    batch: "",
    modulename: "",
    lecturername: "",
    building: "",
    halls: "",
    lecture_date: null,
    start_time: null,
    end_time: null,
    year: "",
  };
  const [data, setData] = useState(initialData);

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

  // Update calendar data saving part
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/update-calendar/${id}`,
        // updated values
        data
      );
      // Check if the request was successful
      if (response.status === 200) {
        const dataApi = response.data;
        console.log("dataaa", dataApi);

        // Use toast to display the success message
        toast.success(dataApi.message || "Data successfully submitted!");

        // Prepare notification message
        const formattedDate = data.lecture_date || "N/A";
        const startTime = data.start_time || "N/A";
        const endTime = data.end_time || "N/A";
        const module_name = data.modulename || "N/A";

        const messageCalanderData = {
          message:
            `Calendar has been updated\n` +
            `Lecture Date - ${formattedDate}\n` +
            `Start Time - ${startTime}\n` +
            `End Time - ${endTime}\n` +
            `Module Name - ${module_name}`,
        };

        // Emit notification to socket server
        socket.emit("send_calander", messageCalanderData);

        // Call resetForm to clear the fields
        resetForm();
      } else {
        // Handle case where the request was not successful
        const errorData = response.data;
        toast.error(
          errorData.message || "Something went wrong. Please try again."
        );
      }

      const messageCalanderData = { message: "Calender has been updated" };
      socket.emit("send_calander", messageCalanderData);

      console.log("Update response:", response);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update. Please try again later.");
    }
  };
  console.log("data login", data);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-900 to-sky-600 p-4">
      <div className="w-full max-w-lg bg-gradient-to-b from-sky-900 to-sky-600 rounded-lg shadow-lg p-4 max-h-[100vh] overflow-y-auto">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Manage Time Table
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-4">
            Choose the faculty:
            <select
              className="font-semibold w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              // value={data.faculty}
              value={allCalendar?.faculty}
              // onChange={handleFacultyChange}
              onChange={(e) => handleOnChange("faculty", e.target.value)}
              name="faculty"
            >
              <option value={data.faculty}>{allCalendar?.faculty}</option>
            </select>
          </label>

          <label className="mb-4">
            Choose the Department:
            <select
              className="font-semibold w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={allCalendar?.department}
              onChange={(e) => handleOnChange("department", e.target.value)}
              // disabled={!data.faculty}
              name="department"
            >
              <option value={data.department}>{allCalendar?.department}</option>
            </select>
          </label>

          <label className="mb-4">
            Choose the Batch:
            <select
              className="font-semibold w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={allCalendar?.batch}
              onChange={(e) => handleOnChange("batch", e.target.value)}
              name="batch"
            >
              <option value={data.batch}>{allCalendar?.batch}</option>
            </select>
          </label>

          <label className="mb-4">
            Choose the Module:
            <select
              className="font-semibold w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              name="modulename"
              value={allCalendar?.modulename}
              onChange={(e) => handleOnChange("modulename", e.target.value)}
            >
              <option value={data.modulename}>{allCalendar?.modulename}</option>
            </select>
          </label>

          <label className="mb-4">
            Lecturer Name:{" "}
            <select
              className="font-semibold w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              name="lecturername"
              // type="text"
              value={allCalendar?.lecturername}
              onChange={(e) => handleOnChange("lecturername", e.target.value)}
              // readOnly
            >
              <option value={data.lecturername}>
                {allCalendar?.lecturername}
              </option>
            </select>
          </label>

          <label className="mb-4">
            Building Name:{" "}
            <select
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              name="building"
              value={data.building}
              onChange={handleLectureHallChange}
            >
              <option value="">{allCalendar.building}</option>
              {lectureHallData &&
                lectureHallData.map((singleLectureHallData, index) => (
                  <option key={index} value={singleLectureHallData.building}>
                    {singleLectureHallData.building}
                  </option>
                ))}
            </select>
          </label>

          <label className="mb-6">
            Hall ID:
            <select
              name="halls"
              value={data.halls}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">{allCalendar.halls}</option>{" "}
              {selectedBuildingHalls.map((hall, index) => (
                <option key={index} value={hall}>
                  {hall}
                </option>
              ))}
            </select>
          </label>

          <label className="mb-6 flex flex-col">
            Lecture Date:
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Lecture Date"
                  value={data.lecture_date ? dayjs(data.lecture_date) : null}
                  onChange={handleDateChangeDate}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  format="YYYY-MM-DD"
                />
              </DemoContainer>
            </LocalizationProvider>
          </label>

          <div className="flex justify-between mb-6">
            <label className="w-1/2 mr-2">
              Start Time:
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Start Time"
                    value={
                      data.start_time ? dayjs(data.start_time, "hh:mm A") : null
                    }
                    onChange={handleStartTimeChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    format="hh:mm A"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </label>

            <label className="w-1/2 ml-2">
              End Time:
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="End Time"
                    value={
                      data.end_time ? dayjs(data.end_time, "hh:mm A") : null
                    }
                    onChange={handleEndTimeChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    format="hh:mm A"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </label>
          </div>

          <label className="mb-6">
            Year:
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              name="year"
              value={data.year}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            onClick={(e) => handleSubmit}
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTimetable;
