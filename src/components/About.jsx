import React from "react";
import Footer from "./Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-900 to-sky-600 text-white">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center py-20 px-10">
        <h1 className="text-[45px] md:text-[86px] font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] shadow-lg">
          About Timetable Scheduler
        </h1>
        <p className="text-lg md:text-2xl text-center max-w-4xl mb-10 text-gray-200 shadow-md">
          Timetable Scheduler is a comprehensive solution designed to simplify
          your scheduling process. With easy timetable management, notifications,
          and a responsive design, it ensures that you stay on top of your daily tasks
          and academic schedules, all without the hassle of installation.
        </p>
      </div>

      {/* Features Overview Section */}
      <section className="bg-gradient-to-t from-sky-900 to-sky-600 text-white py-12">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] shadow-lg">
          Why Choose Us?
        </h2>
        <div className="container mx-auto w-[90%] px-2 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ease of Use",
                desc: "A user-friendly interface allowing quick setup and management of your schedule.",
              },
              {
                title: "Accessible Anywhere",
                desc: "No installation required. Access your timetable from any device with a browser.",
              },
              {
                title: "Timely Notifications",
                desc: "Stay on track with reminders and notifications delivered straight to you.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center transition-transform bg-white bg-opacity-80 rounded-lg shadow-lg p-4"
              >
                <h3 className="text-2xl font-semibold mb-4 text-sky-600 shadow-md">{feature.title}</h3>
                <p className="text-center text-lg text-gray-800">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-12 bg-sky-800 text-white">
        <div className="container mx-auto w-[90%] px-2 py-8">
          <h2 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] shadow-lg">
            Our Vision & Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center transition-transform"
            >
              <h3 className="text-3xl font-semibold mb-4 text-sky-600 shadow-md">Our Vision</h3>
              <p className="text-lg text-center text-gray-200">
                To become the leading platform for timetable management, offering
                innovative solutions to improve organization and productivity for students
                and professionals alike.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center transition-transform"
            >
              <h3 className="text-3xl font-semibold mb-4 text-sky-600 shadow-md">Our Mission</h3>
              <p className="text-lg text-center text-gray-200">
                To provide an efficient, user-friendly, and accessible tool for managing
                timetables, ensuring that our users can stay organized with ease.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
