import React, { useContext, useState } from "react";
import { signin } from "../assets";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Context from "../context";
import { useDispatch } from "react-redux";
import { setStudentDetails } from "../store/studentSlice";
import { setLecturerDetails } from "../store/lecturerSlice";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/signin`,
        data,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        // console.log("AAAAAAAAAAAAAAAAAAAA", response);
        toast.success(response.data.message);

        if (response.data.role === "admin") {
          navigate("/admindashboard");
        } else if (response.data.role === "student") {
          console.log("stu details :", response?.data);
          dispatch(setStudentDetails(response?.data?.details));
          localStorage.setItem("userId", response?.data?.details._id);
          localStorage.setItem(
            "userDepartment",
            response?.data?.details.department,
          );
          navigate("/dashboard");
        } else {
          dispatch(setLecturerDetails(response?.data.details));
          console.log("Lect details :", response?.data);
          localStorage.setItem("Lecturer", response?.data?.details._id);
          localStorage.setItem(
            "lectureModulename",
            response?.data?.details.modulename,
          );
          navigate("/lecturerdashboard");
        }
        fetchUserDetails();
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };
  console.log("data login", data);

  // return (
  //   <div className="w-screen h-screen bg-gradient-to-t from-sky-900 to-sky-600 flex flex-col justify-center items-center">
  //     <div className="p-2 w-full py-5 max-w-md mx-auto bg-sky-700 rounded-2xl shadow-lg">
  //       <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full">
  //         <img src={signin} alt="" className="" />
  //       </div>

  //       <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
  //         <div className="grid">
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
  //             />
  //           </div>
  //         </div>

  //         <div className="grid mt-3">
  //           <label className="text-xl font-bold">Password : </label>
  //           <div className="flex items-center rounded-lg shadow-lg bg-slate-100 p-3">
  //             <input
  //               type={showPassword ? "text" : "password"}
  //               placeholder="Enter Password"
  //               name="password"
  //               onChange={handleOnChange}
  //               value={data.password}
  //               className="w-full h-full outline-none bg-transparent"
  //             />
  //             <div
  //               className="cursor-pointer text-lg"
  //               onClick={() => setShowPassword((preve) => !preve)}
  //             >
  //               <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
  //             </div>
  //           </div>
  //           <Link
  //             to={"/forgotpassword"}
  //             className=" text-white block w-fit ml-auto hover:underline hover:text-red-600"
  //           >
  //             Forgot password ?
  //           </Link>
  //         </div>

  //         <button className="bg-orange-500 px-11 py-3 hover:bg-orange-600 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mt-8 ml-36">
  //           Login
  //         </button>
  //       </form>
  //       <p className="my-5 text-white">
  //         Don't have account ?
  //         <Link
  //           to={"/signup"}
  //           className=" text-red-600 hover:text-red-700 hover:underline"
  //         >
  //           Sign up
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-screen min-h-screen bg-gradient-to-t from-sky-900 to-sky-600 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mx-auto bg-sky-700 rounded-2xl shadow-2xl p-8">
        {/* Sign In Image */}
        <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-2 border-sky-300 shadow-sm mb-6 bg-white">
          <img
            src={signin}
            alt="Sign In"
            className="w-full h-full object-cover"
          />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

            {/* Forgot Password Link */}
            <Link
              to={"/forgotpassword"}
              className="text-sm text-sky-200 hover:text-orange-400 hover:underline transition-colors mt-2 text-right block"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sky-100 text-sm">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="font-semibold text-white hover:text-orange-400 hover:underline transition-colors ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
