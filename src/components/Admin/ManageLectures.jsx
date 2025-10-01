// import manageLectureApi from "../../common/manageLac";
// import React, { useState } from "react";

// const ManageLectures = () => {
//   const [data, setData] = useState({
//     email: "",
//     username: "",
//     password: "",
//     lecturerid: "",
//     lecturername: "",
//     faculty: "",
//     department: "",
//     profilepic: "",
//     first_day_at_work: "",
//     modulename: "",
//     gender: "",
//   });

//   const departments = {
//     "School of Computing": [
//       "Software Engineering",
//       "Cloud Computing",
//       "Cyber Security",
//       "Data Science",
//     ],
//     "School of Engineering": [
//       "Civil Engineering",
//       "Electronic Engineering",
//       "Mechatronic Engineering",
//       "Marine Engineering",
//     ],
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
//       const response = await fetch("http://localhost:8000/api/manage-lecture", {
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
//         Manage Lecturers
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
//           Username:{" "}
//           <input
//             className="mb-6"
//             type="text"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             name="username"
//             value={data.username}
//             required
//           />
//         </label>

//         <label>
//           Password:{" "}
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
//           Lecturer ID:
//           <input
//             className="mb-6"
//             type="text"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.lecturerid}
//             name="lecturerid"
//             required
//           />
//         </label>

//         <label>
//           Lecturer Name:
//           <input
//             className="mb-6"
//             type="text"
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             value={data.lecturername}
//             name="lecturername"
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

// export default ManageLectures;

import manageLectureApi from "../../common/manageLac";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ManageLectures = () => {
  const initialData = {
    email: "",
    username: "",
    password: "",
    lecturerid: "",
    lecturername: "",
    faculty: "",
    department: "",
    profilepic: "",
    first_day_at_work: "",
    modulename: "",
    gender: "",
  };

  const [data, setData] = useState(initialData);

  // const [data, setData] = useState({
  //   email: "",
  //   username: "",
  //   password: "",
  //   lecturerid: "",
  //   lecturername: "",
  //   faculty: "",
  //   department: "",
  //   profilepic: "",
  //   first_day_at_work: "",
  //   modulename: "",
  //   gender: "",
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
      const response = await fetch("http://localhost:8000/api/manage-lecture", {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-900 to-sky-600">
      <div className="w-full max-w-lg bg-gradient-to-b from-sky-900 to-sky-600 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Manage Lecturers
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-4">
            Email:
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type="email"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.email}
              name="email"
              required
            />
          </label>

          <label className="mb-4">
            Username:
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.username}
              name="username"
              required
            />
          </label>

          <label className="mb-4">
            Password:
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type="password"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.password}
              name="password"
              required
            />
          </label>

          <label className="mb-4">
            Lecturer ID:
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.lecturerid}
              name="lecturerid"
              required
            />
          </label>

          <label className="mb-4">
            Lecturer Name:
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              value={data.lecturername}
              name="lecturername"
              required
            />
          </label>

          <label className="mb-4">
            Module Name:
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              name="modulename"
              required
            />
          </label>

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

export default ManageLectures;
