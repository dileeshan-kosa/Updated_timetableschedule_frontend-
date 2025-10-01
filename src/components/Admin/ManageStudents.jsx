// import React, { useState } from "react";
// import manageStudentApi from "../../common/manageStu";

// const ManageStudents = () => {
//   const [data, setData] = useState({
//     email: "",
//     username: "",
//     password: "",
//     faculty: "",
//     department: "",
//     batch: "",
//     studentname: "",
//     studentid: "",
//     profilepic: "",
//     degree: "",
//     gender: "",
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
//       const response = await fetch("http://localhost:8000/api/manage-student", {
//         method: manageStudentApi.manageStudentBackUp.method,
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
//         Manage Students
//       </h1>
//       <form
//         className="flex flex-col justify-start items-start h-screen p-2 font-semibold"
//         onSubmit={handleSubmit}
//       >
//         <label>
//           Email:
//           <input
//             className="mb-6"
//             type="email"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.email}
//             name="email"
//             required
//           />
//         </label>
//         <label>
//           Username:
//           <input
//             className="mb-6"
//             type="text"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.username}
//             name="username"
//             required
//           />
//         </label>

//         <label>
//           Password:
//           <input
//             className="mb-6"
//             type="password"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.password}
//             name="password"
//             required
//           />
//         </label>

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
//           Student Name:
//           <input
//             className="mb-6"
//             type="text"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.studentname}
//             name="studentname"
//             required
//           />
//         </label>

//         <label>
//           Student Index Number:
//           <input
//             className="mb-6"
//             type="text"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.studentid}
//             name="studentid"
//             required
//           />
//         </label>

//         <button
//           type="submit"
//           onClick={(e) => handleSubmit}
//           className="bg-orange-500 px-11 py-3 hover:bg-orange-600 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mt-8 ml-96"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ManageStudents;

import React, { useState } from "react";
import manageStudentApi from "../../common/manageStu";
import { toast } from "react-toastify";

const ManageStudents = () => {
  const initialData = {
    email: "",
    username: "",
    password: "",
    faculty: "",
    department: "",
    batch: "",
    studentname: "",
    studentid: "",
    profilepic: "",
    degree: "",
    gender: "",
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
      const response = await fetch("http://localhost:8000/api/manage-student", {
        method: manageStudentApi.manageStudentBackUp.method,
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-900 to-sky-600 p-10 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8">Manage Students</h1>

      <div className=" w-full max-w-lg bg-gradient-to-b from-sky-900 to-sky-600 shadow-md rounded-lg p-8 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Email:</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              type="email"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.email}
              name="email"
              required
            />
          </div>

          {/* Username Field */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Username:</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              type="text"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.username}
              name="username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Password:</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              type="password"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.password}
              name="password"
              required
            />
          </div>

          {/* Faculty Field */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Choose the Faculty:</label>
            <select
              className="border border-gray-300 p-2 rounded-md"
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
          </div>

          {/* Department Field */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Choose the Department:</label>
            <select
              className="border border-gray-300 p-2 rounded-md"
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
          </div>

          {/* Batch Field */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Choose the Batch:</label>
            <select
              className="border border-gray-300 p-2 rounded-md"
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
          </div>

          {/* Student Name Field */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Student Name:</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              type="text"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.studentname}
              name="studentname"
              required
            />
          </div>

          {/* Student ID Field */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Student Index Number:</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              type="text"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.studentid}
              name="studentid"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
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

export default ManageStudents;
