import React, { useState, useEffect } from "react";
import { FaUpload, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videos, setVideos] = useState([]); // State to store video data
  const [filter, setFilter] = useState('All'); // State for filter option

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

  const navigate = useNavigate();

  // Fetch videos from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080//videos")
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  // Function to filter videos based on selected filter
  const getFilteredVideos = () => {
    if (filter === 'All') {
      return videos;
    } else if (filter === 'Videos') {
      return videos.filter(video => video.fileType === 'video');
    } else if (filter === 'Images') {
      return videos.filter(video => video.fileType === 'image');
    }
    return videos;
  };

  const filteredVideos = getFilteredVideos();

  // Calculate statistics based on filtered videos
  const totalFiles = filteredVideos.length;
  const totalFakeFiles = filteredVideos.filter(
    (video) => video.prediction === "Fake"
  ).length;

  const data = {
    labels: ["Total Files", "Fake Files"],
    datasets: [
      {
        label: "Count",
        data: [totalFiles, totalFakeFiles],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: ["rgba(255,99,132,1)", "rgba(255,159,64,1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Statistics: ${filter}`,
      },
    },
  };

  return (
    <div
      className="bg-gradient-to-b from-black via-purple-900 to-black min-h-screen text-white px-10 py-10"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 20, 147, 0.3), transparent 80%)`,
        backdropFilter: "blur(10px)",
      }}
    >
      <header className="flex justify-between items-center">
        <Link to="/home">
          <h1 className="text-3xl font-bold cursor-pointer">SCANX</h1>
        </Link>

        <button
          className="w-fit flex items-center gap-2 py-2.5 px-5 bg-white/10 backdrop-blur-lg hover:bg-[#252525] text-[#f1f3f5] text-[1.1rem] rounded-full"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft /> Return To Homepage
        </button>
      </header>

      <div className="flex ml-11 mt-11">
        <div className="my-10">
          <h2 className="text-5xl font-bold mb-10">DASHBOARD</h2>
          
        </div>

        <div className="flex items-end justify-end gap-11 mb-10 w-[80%] right-0 ml-11">
          {/* Videos Uploaded */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center justify-center w-[40%] h-48">
            <FaUpload className="text-pink-500 text-4xl" />
            <h3 className="text-5xl font-bold text-white">{totalFiles}</h3>
            <p className="text-lg text-gray-300 mt-2">FILES UPLOADED</p>
          </div>

          {/* Deepfakes Identified */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center justify-center w-[40%] h-48">
            <FaSearch className="text-pink-500 text-4xl" />
            <h3 className="text-5xl font-bold text-white">{totalFakeFiles}</h3>
            <p className="text-lg text-gray-300 mt-2">DEEFAKES IDENTIFIED</p>
          </div>
        </div>
      </div>

      {/* History and Chart Section */}
      <div className="flex flex-row justify-between my-10 w-full overflow-y-auto">
        {/* History Section */}
        <div className="w-1/2 pr-10">
          <div className="flex flex-row justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">HISTORY</h2>
            {/* Dropdown Filter */}
            <div>
              <label htmlFor="fileType" className="mr-2 text-lg">Filter by:</label>
              <select
                id="fileType"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white text-black rounded px-2 py-1"
              >
                <option value="All">All</option>
                <option value="Videos">Videos</option>
                <option value="Images">Images</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {filteredVideos.map((video) => (
              <div key={video._id} className="flex items-center bg-white/10 backdrop-blur-lg rounded-3xl p-6 justify-between">
                <div className="ml-4 flex-1">
                  <p className="text-xl font-semibold">{video.fileName}</p>
                  <p className="text-lg text-gray-400">{video.createdAt}</p>
                  <p className="text-lg text-gray-400">Confidence: {video.confidence}%</p>
                  <p className="text-lg text-gray-400">Type: {video.fileType}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`bg-${video.prediction === 'Fake' ? 'red' : 'green'}-500 text-lg font-bold py-1 px-2 rounded-full`}>
                    {video.prediction}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart for video statistics */}
        <div className="w-1/2 pl-10">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
