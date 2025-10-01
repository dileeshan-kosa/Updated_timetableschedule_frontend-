// import React, { useEffect, useState } from "react";
// import manageLectureApi from "../../common/manageLac";
// import axios from "axios";

// const ManageModule = () => {
//   //get lecture data
//   const [lectureData, setLectureData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const res = await axios
//         .get("http://localhost:8000/api/get-managelecture")
//         .then((res) => {
//           setLectureData(res.data);
//         });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleLecturerChange = (e) => {
//     const selectedLecturer = e.target.value;
//     const lecturer = lectureData.find(
//       (lect) => lect.lecturername === selectedLecturer
//     );
//     setData((prev) => ({
//       ...prev,
//       lecturername: selectedLecturer,
//       lecturerid: lecturer ? lecturer.lecturerid : "",
//     }));
//   };

//   //post module data
//   const [data, setData] = useState({
//     faculty: "",
//     department: "",
//     batch: "",
//     modulename: "",
//     modulecode: "",
//     lecturername: "",
//     lecturerid: "",
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
//       const response = await fetch("http://localhost:8000/api/manage-module", {
//         method: manageLectureApi.manageLectureBackUp.method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const dataApi = await response.json();
//       console.log("dataaa", dataApi);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   console.log("data login", data);

//   return (
//     <div className="text-center m-24">
//       <h1 className=" items-center justify-center text-center font-semibold mt-2 mb-24">
//         Manage Module
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
//           Module Name:
//           <input
//             className="mb-6"
//             type="text"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.modulename}
//             name="modulename"
//             required
//           />
//         </label>

//         <label>
//           Module Code:
//           <input
//             className="mb-6"
//             type="text"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.modulecode}
//             name="modulecode"
//             required
//           />
//         </label>

//         <label>
//           Choose the Lecturer:
//           <select
//             className="w-60 mb-6"
//             value={data.lecturername}
//             name="lecturername"
//             onChange={handleLecturerChange}
//           >
//             <option value="">Select Lecturer</option>
//             {lectureData &&
//               lectureData.map((singleLectureData, index) => (
//                 <option key={index} value={singleLectureData.lecturername}>
//                   {singleLectureData.lecturername}
//                 </option>
//               ))}
//           </select>
//         </label>

//         <label>
//           Lecturer ID:
//           <input
//             type="text"
//             name="lecturerid"
//             value={data.lecturerid}
//             readOnly
//           />
//         </label>

//         <button
//           className="bg-orange-500 px-11 py-3 hover:bg-orange-600 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mt-8 ml-96"
//           onClick={(e) => handleSubmit}
//           type="submit"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ManageModule;

import React, { useEffect, useState } from "react";
import manageLectureApi from "../../common/manageLac";
import axios from "axios";
import { toast } from "react-toastify";

const ManageModule = () => {
  //get lecture data
  const [lectureData, setLectureData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios
        .get("http://localhost:8000/api/get-managelecture")
        .then((res) => {
          setLectureData(res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleLecturerChange = (e) => {
    const selectedLecturer = e.target.value;
    const lecturer = lectureData.find(
      (lect) => lect.lecturername === selectedLecturer
    );
    setData((prev) => ({
      ...prev,
      lecturername: selectedLecturer,
      lecturerid: lecturer ? lecturer.lecturerid : "",
    }));
  };

  //post module data and clear one part

  const initialData = {
    faculty: "",
    department: "",
    batch: "",
    modulename: "",
    modulecode: "",
    lecturername: "",
    lecturerid: "",
  };

  const [data, setData] = useState(initialData);

  // const [data, setData] = useState({
  //   faculty: "",
  //   department: "",
  //   batch: "",
  //   modulename: "",
  //   modulecode: "",
  //   lecturername: "",
  //   lecturerid: "",
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
      const response = await fetch("http://localhost:8000/api/manage-module", {
        method: manageLectureApi.manageLectureBackUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

  return (
    <div className="flex flex-col items-center justify-center mt-16 bg-gradient-to-b from-sky-900 to-sky-600 overflow-y-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Manage Module</h1>

      <div className=" focus:bg-blue-600 from-sky-900 w-full max-w-lg rounded-lg shadow-lg p-4 max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-black font-semibold">
              Choose the Faculty:
            </span>
            <select
              className="mt-4 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
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

          <label className="block">
            <span className="text-black font-semibold">
              Choose the Department:
            </span>
            <select
              className="mt-4 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
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

          <label className="block">
            <span className="text-black">Choose the Batch:</span>
            <select
              className="mt-4 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
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

          <label className="block">
            <span className="text-black">Module Name:</span>
            <input
              type="text"
              name="modulename"
              value={data.modulename}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              className="mt-4 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              required
            />
          </label>

          <label className="block">
            <span className="text-black">Module Code:</span>
            <input
              type="text"
              name="modulecode"
              value={data.modulecode}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              className="mt-4 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              required
            />
          </label>

          <label className="block">
            <span className="text-black">Choose the Lecturer:</span>
            <select
              className="mt-4 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              value={data.lecturername}
              onChange={handleLecturerChange}
              name="lecturername"
            >
              <option value="">Select Lecturer</option>
              {lectureData &&
                lectureData.map((singleLectureData, index) => (
                  <option key={index} value={singleLectureData.lecturername}>
                    {singleLectureData.lecturername}
                  </option>
                ))}
            </select>
          </label>

          <label className="block">
            <span className="text-black">Lecturer ID:</span>
            <input
              type="text"
              name="lecturerid"
              value={data.lecturerid}
              className="mt-4 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              readOnly
            />
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-blue-600 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageModule;
