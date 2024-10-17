import { ArrowLeft, Loader } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "./contractDeets.jsx";
import { PrismaClient } from '@prisma/client';
import { ethers } from "ethers";

const prisma = new PrismaClient();


function VideoUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [framesPerVideo, setFramesPerVideo] = useState(50); // Default value
  const [result, setResult] = useState(null);
  const [tier, setTier] = useState("tier1");
  const [LoaderActive, setLoaderActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Track mouse position
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip visibility state
  const containerRef = useRef(null);
  const isScrolling = useRef(false);


  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Request wallet connection
        const signer = provider.getSigner();
        const address = await signer.getAddress(); // Get user's public address
        return address;
      } catch (error) {
        console.error("Error connecting MetaMask:", error);
        alert("Failed to connect MetaMask.");
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask.");
    }
    return null;
  };

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile.type;

    // Only accept video or image files
    if (fileType.startsWith("video/") || fileType.startsWith("image/")) {
      setFile(selectedFile);
      setShowTooltip(false); // Hide tooltip when a valid file is selected
    } else {
      alert("Please upload a valid video or image file.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      // Show the tooltip if no file is uploaded
      setShowTooltip(true);
  
      setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
      return;
    }
  
    try {
      // Connect to MetaMask and get the user's public address
      const publicAddress = await connectMetaMask();
      if (!publicAddress) {
        alert("MetaMask connection is required to upload a file.");
        return;
      }
  
      // Prepare form data with the file and MetaMask address
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", publicAddress);  // MetaMask public address
  
      setLoaderActive(true); // Show loader while uploading
  
      // Make the POST request to your Flask API at the /predict endpoint
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData, // Send formData which includes the media file and MetaMask address
      });
  
      if (!response.ok) {
        throw new Error("File upload failed");
      }
  
      // Parse the JSON response from the backend
      const data = await response.json();
      setResult(data); // Store the result data for rendering
  
      console.log("MetaMask Address:", publicAddress);
      console.log("Backend Response:", data);
      console.log("Uploaded File:", file);
  
      // Navigate to the results page or handle the result as needed
      navigate("/result", { state: { result: data, fileName: file.name } });
    } catch (error) {
      console.error("Error during upload:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setLoaderActive(false); // Hide loader when done
    }
  };
  

  // Handle horizontal scrolling
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;

      const sectionWidth = container.offsetWidth;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - sectionWidth;
      const scrollThreshold = sectionWidth;

      if (e.deltaY > 0) {
        if (currentScroll < maxScroll) {
          const nextScrollPosition =
            Math.ceil(currentScroll / sectionWidth) + 1;
          const nextScrollLeft = nextScrollPosition * sectionWidth;

          if (nextScrollLeft - currentScroll >= scrollThreshold) {
            isScrolling.current = true;
            container.scrollTo({
              left: nextScrollLeft,
              behavior: "smooth",
            });
            setTimeout(() => {
              isScrolling.current = false;
            }, 1000);
          }
        }
      } else {
        if (currentScroll > 0) {
          const prevScrollPosition =
            Math.floor(currentScroll / sectionWidth) - 1;
          const prevScrollLeft = prevScrollPosition * sectionWidth;

          if (currentScroll - prevScrollLeft >= scrollThreshold) {
            isScrolling.current = true;
            container.scrollTo({
              left: prevScrollLeft,
              behavior: "smooth",
            });
            setTimeout(() => {
              isScrolling.current = false;
            }, 500);
          }
        }
      }
    };

    if (container) {
      container.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-row h-screen overflow-y-hidden overflow-x-auto scrollbar-hide"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 20, 147, 0.3), transparent 80%)`,
        backdropFilter: "blur(10px)", // Adds a blur effect for a glowing trail
      }}
    >
      {/* Loader Mask */}
      {LoaderActive && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60">
          <Loader size={64} className="animate-spin text-white" />
          <div className="text-white text-2xl font-semibold ml-4">
            Uploading Video...
          </div>
        </div>
      )}

      {/* First Viewport */}
      <div className="flex flex-col justify-center items-center h-screen w-screen flex-shrink-0">
        {/* Background Circle */}
        <div className="flex justify-center w-[1400px] h-[1400px] absolute left-[-1100px] bg-gradient-to-b from-red-500 via-pink-500 to-purple-700 rounded-full shadow-2xl shadow-pink-800"></div>
        <div
  className={`w-[80%] ml-11 flex justify-evenly ${
    LoaderActive ? "opacity-50" : ""
  }`}
