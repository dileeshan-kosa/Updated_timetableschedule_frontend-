// import React from "react";
// import HomeHeader from "./HomeHeader";
// import {
//   NoInstallation,
//   HpPhoto,
//   EasyTimetabble,
//   Feedback,
//   Notification,
//   Responsive,
// } from "../assets";
// import Footer from "./Footer";
// import { motion } from "framer-motion";

// const Home = () => {
//   return (
//     <div className="w-full min-h-screen bg-gradient-to-b from-sky-900 to-sky-600 text-white">
//       <HomeHeader />
//       <div className="flex flex-col md:flex-row items-start justify-start p-32">
//         <div className="text-black ml-1 flex-1">
//           <p className="text-[45px] md:text-[86px] font-sans font-extrabold leading-tight mb-6">
//             Welcome to
//           </p>
//           <p className=" flex text-[40px] md:text-[80px] font-sans font-extrabold leading-tight mb-6">
//             <span className="text-blue-300 mr-8">Timetable </span>{" "}
//             <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
//               Scheduler
//             </span>
//           </p>
//           <p className="text-3xl mt-4 font-semibold">
//             Easily manage your Timetable and stay updated.
//           </p>
//         </div>
//         <motion.div
//           className="py-2 flex-1 flex items-center justify-center md:justify-end"
//           initial={{ scale: 0.8, opacity: 0 }}
//           whileInView={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <img
//             className="w-96 max-w-lg h-96"
//             src={HpPhoto}
//             alt="Timetable Scheduler"
//           />
//         </motion.div>
//       </div>

//       {/* Features Section */}

//       <section className="bg-gradient-to-t from-sky-900 to-sky-600 text-white py-12 mt-6">
//         <h2 className="text-4xl font-extrabold text-center mb-8">Features</h2>
//         <div className="container mx-auto w-[90%] px-2 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 img: EasyTimetabble,
//                 title: "Easy Timetable Management",
//                 desc: "Manage schedules easily.",
//               },
//               {
//                 img: Notification,
//                 title: "Notifications",
//                 desc: "Get notified on time.",
//               },
//               {
//                 img: Feedback,
//                 title: "Feedback System",
//                 desc: "Provide & receive feedback.",
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.1 }}
//                 className="flex flex-col items-center transition-transform"
//               >
//                 <img
//                   src={feature.img}
//                   alt={feature.title}
//                   className="mb-4 w-32 h-32"
//                 />
//                 <h3 className="text-2xl font-semibold">{feature.title}</h3>
//                 <p className="mt-2 text-center text-lg">{feature.desc}</p>
//               </motion.div>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//             {[
//               {
//                 img: NoInstallation,
//                 title: "No Installation",
//                 desc: "No hassle, access anywhere.",
//               },
//               {
//                 img: Responsive,
//                 title: "Responsive Design",
//                 desc: "Adaptable to all devices.",
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.1 }}
//                 className="flex flex-col items-center transition-transform"
//               >
//                 <img
//                   src={feature.img}
//                   alt={feature.title}
//                   className="mb-4 w-32 h-32"
//                 />
//                 <h3 className="text-2xl font-semibold">{feature.title}</h3>
//                 <p className="mt-2 text-center text-lg">{feature.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* <section className="bg-gradient-to-t from-sky-900 to-sky-600 text-white py-12 mt-6">
//         <h2 className="text-4xl font-extrabold text-center mb-8">Features</h2>
//         <div className="container mx-auto w-[90%] px-2 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="flex flex-col items-center">
//               <img
//                 src={EasyTimetabble}
//                 alt="Easy Timetable Management"
//                 className="mb-4 w-32 h-32"
//               />
//               <h3 className="text-xl font-semibold">
//                 Easy Timetable Management
//               </h3>
//               <p className="mt-2 text-center">Easily manage your schedules.</p>
//             </div>

//             <div className="flex flex-col items-center">
//               <img
//                 src={Notification}
//                 alt="Notifications"
//                 className="mb-4 w-32 h-32"
//               />
//               <h3 className="text-xl font-semibold">Notifications</h3>
//               <p className="mt-2 text-center">Get notified of updates.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <img
//                 src={Feedback}
//                 alt="Feedback System"
//                 className="mb-4 w-32 h-32"
//               />
//               <h3 className="text-xl font-semibold">Feedback System</h3>
//               <p className="mt-2 text-center">Provide and receive feedback.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <img
//                 src={NoInstallation}
//                 alt="No Installation"
//                 className=" mb-4 w-32 h-32"
//               />
//               <h3 className=" text-xl font-semibold">No Installation</h3>
//               <p className="mt-2 text-center">
//                 No download, no installation, no hassle. Timetable scheduler is
//                 available from any computer or mobile device.
//               </p>
//             </div>
//             <div className="flex flex-col items-center ">
//               <img
//                 src={Responsive}
//                 alt="Responsive Design"
//                 className=" mb-4 w-32 h-32"
//               />
//               <h3 className=" text-xl font-semibold">Responsive Design</h3>
//               <p className="mt-2 text-center">
//                 No download, no installation, no hassle. Timetable scheduler is
//                 available from any computer or mobile device.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section> */}

