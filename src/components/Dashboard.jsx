import React from "react";
import { FaUpload, FaSearch } from "react-icons/fa"; // Import icons from react-icons

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-b from-black via-purple-900 to-black min-h-screen text-white px-10 py-10">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">SCANX</h1>
        <nav className="flex gap-6 text-lg font-semibold">
          <a href="#dashboard" className="hover:text-pink-600">
            DASHBOARD
          </a>
          <a href="#upload" className="hover:text-pink-600">
            UPLOAD FILES
          </a>
          <a href="#subscription" className="hover:text-pink-600">
            SUBSCRIPTION
          </a>
          <div className="rounded-full bg-gray-500 w-8 h-8"></div>
        </nav>
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
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 flex flex-col  items-center justify-center w-[40%] h-48">
            <FaUpload className="  text-pink-500 text-4xl" />
            <h3 className="text-5xl font-bold text-white">20</h3>
            <p className="text-lg text-gray-300 mt-2">VIDEOS UPLOADED</p>
          </div>

          {/* Deefakes Identified */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 flex flex-col items-center justify-center w-[40%] h-48">
            <FaSearch className="text-pink-500 text-4xl" />
            <h3 className="text-5xl font-bold text-white">7</h3>
            <p className="text-lg text-gray-300 mt-2">DEEFAKES IDENTIFIED</p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">HISTORY</h2>
        <div className="flex flex-col gap-4">
          {/* Video 1 */}
          <div className="flex items-center bg-gray-800 rounded-lg p-4">
            <img
              src="/path/to/image1.jpg"
              alt="Video 1"
              className="w-16 h-16 rounded"
            />
            <div className="ml-4 flex-1">
              <p className="text-lg font-semibold">video_1.mp4</p>
              <p className="text-sm">8:00pm, 25/08/2024</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-red-500 text-xs font-bold py-1 px-2 rounded-full">
                Deepfake
              </span>
              <p className="text-lg font-semibold">94.8%</p>
              <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                ⟳
              </button>
              <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                📄
              </button>
            </div>
          </div>

          {/* Video 2 */}
          <div className="flex items-center bg-gray-800 rounded-lg p-4">
            <img
              src="/path/to/image2.jpg"
              alt="Video 2"
              className="w-16 h-16 rounded"
            />
            <div className="ml-4 flex-1">
              <p className="text-lg font-semibold">whatsapp....mp4</p>
              <p className="text-sm">11:05pm, 25/08/2024</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-500 text-xs font-bold py-1 px-2 rounded-full">
                Real
              </span>
              <p className="text-lg font-semibold">92.1%</p>
              <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                ⟳
              </button>
              <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                📄
              </button>
            </div>
          </div>

          {/* Video 3 */}
          <div className="flex items-center bg-gray-800 rounded-lg p-4">
            <img
              src="/path/to/image3.jpg"
              alt="Video 3"
              className="w-16 h-16 rounded"
            />
            <div className="ml-4 flex-1">
              <p className="text-lg font-semibold">video_34....mp4</p>
              <p className="text-sm">12:56am, 26/08/2024</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-red-500 text-xs font-bold py-1 px-2 rounded-full">
                Deepfake
              </span>
              <p className="text-lg font-semibold">89.7%</p>
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
      <div className="mt-10 bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">
          DETECT DEEPFAKES WITH HIGH ACCURACY. UPLOAD YOUR VIDEO NOW.
        </p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg">
          UPLOAD FILE
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