>
  {/* Tiers Section */}
  <div className="tiers flex flex-col gap-4">
    <button
      className="w-fit flex items-center gap-2 py-2.5 px-5 bg-white/10 backdrop-blur-lg hover:bg-[#252525] text-[#f1f3f5] text-[1.1rem] rounded-full"
      onClick={() => navigate("/home")}
    >
      <ArrowLeft /> Return To Homepage
    </button>
    <div className="text-5xl font-semibold">Upload Video</div>
    <div className="text-2xl font-medium">Select A Tier</div>
    {/* Tier selection */}
    <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-lg border border-[#ffffff10] flex justify-center items-center gap-4">
      <input
        type="radio"
        id="tier1"
        name="tier"
        value="tier1"
        defaultChecked
        className="h-5 w-5"
        onClick={() => setFramesPerVideo(50)}
      />
      <label htmlFor="tier1">
        <div className="text-2xl font-semibold">Basic</div>
        <div>Analyze 50 frames for a 30fps video</div>
      </label>
    </div>
    <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-lg border border-[#ffffff10] flex justify-center items-center gap-4">
      <input
        type="radio"
        id="tier2"
        name="tier"
        value="tier2"
        className="h-5 w-5"
        onClick={() => setFramesPerVideo(100)}
      />
      <label htmlFor="tier2">
        <div className="text-2xl font-semibold">Standard</div>
        <div>Analyze 100 frames for a 30fps video</div>
      </label>
    </div>
    <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-lg border border-[#ffffff10] flex justify-center items-center gap-4">
      <input
        type="radio"
        id="tier3"
        name="tier"
        value="tier3"
        className="h-5 w-5"
        onClick={() => setFramesPerVideo(300)}
      />
      <label htmlFor="tier3">
        <div className="text-2xl font-semibold">Premium</div>
        <div>Analyze 300+ frames for a 30fps video</div>
      </label>
    </div>
  </div>

  {/* Video Upload Section */}
  <div className="flex flex-col justify-center items-center gap-4 relative">
    {!file ? (
      <div className="">
        <label className="flex h-56 w-116 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-600 p-6">
          <div className="space-y-1 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-gray-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>
            <div className="text-white">
              <a
                href="#"
                className="font-medium text-primary-500 hover:text-primary-700"
              >
                Click to upload
              </a>{" "}
              or drag and drop
            </div>
            <p className="text-sm text-gray-400">
              mp4, mov, webm, avi, wmv, png, jpg, jpeg (max 100MB)
            </p>
          </div>
          <input
            type="file"
            className="sr-only"
            accept="video/*,image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
    ) : (
      <div>
        {file.type.startsWith("video/") ? (
          <video width="400" controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support HTML video.
          </video>
        ) : (
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded media"
            width="400"
          />
        )}
      </div>
    )}
    <div className="flex gap-4 justify-center items-center">
      <div>
        No. of Frames to be analyzed: <b>{framesPerVideo}</b>
      </div>
      {file && (
        <button
          onClick={() => setFile(null)}
          className="py-1.5 px-3 bg-[#1e1e1e] hover:bg-[#252525] text-red-600 font-semibold rounded-full"
        >
          Remove Video
        </button>
      )}
    </div>

    <div className="relative">
      <button
        onClick={handleUpload}
        className="py-2.5 px-5 bg-[#f1f3f5] hover:bg-[#ddd] text-[1.185rem] text-gray-900 font-semibold rounded-full"
      >
        Upload
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 bg-red-500 text-white text-lg p-3 rounded-xl shadow-lg transition-opacity duration-300 ease-in-out  w-48 text-center">
          Please upload a video file.
        </div>
      )}
    </div>
  </div>

  {/* Rightmost arrow */}
  <div className="absolute right-0 bottom-1/2 transform translate-x-full translate-y-1/2 rotate-90">
    <svg
      className="w-24 h-24 animate-bounce text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>
</div>


      {/* Second Viewport (Duplicate of First) */}
      <div className="flex flex-col justify-center items-center h-screen w-screen flex-shrink-0">
        {/* Background Circle */}
        <div className="flex justify-center w-[1400px] h-[1400px] absolute right-[-1050px] bg-gradient-to-b from-red-500 via-pink-500 to-purple-700 rounded-full shadow-2xl shadow-pink-800"></div>
        <div
          className={`w-screen ml-11 flex justify-evenly ${
            LoaderActive ? "opacity-50" : ""
          }`}
        >
          {/* Tiers Section */}
          <div className="tiers flex flex-col gap-4">
            <button
              className="w-fit flex items-center gap-2 py-2.5 px-5 bg-white/10 backdrop-blur-lg hover:bg-[#252525] text-[#f1f3f5] text-[0.85rem] rounded-full"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft /> Return To Homepage
            </button>
            <div className="text-5xl font-semibold">Upload Video</div>
            <div className="text-2xl font-medium">Select A Tier</div>
            {/* Tier selection */}
            <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-lg border border-[#ffffff10] flex justify-center items-center gap-4">
              <input
                type="radio"
                id="tier1-2"
                name="tier"
                value="tier1"
                defaultChecked
                className="h-5 w-5"
                onClick={() => setFramesPerVideo(50)}
              />
              <label htmlFor="tier1-2">
                <div className="text-2xl font-semibold">Basic</div>
                <div>Analyze 50 frames for a 30fps video</div>
              </label>
            </div>
            <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-lg border border-[#ffffff10] flex justify-center items-center gap-4">
              <input
                type="radio"
                id="tier2-2"
                name="tier"
                value="tier2"
                className="h-5 w-5"
                onClick={() => setFramesPerVideo(100)}
              />
              <label htmlFor="tier2-2">
                <div className="text-2xl font-semibold">Standard</div>
                <div>Analyze 100 frames for a 30fps video</div>
              </label>
            </div>
            <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-lg border border-[#ffffff10] flex justify-center items-center gap-4">
              <input
                type="radio"
                id="tier3-2"
                name="tier"
                value="tier3"
                className="h-5 w-5"
                onClick={() => setFramesPerVideo(300)}
              />
              <label htmlFor="tier3-2">
                <div className="text-2xl font-semibold">Premium</div>
                <div>Analyze 300+ frames for a 30fps video</div>
              </label>
            </div>
          </div>

          {/* Video Upload Section */}
          <div className="flex flex-col justify-center items-center gap-4 relative">
            {!file ? (
              <div className="">
                <label className="flex h-56 w-116 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-600 p-6">
                  <div className="space-y-1 text-center">
                    <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-900"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                      </svg>
                    </div>
                    <div className="text-white">
                      <a
                        href="#"
                        className="font-medium text-primary-500 hover:text-primary-700"
                      >
                        Click to upload
                      </a>{" "}
                      or drag and drop
                    </div>
                    <p className="text-sm text-gray-400">
                      mp4, mov, webm, avi, wmv (max 100MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            ) : (
              <div>
                <video width="400" controls>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                  Your browser does not support HTML video.
                </video>
              </div>
            )}
            <div className="flex gap-4 justify-center items-center">
              <div>
                No. of Frames to be analyzed: <b>{framesPerVideo}</b>
              </div>
              {file && (
                <button
                  onClick={() => setFile(null)}
                  className="py-1.5 px-3 bg-[#1e1e1e] hover:bg-[#252525] text-red-600 font-semibold rounded-full"
                >
                  Remove Video
                </button>
              )}
            </div>

            <div className="relative">
              <button
                onClick={handleUpload}
                className="py-2.5 px-5 bg-[#f1f3f5] hover:bg-[#ddd] text-[1.185rem] text-gray-900 font-semibold rounded-full"
              >
                Upload
              </button>

              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 bg-red-500 text-white text-lg p-3 rounded-xl shadow-lg transition-opacity duration-300 ease-in-out  w-48 text-center">
                  Please upload a video file.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
