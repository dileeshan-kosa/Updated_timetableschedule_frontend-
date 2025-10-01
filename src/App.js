import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, LecturerDashboard, Main, SignUp } from "./containers";
import Login from "./containers/Login";
import AdminDashboard from "./containers/AdminDashboard";
import ForgotPassword from "./containers/ForgotPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "./store/adminSlice";
import StudentProfile from "./components/Student/StudentProfile";
import LecturerProfile from "./components/Lecture/LecturerProfile";
import StudentMyProfile from "./components/Student/StudentMyProfile";
import LecturerMyProfile from "./components/Lecture/LecturerMyProfile";
import { About } from "./components";

const App = () => {
  const dispatch = useDispatch();

  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin-details",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setAdminDetails(response.data));
      }

      console.log("data-admin", response);
    } catch (error) {
      console.log("Not fetching data:", error);
    }
  };

  useEffect(() => {
    //admin details
    fetchAdminDetails();
  });

  return (
    <Context.Provider
      value={{
        fetchAdminDetails, //admin details fetch
      }}
    >
      <div className="w-screen min-h-screen h-auto flex items-center justify-center">
        <ToastContainer />
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/admindashboard/*" element={<AdminDashboard />} />
          <Route path="/lecturerdashboard*" element={<LecturerDashboard />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/stuProfile" element={<StudentProfile />} />
          <Route path="/stumyProfile" element={<StudentMyProfile />} />
          <Route path="/lecProfile" element={<LecturerProfile />} />
          <Route path="/lecmyProfile" element={<LecturerMyProfile />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </Context.Provider>
  );
};

export default App;
