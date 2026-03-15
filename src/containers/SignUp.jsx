import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../assets";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from "../helpers/imageTobase64";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    profilepic: "",
  });

  const navigate = useNavigate();
  // console.log("Daaaaaaaaaaaaaaaaaaaa", data)

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmpassword) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/signup",
          data,
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        }

        if (response.data.error) {
          toast.error(response.data.message);
        }

        // console.log("Update response:", response);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      console.log("Plese check password and confirm password");
    }
  };
  console.log("data login", data);

  // return (
  //   // <div className="mx-auto p-4 w-screen h-screen flex items-center bg-gradient-to-b from-sky-900 to-sky-600">
  //   <div className="w-screen h-screen bg-gradient-to-t from-sky-900 to-sky-600 flex flex-col justify-center items-center">
  //     <div className="p-2 w-full py-5 max-w-md mx-auto bg-sky-700 rounded-2xl shadow-lg">
  //       <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full">
  //         <div>
  //           <img src={data.profilepic || signin} alt="" />
  //         </div>
  //         <form>
  //           <label>
  //             <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
  //               Upload Photo
  //             </div>
  //             <input
  //               type="file"
  //               className="hidden"
  //               onChange={handleUploadPic}
  //             />
  //           </label>
  //         </form>
  //       </div>

  //       <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
  //         <div className="grid">
  //           <label className="text-xl font-bold">Name : </label>
  //           <div className="flex items-center rounded-lg shadow-lg bg-slate-100 p-3">
  //             <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
  //             <input
  //               type="name"
  //               name="name"
  //               onChange={handleOnChange}
  //               value={data.name}
  //               placeholder="Enter Your Name"
  //               className="bg-transparent text-gray-700 focus:outline-none w-full h-full outline-none"
  //               required
  //             />
  //           </div>
  //         </div>

  //         <div className="grid mt-3">
  //           <label className="text-xl font-bold">Email : </label>
  //           <div className="flex items-center rounded-lg shadow-lg bg-slate-100 p-3">
  //             <EnvelopeIcon className="h-6 w-6 text-gray-600 mr-2" />
  //             <input
  //               type="email"
  //               name="email"
  //               onChange={handleOnChange}
  //               value={data.email}
  //               placeholder="Enter Email"
  //               className="w-full h-full outline-none bg-transparent"
  //               required
  //             />
  //           </div>
  //         </div>

  //         <div className="mt-3">
  //           <label className="text-xl font-bold">Password : </label>
  //           <div className="flex items-center rounded-lg shadow-lg bg-slate-100 p-3">
  //             <input
  //               type={showPassword ? "text" : "password"}
  //               placeholder="Enter Password"
  //               name="password"
  //               onChange={handleOnChange}
  //               value={data.password}
  //               className="w-full h-full outline-none bg-transparent"
  //               required
  //             />
  //             <div
  //               className="cursor-pointer text-lg"
  //               onClick={() => setShowPassword((preve) => !preve)}
  //             >
  //               <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="mt-3">
  //           <label className="text-xl font-bold">Confirm Password : </label>
  //           <div className="flex items-center rounded-lg shadow-lg bg-slate-100 p-3">
  //             <input
  //               type={showConfirmPassword ? "text" : "password"}
  //               placeholder="Enter Confirm Password"
  //               name="confirmpassword"
  //               onChange={handleOnChange}
  //               value={data.confirmpassword}
  //               className="w-full h-full outline-none bg-transparent"
  //               required
  //             />
  //             <div
  //               className="cursor-pointer text-lg"
  //               onClick={() => setShowConfirmPassword((preve) => !preve)}
  //             >
  //               <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
  //             </div>
  //           </div>
  //         </div>

  //         <button className="bg-orange-500 px-11 py-3 hover:bg-orange-600 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mt-8 ml-36">
  //           Sign up
  //         </button>
  //       </form>
  //       <p className="my-5 text-white">
  //         Already have account ?
  //         <Link
  //           to={"/login"}
  //           className=" text-red-600 hover:text-red-700 hover:underline"
  //         >
  //           Login
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-screen min-h-screen bg-gradient-to-t from-sky-900 to-sky-600 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mx-auto bg-sky-700 rounded-2xl shadow-2xl p-8">
        {/* Profile Picture Upload */}
        <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-2 border-sky-300 shadow-sm mb-6">
          <img
            src={data.profilepic || signin}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <form>
            <label>
              <div className="text-xs bg-black/50 text-white pb-3 pt-2 cursor-pointer text-center absolute bottom-0 w-full hover:bg-black/60 transition-colors">
                Upload
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
                accept="image/*"
              />
            </label>
          </form>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-sky-100 tracking-wide">
              Name
            </label>
            <div className="flex items-center rounded-lg shadow-inner bg-slate-100 p-3 focus-within:ring-2 focus-within:ring-orange-400 transition-all">
              <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                onChange={handleOnChange}
                value={data.name}
                placeholder="Enter Your Name"
                className="bg-transparent text-gray-800 focus:outline-none w-full h-full"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-sky-100 tracking-wide">
              Email
            </label>
            <div className="flex items-center rounded-lg shadow-inner bg-slate-100 p-3 focus-within:ring-2 focus-within:ring-orange-400 transition-all">
              <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                onChange={handleOnChange}
                value={data.email}
                placeholder="Enter Email"
                className="w-full h-full outline-none bg-transparent text-gray-800"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-sky-100 tracking-wide">
              Password
            </label>
            <div className="flex items-center rounded-lg shadow-inner bg-slate-100 p-3 focus-within:ring-2 focus-within:ring-orange-400 transition-all">
              <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                onChange={handleOnChange}
                value={data.password}
                className="w-full h-full outline-none bg-transparent text-gray-800 pr-2"
                required
              />
              <button
                type="button"
                className="cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword((preve) => !preve)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-sky-100 tracking-wide">
              Confirm Password
            </label>
            <div className="flex items-center rounded-lg shadow-inner bg-slate-100 p-3 focus-within:ring-2 focus-within:ring-orange-400 transition-all">
              <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Confirm Password"
                name="confirmpassword"
                onChange={handleOnChange}
                value={data.confirmpassword}
                className="w-full h-full outline-none bg-transparent text-gray-800 pr-2"
                required
              />
              <button
                type="button"
                className="cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowConfirmPassword((preve) => !preve)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Sign up
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sky-100 text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-white hover:text-orange-400 hover:underline transition-colors ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
