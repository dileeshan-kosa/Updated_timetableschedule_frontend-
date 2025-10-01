// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-10 mt-12">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
//         <div className="text-center mr-96">
//           <h3 className="text-blue-300 font-bold text-xl">
//             Timetable Scheduler
//           </h3>
//           <p className="mt-2 text-sm">Manage your schedules effortlessly.</p>
//         </div>
//         <div>
//           <h3 className="font-bold text-xl">Features</h3>
//           <ul className="mt-2 text-sm space-y-1">
//             <li>Timetable Management</li>
//             <li>Notifications</li>
//             <li>Feedback System</li>
//             <li>No Installation</li>
//             <li>Responsive Design</li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-bold text-xl">Quick Links</h3>
//           <ul className="mt-2 text-sm space-y-1">
//             <li>Home</li>
//             <li>About</li>
//             <li>Contact</li>
//             <li>Features</li>
//           </ul>
//         </div>
//       </div>

//       <div className="mt-8">
//         <div className="flex justify-center space-x-6">
//           <a href="#">
//             <img
//               src="/path/to/linkedin-icon"
//               alt="LinkedIn"
//               className="w-6 h-6"
//             />
//           </a>
//           <a href="#">
//             <img
//               src="/path/to/instagram-icon"
//               alt="Instagram"
//               className="w-6 h-6"
//             />
//           </a>
//           <a href="#">
//             <img
//               src="/path/to/facebook-icon"
//               alt="Facebook"
//               className="w-6 h-6"
//             />
//           </a>
//         </div>
//         <p className="text-center text-sm mt-4">
//           Timetable Scheduler © 2024 - All Rights Reserved
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-opacity-50 backdrop-blur-md bg-gradient-to-t from-sky-900 to-sky-600 text-white py-10 mt-12">
      <div className="w-full flex justify-between px-20">
        
        {/* Timetable Scheduler Section */}
        <div className="w-1/3 text-left pr-16">
          <h3 className="text-blue-200 font-bold text-2xl">Timetable Scheduler</h3> {/* Increased font size */}
          <p className="mt-2 text-base">Manage your schedules effortlessly.</p> {/* Increased font size */}

          {/* Social Links */}
          <h3 className="mt-4 font-bold text-2xl">Social Links</h3> {/* Increased font size */}
          <ul className="mt-2 text-base space-y-2"> {/* Increased font size */}
            <li>LinkedIn</li>
            <li>Instagram</li>
            <li>Facebook</li>
          </ul>
        </div>

        {/* Features Section */}
        <div className="text-left">
          <h3 className="mt-4 font-bold text-2xl -ml-24">Features</h3> {/* Increased font size */}
          <ul className="mt-2 text-base space-y-2 -ml-24"> {/* Increased font size */}
            <li>Timetable Management</li>
            <li>Notifications</li>
            <li>Feedback System</li>
            <li>No installation</li>
            <li>Responsive design</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="w-1/4 text-left pl-32">
          <h3 className="font-bold text-2xl">Quick Links</h3> {/* Increased font size */}
          <ul className="mt-2 text-base space-y-2"> {/* Increased font size */}
            <li className="text-gray-200">Home</li>
            <li className="text-gray-200">About</li>
            <li className="text-gray-200">Contact</li>
            <li className="text-gray-200">Features</li>
          </ul>
          {/* Send Email Button */}
          <div className="mt-6">
            <button className="bg-orange-400 text-white font-semibold py-3 px-6 rounded-md text-base"> {/* Increased padding and text size */}
              Send Email
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="mt-8">
        <p className="text-center text-sm"> {/* Kept the text size small for copyright */}
          Timetable Scheduler © 2024 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
