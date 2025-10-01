// import { DatePicker, TimePicker } from "@mui/x-date-pickers";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import React, { useEffect, useState } from "react";
// import generateCalenderApi from "../../common/generateCale";
// import axios from "axios";
// import dayjs from "dayjs";

// const GenerateTimetable = () => {
//   // get hall data
//   const [lectureHallData, setLectureHallData] = useState([]);
//   const [selectedBuildingHalls, setSelectedBuildingHalls] = useState([]);

//   const fetchlecHallData = async () => {
//     try {
//       const resp = await axios
//         .get("http://localhost:8000/api/get-managelecturehalls")
//         .then((resp) => {
//           setLectureHallData(resp.data);
//         });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchlecHallData();
//   }, []);

//   const handleModuleChange = (e) => {
//     const selectedLectureHall = e.target.value;
//     const lecturehall = lectureHallData.find(
//       (lehall) => lehall.building === selectedLectureHall
//     );
//     setData((prev) => ({
//       ...prev,
//       building: selectedLectureHall,
//       halls: "",
//     }));
//     setSelectedBuildingHalls(lecturehall ? lecturehall.halls : []);
//   };

//   // get module data
//   const [moduleData, setModuleData] = useState([]);

//   const fetchModuleData = async () => {
//     try {
//       const res = await axios
//         .get("http://localhost:8000/api/get-managemodule")
//         .then((res) => {
//           setModuleData(res.data);
//         });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchModuleData();
//   }, []);

//   const handleLecturerChange = (e) => {
//     const selectedModule = e.target.value;
//     const modules = moduleData.find(
//       (modu) => modu.modulename === selectedModule
//     );
//     setData((prev) => ({
//       ...prev,
//       modulename: selectedModule,
//       lecturername: modules ? modules.lecturername : "",
//     }));
//   };

//   // post calendar data
//   const [data, setData] = useState({
//     faculty: "",
//     department: "",
//     batch: "",
//     modulename: "",
//     lecturername: "",
//     building: "",
//     halls: "",
//     lecture_date: null,
//     start_time: null,
//     end_time: null,
//     year: "",
//   });

//   const departments = {
//     "School of Computing": ["Software Engineering", "Cloud Computing", "Cyber Security", "Data Science"],
//     "School of Engineering": ["Civil Engineering", "Electronic Engineering", "Mechatronic Engineering", "Marine Engineering"],
//   };

//   const handleOnChange = (name, value) => {
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFacultyChange = (e) => {
//     const faculty = e.target.value;
//     setData((prev) => ({
//       ...prev,
//       faculty,
//       department: "",
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/generate-calendar",
//         {
//           method: generateCalenderApi.generateCalenderBackUp.method,
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );
//       const dataApi = await response.json();
//       console.log("dataaa", dataApi);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   console.log("data login", data);

//   // Handle DatePicker change
//   const handleDateChange = (newValue) => {
//     setData((prev) => ({
//       ...prev,
//       lecture_date: newValue ? newValue.format("YYYY-MM-DD") : "",
//     }));
//   };

//   // Handle TimePicker changes
//   const handleStartTimeChange = (newValue) => {
//     setData((prev) => ({
//       ...prev,
//       start_time: newValue ? newValue.format("hh:mm A") : "",
//     }));
//   };

//   const handleEndTimeChange = (newValue) => {
//     setData((prev) => ({
//       ...prev,
//       end_time: newValue ? newValue.format("hh:mm A") : "",
//     }));
//   };

