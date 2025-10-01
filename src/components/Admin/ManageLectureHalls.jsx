// import React, { useState } from "react";
// import managelecturehallApi from "../../common/managehalls";

// const ManageLectureHalls = () => {
//   const [halls, setHalls] = useState([""]);

//   const [data, setData] = useState({
//     building: "",
//     halls: [],
//   });

//   const handleOnChange = (name, value) => {
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleHallChange = (index, value) => {
//     const newHalls = [...halls];
//     newHalls[index] = value;
//     setHalls(newHalls);
//     setData((prev) => ({
//       ...prev,
//       halls: newHalls,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/manage-lecturehall",
//         {
//           method: managelecturehallApi.manageLectureHallBackUp.method,
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

//   const addHall = () => {
//     setHalls([...halls, ""]);
//   };

// //   const handleHallChange = (index, value) => {
// //     const newHalls = hall.map((hall, i) => (i === index ? value : hall));
// //     setHall(newHalls);
// //   };
//   return (
//     <div className="text-center m-24">
//       <h1 className=" items-center justify-center text-center font-semibold mt-2 mb-24">
//         Manage Halls
//       </h1>
//       <form
//         className="flex flex-col justify-start items-start h-screen p-2 font-semibold"
//         onSubmit={handleSubmit}
//       >
//         <label>
//           Building Name:
//           <input
//             className="mb-6"
//             type="text"
//             value={data.building}
//             onChange={(e) => handleOnChange(e.target.name, e.target.value)}
//             name="building"
//             required
//           />
//         </label>
//         {halls.map((hall, index) => (
//           <label key={index}>
//             Hall ID {index + 1}:
//             <input
//               className="mb-6"
//               type="text"
//               value={hall}
//               name={`hall-${index}`}
//               onChange={(e) => handleHallChange(index, e.target.value)}
//             />
//           </label>
//         ))}
//         <button
//           className="bg-green-500 px-8 py-3 hover:bg-green-800 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mt-8 ml-4"
//           type="button"
//           onClick={addHall}
//         >
//           Add Hall
//         </button>
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

// export default ManageLectureHalls;

import React, { useState } from "react";
import managelecturehallApi from "../../common/managehalls";
import { toast } from "react-toastify";

const ManageLectureHalls = () => {
  const initialData = {
    building: "",
    halls: [],
  };
  const [halls, setHalls] = useState([""]);
  const [data, setData] = useState(initialData);

  // const [data, setData] = useState({
  //   building: "",
  //   halls: [],
  // });

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHallChange = (index, value) => {
    const newHalls = [...halls];
    newHalls[index] = value;
    setHalls(newHalls);
    setData((prev) => ({
      ...prev,
      halls: newHalls,
    }));
  };

  // Function to reset the form
  const resetForm = () => {
    setData(initialData); // Reset form data to initial values
    setHalls([""]); // Clear hall inputs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/manage-lecturehall",
        {
          method: managelecturehallApi.manageLectureHallBackUp.method,
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
  console.log("data login", data);

  const addHall = () => {
    setHalls([...halls, ""]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gradient-to-b from-sky-900 to-sky-600">
      <h1 className="text-4xl font-semibold mb-12 text-center">Manage Halls</h1>

      <div className="bg-gradient-to-b from-sky-900 to-sky-600 shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-black font-semibold">Building Name:</span>
            <input
              className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              type="text"
              value={data.building}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              name="building"
              required
            />
          </label>

          {halls.map((hall, index) => (
            <label key={index} className="block">
              <span className="text-black font-semibold">
                Hall ID {index + 1}:
              </span>
              <input
                className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                type="text"
                value={hall}
                name={`hall-${index}`}
                onChange={(e) => handleHallChange(index, e.target.value)}
              />
            </label>
          ))}

          <div className="flex space-x-4">
            <button
              className="bg-green-500 px-6 py-3 text-white rounded-full hover:bg-green-600 hover:scale-105 transition-transform"
              type="button"
              onClick={addHall}
            >
              Add Hall
            </button>

            <button
              type="submit"
              className="bg-orange-500 px-6 py-3 text-white rounded-full hover:bg-orange-600 hover:scale-105 transition-transform"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageLectureHalls;
