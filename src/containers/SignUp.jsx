import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../assets";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from "../helpers/imageTobase64";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";

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
          data
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        }

        if (response.data.error) {
          toast.error(response.data.message);
        }

        console.log("Update response:", response);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Plese check password and confirm password");
    }
  };
  console.log("data login", data);

  return (
    // <div className="mx-auto p-4 w-screen h-screen flex items-center bg-gradient-to-b from-sky-900 to-sky-600">
    <div className="w-screen h-screen bg-gradient-to-t from-sky-900 to-sky-600 flex flex-col justify-center items-center">
      <div className="p-2 w-full py-5 max-w-md mx-auto bg-sky-700 rounded-2xl shadow-lg">
        <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full">
          <div>
            <img src={data.profilepic || signin} alt="" />
          </div>
          <form>
            <label>
              <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                Upload Photo
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
            </label>
          </form>
        </div>

        <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="grid">
            <label className="text-xl font-bold">Name : </label>
            <div className="flex items-center rounded-lg shadow-lg bg-slate-100 p-3">
              <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
              <input
                type="name"
                name="name"
                onChange={handleOnChange}
                value={data.name}
                placeholder="Enter Your Name"
                className="bg-transparent text-gray-700 focus:outline-none w-full h-full outline-none"
                required
              />
            </div>
          </div>

          <div className="grid mt-3">
            <label className="text-xl font-bold">Email : </label>
            <div className="flex items-center rounded-lg shadow-lg bg-slate-100 p-3">
              <EnvelopeIcon className="h-6 w-6 text-gray-600 mr-2" />
              <input
                type="email"
                name="email"
                onChange={handleOnChange}
                value={data.email}
                placeholder="Enter Email"
                className="w-full h-full outline-none bg-transparent"
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="text-xl font-bold">Password : </label>
            <div className="flex items-center rounded-lg shadow-lg bg-slate-100 p-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                onChange={handleOnChange}
                value={data.password}
                className="w-full h-full outline-none bg-transparent"
                required
              />
              <div
                className="cursor-pointer text-lg"
                onClick={() => setShowPassword((preve) => !preve)}
              >
                <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <label className="text-xl font-bold">Confirm Password : </label>
            <div className="flex items-center rounded-lg shadow-lg bg-slate-100 p-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Confirm Password"
                name="confirmpassword"
                onChange={handleOnChange}
                value={data.confirmpassword}
                className="w-full h-full outline-none bg-transparent"
                required
              />
              <div
                className="cursor-pointer text-lg"
                onClick={() => setShowConfirmPassword((preve) => !preve)}
              >
                <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
          </div>

          <button className="bg-orange-500 px-11 py-3 hover:bg-orange-600 rounded-full w-full max-w-[150px] hover:scale-110 transition-all mt-8 ml-36">
            Sign up
          </button>
        </form>
        <p className="my-5 text-white">
          Already have account ?
          <Link
            to={"/login"}
            className=" text-red-600 hover:text-red-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
