import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setLecturerDetails } from "../../store/lecturerSlice";
import { IoLogOut } from "react-icons/io5";

const LecHeader = () => {
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

  const [isMenu, setIsMenu] = useState(false);
  const lecturer = useSelector((state) => state?.lecturer?.lecturer);

  // console.log("Lecturer Header", lecturer);

  const dispach = useDispatch();
  const navigate = useNavigate();

  const LecturerhandleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/adminLogout",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        dispach(setLecturerDetails(null));
        localStorage.clear(); //logout
        navigate("/");
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("cannot log out Lecturer", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-3 relative">
      <p className="text-center font-bold text-white text-5xl ml-96 mb-5">
        Lecturer
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
          {lecturerData?.profilepic ? (
            <img
              src={lecturerData?.profilepic}
              className="mr-16 w-24 h-24 rounded-full border-4 border-red-600"
            />
          ) : (
            <FaRegUserCircle className="w-16 h-16 mr-24" />
          )}
        </motion.div>

        {isMenu && (
          <motion.div
            onMouseLeave={() => setIsMenu(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md absolute mt-14 top-12 right-20 flex flex-col gap-4"
          >
            <Link
              className="hover:text-red-500 text-xl text-black"
              to={"/lecmyProfile"}
            >
              My Profile
            </Link>
            <Link
              className="hover:text-red-500 text-xl text-black"
              to={"/lecProfile"}
            >
              Edit Profile
            </Link>
            <Link
              className="hover:text-red-500 text-xl text-black"
              // to={"/dashboard/notification"}
            >
              Notification
            </Link>

            <NavLink className="flex">
              <button
                onClick={LecturerhandleLogout}
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

export default LecHeader;