//       {/* Footer Section */}
//       <Footer />
//       {/* <footer className="bg-gray-800 text-white py-10 mt-12">
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
//           <div className="text-center mr-96">
//             <h3 className="text-blue-300 font-bold text-xl">Timetable</h3>
//             <h3 className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
//               Scheduler
//             </h3>
//             <p className="mt-2 text-sm">Manage your schedules effortlessly.</p>
//           </div>
//           <div>
//             <h3 className="font-bold text-xl">Features</h3>
//             <ul className="mt-2 text-sm space-y-1">
//               <li>Timetable Management</li>
//               <li>Notifications</li>
//               <li>Feedback System</li>
//               <li>No Installation</li>
//               <li>Responsive Design</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-bold text-xl">Quick Links</h3>
//             <ul className="mt-2 text-sm space-y-1">
//               <li>Home</li>
//               <li>About</li>
//               <li>Contact</li>
//               <li>Features</li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-8">
//           <div className="flex justify-center space-x-6">
//             <a href="#">
//               <img
//                 src="/path/to/linkedin-icon"
//                 alt="LinkedIn"
//                 className="w-6 h-6"
//               />
//             </a>
//             <a href="#">
//               <img
//                 src="/path/to/instagram-icon"
//                 alt="Instagram"
//                 className="w-6 h-6"
//               />
//             </a>
//             <a href="#">
//               <img
//                 src="/path/to/facebook-icon"
//                 alt="Facebook"
//                 className="w-6 h-6"
//               />
//             </a>
//           </div>
//           <p className="text-center text-sm mt-4">
//             Timetable Scheduler © 2024 - All Rights Reserved
//           </p>
//         </div>
        
//       </footer> */}
//     </div>
//   );
// };

// export default Home;

import React, { useRef } from "react";
import HomeHeader from "./HomeHeader";
import {
  NoInstallation,
  HpPhoto,
  EasyTimetabble,
  Feedback,
  Notification,
  Responsive,
} from "../assets";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Home = () => {
  // Create refs for Features and Footer sections
  const featuresRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-900 to-sky-600 text-white">
      <HomeHeader featuresRef={featuresRef} footerRef={footerRef} />

      <div className="flex flex-col md:flex-row items-start justify-start p-32">
        <div className="text-black ml-1 flex-1">
          <p className="text-[45px] md:text-[86px] font-sans font-extrabold leading-tight mb-6">
            Welcome to
          </p>
          <p className=" flex text-[40px] md:text-[80px] font-sans font-extrabold leading-tight mb-6">
            <span className="text-blue-300 mr-8">Timetable </span>{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              Scheduler
            </span>
          </p>
          <p className=" mt-10 text-4xl font-semibold">
            Easily manage your Timetable  
          </p>
          <p className="ml-28 text-4xl mt-4 font-semibold">
          and stay updated
          </p>
        </div>
        <motion.div
          className="py-2 flex-1 flex items-center justify-center md:justify-end"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            className="w-96 max-w-lg h-96"
            src={HpPhoto}
            alt="Timetable Scheduler"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="bg-gradient-to-t from-sky-900 to-sky-600 text-white py-12 mt-6"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8">Features</h2>
        <div className="container mx-auto w-[90%] px-2 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: EasyTimetabble,
                title: "Easy Timetable Management",
                desc: "Manage schedules easily.",
              },
              {
                img: Notification,
                title: "Notifications",
                desc: "Get notified on time.",
              },
              {
                img: Feedback,
                title: "Feedback System",
                desc: "Provide & receive feedback.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center transition-transform"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="mb-4 w-32 h-32"
                />
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-center text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                img: NoInstallation,
                title: "No Installation",
                desc: "No hassle, access anywhere.",
              },
              {
                img: Responsive,
                title: "Responsive Design",
                desc: "Adaptable to all devices.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center transition-transform"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="mb-4 w-32 h-32"
                />
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-center text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
