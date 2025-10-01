import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setStudentDetails } from "../../store/studentSlice";
import { toast } from "react-toastify";
import { IoLogOut } from "react-icons/io5";

const DBHeader = () => {
  // Get the _id from localstorage
  const id = localStorage.getItem("userId");
  //get student data
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

  const [isMenu, setIsMenu] = useState(false);
  // const menuRef = useRef(null);
  const student = useSelector((state) => state?.student?.student);

  // console.log("Student Header", student);

  const dispach = useDispatch();
  const navigate = useNavigate();

  const StudenthandleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/adminLogout",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        dispach(setStudentDetails(null));
        localStorage.clear(); //logout
        navigate("/");
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("cannot log out student", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-3 relative">
      <p className="text-center font-bold text-white text-5xl ml-96 mb-5">
        Student
      </p>
      <div
        className="flex items-center justify-center gap-4"
        onMouseEnter={() => setIsMenu(true)}
      >
        <motion.div
          className="text-4xl cursor-pointer mt-1 mr-14"
          whileHover={{ scale: 1.15 }}
          onClick={() => setIsMenu(!isMenu)}
        >
          {studentData?.profilepic ? (
            <img
              src={studentData?.profilepic}
              className="mr-16 w-24 h-24 rounded-full border-4 border-red-600"
            />
          ) : (
            <FaRegUserCircle className="w-16 h-16 mr-24" />
          )}
        </motion.div>

        {isMenu && (
          <motion.div
            onMouseLeave={() => setIsMenu(false)}
            // ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md absolute mt-14 top-12 right-20 flex flex-col gap-2"
          >
            <Link
              className="hover:text-red-500 text-xl text-black"
              to={"/stumyProfile"}
            >
              My Profile
            </Link>
            <Link
              className="hover:text-red-500 text-xl text-black"
              to={"/stuProfile"}
            >
              Edit Profile
            </Link>
            <Link
              className="hover:text-red-500 text-xl text-black"
              to={"/dashboard/notification"}
            >
              Notification
            </Link>

            <NavLink className="flex">
              <button
                onClick={StudenthandleLogout}
                className="flex items-center px-4 py-2 rounded-md bg-headingColor border border-purple-200 cursor-pointer w-64 h-14"
              >
                <IoLogOut className="text-2xl text-textColor mr-2" />
                <span>Logout</span>
              </button>
            </NavLink>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DBHeader;