//   return (
//     <div className="text-center m-24">
//       <h1 className="items-center justify-center text-center font-semibold mt-2 mb-24">
//         Generate Time Table
//       </h1>
//       <form
//         className="flex flex-col justify-start items-start h-screen p-2 font-semibold"
//         onSubmit={handleSubmit}
//       >
//         <label>
//           Choose the faculty:
//           <select
//             className="mb-6"
//             value={data.faculty}
//             onChange={handleFacultyChange}
//             name="faculty"
//           >
//             <option value="">Select Faculty</option>
//             <option value="School of Computing">School of Computing</option>
//             <option value="School of Engineering">School of Engineering</option>
//           </select>
//         </label>
//         <label>
//           Choose the Department:
//           <select
//             className="mb-6"
//             value={data.department}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             disabled={!data.faculty}
//             name="department"
//           >
//             <option value="">Select Department</option>
//             {data.faculty &&
//               departments[data.faculty].map((dept, index) => (
//                 <option key={index} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//           </select>
//         </label>
//         <label>
//           Choose the Batch:
//           <select
//             className="mb-6"
//             value={data.batch}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             name="batch"
//           >
//             <option value="">Select Batch</option>
//             <option value="2025">2025</option>
//             <option value="2026">2026</option>
//             <option value="2027">2027</option>
//             <option value="2028">2028</option>
//           </select>
//         </label>
//         <label>
//           Choose the Module:
//           <select
//             className="w-60 mb-6"
//             name="modulename"
//             value={data.modulename}
//             onChange={handleLecturerChange}
//           >
//             <option value="">Select Module</option>
//             {moduleData &&
//               moduleData.map((singleModuleData, index) => (
//                 <option key={index} value={singleModuleData.modulename}>
//                   {singleModuleData.modulename}
//                 </option>
//               ))}
//           </select>
//         </label>
//         <label>
//           Lecturer Name:
//           <input
//             className="mb-6"
//             name="lecturername"
//             value={data.lecturername}
//             readOnly
//           />
//         </label>
//         <label>
//           Building Name:
//           <select
//             className="w-60 mb-6"
//             name="building"
//             value={data.building}
//             onChange={handleModuleChange}
//           >
//             <option value="">Select Building</option>
//             {lectureHallData &&
//               lectureHallData.map((singleLectureHallData, index) => (
//                 <option key={index} value={singleLectureHallData.building}>
//                   {singleLectureHallData.building}
//                 </option>
//               ))}
//           </select>
//         </label>
//         <label>
//           Hall ID:
//           <select
//             name="halls"
//             value={data.halls}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             className="w-60 mb-8"
//           >
//             <option value="">Select Hall ID</option>
//             {selectedBuildingHalls.map((hall, index) => (
//               <option key={index} value={hall}>
//                 {hall}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label className="flex flex-auto mt-3 mb-1">
//           Lecture Date:
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer components={["DatePicker"]}>
//               <DatePicker
//                 label="Lecture Date"
//                 value={data.lecture_date ? dayjs(data.lecture_date) : null}
//                 onChange={handleDateChange}
//                 className="w-full mb-6"
//                 format="YYYY-MM-DD"
//               />
//             </DemoContainer>
//           </LocalizationProvider>
//         </label>

//         <label className="flex flex-auto mt-3 mb-1">
//           Start Time:
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer components={["TimePicker"]}>
//               <TimePicker
//                 label="Start Time"
//                 value={
//                   data.start_time ? dayjs(data.start_time, "hh:mm A") : null
//                 }
//                 onChange={handleStartTimeChange}
//                 className="w-full mb-6"
//                 format="hh:mm A"
//               />
//             </DemoContainer>
//           </LocalizationProvider>
//         </label>

//         <label className="flex flex-auto mt-3 mb-1">
//           End Time:
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer components={["TimePicker"]}>
//               <TimePicker
//                 label="End Time"
//                 value={data.end_time ? dayjs(data.end_time, "hh:mm A") : null}
//                 onChange={handleEndTimeChange}
//                 className="w-full mb-6"
//                 format="hh:mm A"
//               />
//             </DemoContainer>
//           </LocalizationProvider>
//         </label>

//         <label>
//           year:
//           <input
//             className="mb-6"
//             type="text"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.year}
//             name="year"
//             required
//           />
//         </label>

//         <button
//           type="submit"
//           className="bg-orange-500 px-11 py-3 hover:bg-orange-600 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mt-8 ml-96"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GenerateTimetable;

