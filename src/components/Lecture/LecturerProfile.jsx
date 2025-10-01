import React, { useEffect, useState } from "react";
import { signin } from "../../assets";
import imageTobase64 from "../../helpers/imageTobase64";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const LecturerProfile = () => {
  // Get the _id from localstorage
  const id = localStorage.getItem("Lecturer");
  //get lecturer data
  const [lecturerData, setLecturerData] = useState([]);

  const fetchLecturerData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/get-managelecturer/${id}`
      );
      console.log("Lecturer data", res.data);
      setLecturerData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchLecturerData();
  }, [id]);

  const initialData = {
    profilepic: "",
    lecturername: "",
    first_day_at_work: null,
    gender: "",
    modulename: "",
  };
  const [data, setData] = useState(initialData);

  // const [data, setData] = useState({
  //   profilepic: "",
  //   lecturername: "",
  //   first_day_at_work: null,
  //   gender: "",
  //   modulename: "",
  // });

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

  //Update and save lecturer profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("Lecturer"); //update
      // console.log("Lecturer", data);

      const response = await axios.put(
        `http://localhost:8000/api/update-lecture/${userId}`,
        data
      );
      console.log("response", response);
      // Check if the request was successful
      if (response.status === 200) {
        toast.success(response.data.message || "Data successfully submitted!");

        // Call resetForm to clear the fields
        resetForm();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form."); // Notify user about the error
    }
  };
  console.log("data login", data);

  const handlefirstDate = (newValue) => {
    setData((prev) => ({
      ...prev,
      first_day_at_work: newValue ? newValue.format("YYYY-MM-DD") : "",
    }));
  };

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
                name="lecturername"
                type="text"
                value={data.lecturername || lecturerData?.lecturername || ""}
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              />
            </div>

            {/* Right hand input */}
            <div className="flex flex-col">
              <label className="font-semibold mr-28 text-black text-2xl mb-2">
                First day at Work:
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Lecture Date"
                    value={
                      data.first_day_at_work
                        ? dayjs(data.first_day_at_work)
                        : null
                    }
                    onChange={handlefirstDate}
                    className="h-14 w-80 mb-6"
                    format="YYYY-MM-DD"
                  />
                </DemoContainer>
              </LocalizationProvider>
              {/* <input
                className="h-14 w-80 bg-slate-50 text-black text-xl rounded-md px-4"
                placeholder="Enter Your Program"
                name="degreeprogram"
                type="text"
                // onChange={(e) => handleOnChange("degreeprogram", e.target.value)}
              /> */}
            </div>
          </div>

          {/* Bottem buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center mt-14 space-x-64">
            <div className="flex flex-col">
              <label className="font-semibold mr-24 text-black text-2xl mb-2">
                Enter Your Gender:
              </label>
              <input
                className="h-14 w-80 bg-slate-50 text-black text-xl rounded-md px-4"
                placeholder="Enter Your Name"
                name="gender"
                type="text"
                value={data.gender || lecturerData?.gender || ""}
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mr-24 text-black text-2xl mb-2">
                Enter Your Module:
              </label>
              <input
                className="h-14 w-80 bg-slate-50 text-black text-xl rounded-md px-4"
                placeholder="Enter Your Program"
                name="modulename"
                type="text"
                value={data.modulename || lecturerData?.modulename || ""}
                onChange={(e) => handleOnChange(e.target.name, e.target.value)}
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

export default LecturerProfile;
