import React, { useEffect, useState } from "react";
import { signin } from "../../assets";
import imageTobase64 from "../../helpers/imageTobase64";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setStudentDetails } from "../../store/studentSlice";
import { toast } from "react-toastify";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state?.student?.student);

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

  const initialData = {
    profilepic: "",
    studentname: "",
    batch: "",
    degree: "",
    gender: "",
  };
  const [data, setData] = useState(initialData);

  const handleOnChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilepic: imagePic,
      };
    });
  };

  // Function to reset the form
  const resetForm = () => {
    setData(initialData); // Reset form data to initial values
  };

  //Update and save student profile data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // localStorage.setItem("userId", data); //login
      const userId = localStorage.getItem("userId"); //update

      console.log("hi", data);
      const response = await axios.put(
        `http://localhost:8000/api/update-student/${userId}`,
        data
      );

      // Check if the request was successful
      if (response.status === 200) {
        // Use toast to display the success message
        toast.success(response.data.message || "Data successfully submitted!");

        console.log("Update response student:", response);
        dispatch(setStudentDetails(data)); // Dispatch action to update Redux store

        // Call resetForm to clear the fields
        resetForm();
      }

      // alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      // Display an error message using toast
      toast.error("Failed to submit data. Please try again.");
    }
  };
  console.log("data login", data);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-sky-900 to-sky-600">
      <div className="flex flex-col items-center h-full pt-4 text-center text-white md:text-[60px] font-2xl font-semibold">
        Edit Your Profile
        <div className="mt-10 relative rounded-full">
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <img
              src={data.profilepic || signin}
              alt="Profile"
              className="mx-auto rounded-full"
              // value={studentData?.profilepic}
            />
          </div>
        </div>
        <form>
          <label>
            {!data.profilepic && (
              <div className="mt-32 w-32 rounded-full text-center -ml-16 absolute top-24 text-xs bg-opacity-5 bg-slate-200 pb-8 cursor-pointer flex flex-col pt-4 text-black md:text-[20px] font-semibold">
                Upload Photo
              </div>
            )}
            <input type="file" className="hidden" onChange={handleUploadPic} />
          </label>
        </form>
        <form onSubmit={handleSubmit}>
          {/* Flex container for the two input fields */}
          <div className="flex flex-col md:flex-row justify-center items-center mt-12 space-x-64">
            {/* Left hand input */}
            <div className="flex flex-col">
              <label className="font-semibold mr-28 text-black text-2xl mb-2">
                Enter Your Name:
              </label>
              <input
                className="h-14 w-80 bg-slate-50 text-black text-xl rounded-md px-4"
                placeholder="Enter Your Name"
                name="studentname"
                type="text"
                value={data.studentname || studentData?.studentname || ""}
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                required
              />
            </div>

            {/* Right hand input */}
            <div className="flex flex-col">
              <label className="font-semibold mr-16 text-black text-2xl mb-2">
                Your Degree Program:
              </label>
              <input
                className="h-14 w-80 bg-slate-50 text-black text-xl rounded-md px-4"
                placeholder="Enter Your Program"
                name="degree"
                type="text"
                value={data.degree || studentData?.degree || ""}
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                required
              />
            </div>
          </div>

          {/* Bottem buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center mt-14 space-x-64">
            <div className="flex flex-col">
              <label className="font-semibold mr-28 text-black text-2xl mb-2">
                Enter Your Batch:
              </label>
              <input
                className="h-14 w-80 bg-slate-50 text-black text-xl rounded-md px-4"
                placeholder="Enter Your Name"
                name="batch"
                type="text"
                value={data.batch || studentData?.batch || ""}
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mr-24 text-black text-2xl mb-2">
                Enter Your Gender:
              </label>
              <input
                className="h-14 w-80 bg-slate-50 text-black text-xl rounded-md px-4"
                placeholder="Enter Your gender"
                name="gender"
                type="text"
                value={data.gender || studentData?.gender || ""}
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={(e) => handleSubmit}
            className="bg-orange-500 px-12 py-4 hover:bg-orange-600 rounded-full text-center w-44 max-w-[150px] text-xl hover:scale-110 transition-all mt-8"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