import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useEffect, useState } from "react";
import generateCalenderApi from "../../common/generateCale";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const GenerateTimetable = () => {
  // get hall data
  const [lectureHallData, setLectureHallData] = useState([]);
  const [selectedBuildingHalls, setSelectedBuildingHalls] = useState([]);

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

  const handleModuleChange = (e) => {
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

  // get module data
  const [moduleData, setModuleData] = useState([]);

  const fetchModuleData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/get-managemodule");
      setModuleData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchModuleData();
  }, []);

  const handleLecturerChange = (e) => {
    const selectedModule = e.target.value;
    const modules = moduleData.find(
      (modu) => modu.modulename === selectedModule
    );
    setData((prev) => ({
      ...prev,
      modulename: selectedModule,
      lecturername: modules ? modules.lecturername : "",
    }));
  };

  // post calendar data and clear this data part
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

  // const [data, setData] = useState({
  //   faculty: "",
  //   department: "",
  //   batch: "",
  //   modulename: "",
  //   lecturername: "",
  //   building: "",
  //   halls: "",
  //   lecture_date: null,
  //   start_time: null,
  //   end_time: null,
  //   year: "",
  // });

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

  const handleFacultyChange = (e) => {
    const faculty = e.target.value;
    setData((prev) => ({
      ...prev,
      faculty,
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
      const response = await fetch(
        "http://localhost:8000/api/generate-calendar",
        {
          method: generateCalenderApi.generateCalenderBackUp.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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

  // Handle DatePicker change
  const handleDateChange = (newValue) => {
    setData((prev) => ({
      ...prev,
      lecture_date: newValue ? newValue.format("YYYY-MM-DD") : "",
    }));
  };

  // Handle TimePicker changes
  const handleStartTimeChange = (newValue) => {
    setData((prev) => ({
      ...prev,
      start_time: newValue ? newValue.format("hh:mm A") : "",
    }));
  };

  const handleEndTimeChange = (newValue) => {
    setData((prev) => ({
      ...prev,
      end_time: newValue ? newValue.format("hh:mm A") : "",
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-900 to-sky-600 p-4">
      <div className="w-full max-w-lg bg-gradient-to-b from-sky-900 to-sky-600 rounded-lg shadow-lg p-4 max-h-[100vh] overflow-y-auto">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Generate Time Table
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-4">
            Choose the Faculty:
            <select
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={data.faculty}
              onChange={handleFacultyChange}
              name="faculty"
            >
              <option value="">Select Faculty</option>
              <option value="School of Computing">School of Computing</option>
              <option value="School of Engineering">
                School of Engineering
              </option>
            </select>
          </label>

          <label className="mb-4">
            Choose the Department:
            <select
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={data.department}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              disabled={!data.faculty}
              name="department"
            >
              <option value="">Select Department</option>
              {data.faculty &&
                departments[data.faculty].map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>
          </label>

          <label className="mb-4">
            Choose the Batch:
            <select
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={data.batch}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              name="batch"
            >
              <option value="">Select Batch</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
            </select>
          </label>

          <label className="mb-4">
            Choose the Module:
            <select
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              name="modulename"
              value={data.modulename}
              onChange={handleLecturerChange}
            >
              <option value="">Select Module</option>
              {moduleData &&
                moduleData.map((singleModuleData, index) => (
                  <option key={index} value={singleModuleData.modulename}>
                    {singleModuleData.modulename}
                  </option>
                ))}
            </select>
          </label>

          <label className="mb-4">
            Lecturer Name:
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              name="lecturername"
              value={data.lecturername}
              readOnly
            />
          </label>

          <label className="mb-4">
            Building Name:
            <select
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              name="building"
              value={data.building}
              onChange={handleModuleChange}
            >
              <option value="">Select Building</option>
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
              <option value="">Select Hall ID</option>
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
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <input
                      {...params.inputProps}
                      className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                  )}
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
                    renderInput={(params) => (
                      <input
                        {...params.inputProps}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      />
                    )}
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
                    renderInput={(params) => (
                      <input
                        {...params.inputProps}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </label>
          </div>

          <label className="mb-6">
            Year:
            <input
              type="text"
              name="year"
              value={data.year}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateTimetable;
