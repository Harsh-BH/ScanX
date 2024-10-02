import React, { useState, useEffect } from "react";
import { FaUpload, FaSearch } from "react-icons/fa"; // Import icons from react-icons
import { MdOutlineFileUpload } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Dashboard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="bg-gradient-to-b from-black via-purple-900 to-black min-h-screen text-white px-10 py-10"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 20, 147, 0.3), transparent 80%)`,
        backdropFilter: "blur(10px)", // Adds a blur effect for a glowing trail
      }}
    >
      <header className="flex justify-between items-center">
      <Link to="/home">
          <h1 className="text-3xl font-bold cursor-pointer">SCANX</h1>
        </Link>
        
      </header>

      <div className="flex ml-11 mt-11 ">
        {/* Dashboard Title */}
        <div className="my-10">
          <h2 className="text-5xl font-bold mb-10">DASHBOARD</h2>
          <p className="text-2xl text-center">HARSH BHATT</p>
        </div>

        {/* Statistics Cards */}
        <div className="flex items-end justify-end gap-11 mb-10 w-[80%] right-0 ml-11">
          {/* Videos Uploaded */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col  items-center justify-center w-[40%] h-48">
            <FaUpload className="  text-pink-500 text-4xl" />
            <h3 className="text-5xl font-bold text-white">20</h3>
            <p className="text-lg text-gray-300 mt-2">VIDEOS UPLOADED</p>
          </div>

          {/* Deefakes Identified */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center justify-center w-[40%] h-48">
            <FaSearch className="text-pink-500 text-4xl" />
            <h3 className="text-5xl font-bold text-white">7</h3>
            <p className="text-lg text-gray-300 mt-2">DEEFAKES IDENTIFIED</p>
          </div>
        </div>
      </div>

      {/* History and Call to Action in a Single Row */}
      <div className="flex flex-row space-x-24">
        {/* History Section */}
        <div className="my-10 w-2/3">
          <h2 className="text-3xl font-bold mb-4">HISTORY</h2>
          <div className="flex flex-col gap-9">
            {/* Video 1 */}
            <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-3xl p-6 justify-between">
              <img
                src="/path/to/image1.jpg"
                alt="Video 1"
                className="w-16 h-16 rounded-lg"
              />
              <div className="ml-4 flex-1">
                <p className="text-xl font-semibold">video_1.mp4</p>
                <p className="text-lg text-gray-400">8:00pm, 25/08/2024</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-lg font-bold py-1 px-2 rounded-full">
                  Deepfake
                </span>
                <p className="text-2xl font-semibold">94.8%</p>
                <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                  ⟳
                </button>
                <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                  📄
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="my-10 w-1/4 bg-white/10 backdrop-blur-lg rounded-2xl p-11 flex flex-col items-center justify-center -mr-5">
          <p className="text-2xl font-bold mb-4 text-center">
            DETECT DEEPFAKES WITH HIGH ACCURACY. UPLOAD YOUR VIDEO NOW.
          </p>
          <button className="bg-black hover:bg-gray-900 text-white py-2 px-6 rounded-lg flex gap-2">
            <MdOutlineFileUpload className="text-xl " />
            UPLOAD FILE
          </button>
        </div>
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-6">
        <button className="text-pink-500 font-semibold hover:underline">
          VIEW MORE
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
