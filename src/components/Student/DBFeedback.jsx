import React, { useEffect, useState } from "react";
import feedbackApi from "../../common/feedback";
import { Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const { Option } = Select;

const DBFeedback = () => {
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

  //get module data
  const [moduleData, setModuleData] = useState([]);

  const fetchModuleData = async () => {
    try {
      const res = await axios
        .get("http://localhost:8000/api/get-managemodule")
        .then((res) => {
          setModuleData(res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchModuleData();
  }, []);

  const handleLecturerChange = (value) => {
    const selectedModule = value;
    const module = moduleData.find(
      (modu) => modu.modulename === selectedModule
    );
    setData((prev) => ({
      ...prev,
      modulename: selectedModule,
      lecturername: module ? module.lecturername : "",
      modulecode: module ? module.modulecode : "",
    }));
  };

  const initialData = {
    faculty: "",
    department: "",
    batch: "",
    feedback: "",
    studentid: "",
    lecturername: "",
    modulename: "",
    modulecode: "",
    studentid: "",
  };
  const [data, setData] = useState(initialData);

  const departments = {
    "School of Computing": [
      "Software Engineering",
      "Cloud Computing",
      "Cyber Security",
      "Data Science",
    ],
    "School of Engineering": [
      "Civil Engineering",
      "Electronic Engineering",
      "Mechatronic Engineering",
      "Marine Engineering",
    ],
  };

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacultyChange = (value) => {
    setData((prev) => ({
      ...prev,
      faculty: value,
      department: "",
    }));
  };

  // Function to reset the form
  const resetForm = () => {
    setData(initialData); // Reset form data to initial values
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalPayload = {
        ...data,
        faculty: studentData?.faculty,
        department: studentData?.department,
        batch: studentData?.batch,
        studentid: studentData?.studentid
      };

      const response = await fetch("http://localhost:8000/api/feedback-table", {
        method: feedbackApi.feedBackUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
      });

      // Check if the request was successful
      if (response.ok) {
        const dataApi = await response.json();
        console.log("dataaa", dataApi);

        // Use toast to display the success message
        toast.success(dataApi.message || "Data successfully submitted!");

        // Call resetForm to clear the fields
        resetForm();
      } else {
        // Handle case where the request was not successful
        const errorData = await response.json();
        toast.error(
          errorData.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log("data login", data);

  // console.log("data login", data);
  console.log("moduleData", moduleData);

  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-start h-screen p-36 font-semibold -mt-32"
      >
        <div className="flex flex-col w-full mb-12">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Faculty:
          </label>
          <input
            className="w-full h-12 bg-slate-300 rounded-md"
            // placeholder={`${studentData?.faculty}`}
            value={studentData?.faculty}
            // disabled
            // onChange={handleFacultyChange}
            name="faculty"
          >
          </input>
        </div>

        <div className="flex flex-col w-full mb-12">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Department:
          </label>
          <input
            className="w-full h-12 bg-slate-300 rounded-md text-black font-semibold"
            // placeholder="Select Department"
            value={studentData?.department}
            // disabled
            // onChange={(value) => handleOnChange("department", value)}
            // isabled={!data.faculty}
            name="department"
          >
            {/* <option value="">Select Department</option>
            {data.faculty &&
              departments[data.faculty].map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))} */}
          </input>
        </div>

        <div className="flex flex-col w-full mb-12">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Choose the Batch:
          </label>
          <input
            className="w-full h-12 bg-slate-300 rounded-md"
            // placeholder="Select Batch"
            // onChange={(value) => handleOnChange("batch", value)}
            value={studentData?.batch}
            disabled
            name="batch"
          >
          </input>
        </div>

        <div className="flex flex-col w-full mb-12">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Choose the Module:
          </label>
          <Select
            className="w-full h-12 bg-slate-300 rounded-md"
            placeholder="Select Module"
            name="modulename"
            value={data.modulename}
            onChange={handleLecturerChange}
            required
          >
            <option value="">Select Module</option>{" "}
            {moduleData &&
              moduleData
                .filter(
                  (singleModuleData) =>
                    singleModuleData.department ===
                    localStorage.getItem("userDepartment")
                )
                .map((singleModuleData, index) => (
                  <Option key={index} value={singleModuleData.modulename}>
                    {singleModuleData.modulename}
                  </Option>
                ))}
          </Select>
        </div>

        <div className="flex flex-col w-full mb-12">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Module Code:
          </label>
          <input
            className="w-full h-12 bg-slate-300 rounded-md"
            placeholder="Select Module Code"
            name="modulecode"
            value={data.modulecode}
            readOnly
          ></input>
        </div>

        <div className="flex flex-col w-full mb-12">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Student Id:
          </label>
          <input
            className="w-full h-12 bg-slate-300 rounded-md"
            // placeholder="Enter Student ID"
            name="studentid"
            value={studentData?.studentid}
            // type="text"
            // onChange={(e) => handleOnChange("studentid", e.target.value)}
          ></input>
        </div>

        <div className="flex flex-col w-full mb-12">
          <label className="font-semibold text-2xl mr-4 ml-2 mb-2">
            Feedback:{" "}
          </label>
          <input
            className="w-full h-14 bg-slate-300 rounded-md "
            type="text"
            placeholder="Type your Feedback here"
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            name="feedback"
            value={data.feedback}
            required
          ></input>
        </div>

        <button
          type="submit"
          className="bg-orange-500 px-11 py-3 hover:bg-orange-600 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mt-8 ml-96"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DBFeedback;
