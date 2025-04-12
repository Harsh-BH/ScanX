import { ArrowLeft, Loader, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import VideoServiceABI from "./VideoServiceABI.json";
import TextUploadComponent from "./components/TextPrediction.jsx";

function VideoUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [framesPerVideo, setFramesPerVideo] = useState(50); // Default value
  const [LoaderActive, setLoaderActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 2;

  const containerRef = useRef(null);
  const contractAddress = "0x421320EC07463437A6E421fE9BBA872C98EDc511";

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Request wallet connection
        const signer = provider.getSigner();
        const address = await signer.getAddress(); // Get user's public address
        return { provider, signer, address };
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

  // Handle scrolling between sections
  const scrollToSection = (index) => {
    if (containerRef.current) {
      const sectionWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: index * sectionWidth,
        behavior: 'smooth'
      });
      setCurrentSection(index);
    }
  };

  // Wheel event handler
  const handleWheel = (e) => {
    // Prevent default to take control of scrolling
    e.preventDefault();
    
    // Add a small threshold to prevent accidental scrolls
    if (Math.abs(e.deltaY) > 30) {
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(totalSections - 1, currentSection + direction));
      
      if (nextSection !== currentSection) {
        scrollToSection(nextSection);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    
    // Set up wheel handler with passive: false to allow preventDefault
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      // Track scroll position to update active section
      const handleScroll = () => {
        if (container) {
          const scrollLeft = container.scrollLeft;
          const width = container.clientWidth;
          const newSection = Math.round(scrollLeft / width);
          
          if (newSection !== currentSection) {
            setCurrentSection(newSection);
          }
        }
      };
      
      container.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('scroll', handleScroll);
      };
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentSection]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile.type;

    // Only accept video or image files
    if (fileType.startsWith("video/") || fileType.startsWith("image/")) {
      setFile(selectedFile);
      setIsVideo(fileType.startsWith("video/")); // Set isVideo based on MIME type
      setShowTooltip(false); // Hide tooltip when a valid file is selected
    } else {
      alert("Please upload a valid video or image file.");
    }
  };

  // Handle file upload
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
      setLoaderActive(true); // Show loader while uploading

      // Connect to MetaMask and get the user's public address
      const metaMaskData = await connectMetaMask();
      if (!metaMaskData) {
        setLoaderActive(false);
        return;
      }

      const { provider, signer, address } = metaMaskData;

      // Determine the tier number
      let tierNumber;
      if (framesPerVideo === 50) tierNumber = 1;
      else if (framesPerVideo === 100) tierNumber = 2;
      else if (framesPerVideo === 300) tierNumber = 3;
      else tierNumber = 1; // Default to tier 1

      // Prepare form data with the file and MetaMask address
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", address); // MetaMask public address
      formData.append("frames_per_video", framesPerVideo);

      // Make the POST request to your Flask API at the /predict endpoint
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData, // Send formData which includes the media file and MetaMask address
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "File upload failed");
      }

      // Parse the JSON response from the backend
      const data = await response.json();

      console.log("Backend Response:", data);

      const { fileHash, prediction, confidence, total_faces_analyzed, processing_time, db_id } = data;

      // Initialize the smart contract
      const videoServiceContract = new ethers.Contract(contractAddress, VideoServiceABI, signer);

      // Get the price for the selected tier
      const price = await videoServiceContract.getTierPrice(tierNumber);

      // Call the smart contract function to store video details and process payment
      const tx = await videoServiceContract.purchaseService(
        fileHash,            // IPFS hash of the video file
        prediction,          // Result from your backend analysis
        tierNumber,          // Tier selected by the user
        { value: price }     // Payment for the selected tier
      );

      // Wait for the transaction to be mined
      await tx.wait();

      console.log("Transaction successful:", tx);

      try {
        // Assuming tier is a valid uint8 value
        let tierPrice = await videoServiceContract.getTierPrice(tierNumber);
        console.log("Tier Price:", tierPrice.toString());
      } catch (error) {
        console.error("Error during contract call:", error);
      }

      // Navigate to result page with analysis results
      navigate("/result", { state: { result: data, fileName: file.name } });

    } catch (error) {
      console.error("Error during upload:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setLoaderActive(false); // Hide loader when done
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative flex flex-row h-screen overflow-y-hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        onMouseMove={handleMouseMove}
        style={{
          scrollBehavior: "smooth",
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 20, 147, 0.3), transparent 80%)`,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Loader Mask */}
        {LoaderActive && (
          <div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60">
            <Loader size={64} className="animate-spin text-white" />
            <div className="text-white text-2xl font-semibold ml-4">
              {isVideo ? "Uploading Video..." : "Uploading Image..."}
            </div>
          </div>
        )}

        {/* First Viewport */}
        <div className="snap-start flex flex-col justify-center items-center h-screen w-screen flex-shrink-0">
          {/* Background Circle */}
          <div className="flex justify-center w-[1400px] h-[1400px] absolute left-[-1100px] bg-gradient-to-b from-red-500 via-pink-500 to-purple-700 rounded-full shadow-2xl shadow-pink-800"></div>
          <div
            className={`w-[80%] ml-11 flex justify-evenly ${LoaderActive ? "opacity-50" : ""
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
              <div className="text-5xl font-semibold">Upload Video/Image</div>
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
                  <div>Analyze 50 frames for a 30fps Video / Image</div>
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
                  <div>Analyze 100 frames for a 30fps Video / Image</div>
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
                  <div>Analyze 300+ frames for a 30fps Video / Image</div>
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
                    onClick={() => {
                      setFile(null);
                      setIsVideo(false); // Reset isVideo
                    }}
                    className="py-1.5 px-3 bg-[#1e1e1e] hover:bg-[#252525] text-red-600 font-semibold rounded-full"
                  >
                    Remove
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

        {/* Second Viewport */}
        <div className="snap-start flex flex-col justify-center items-center h-screen w-screen flex-shrink-0">
          {/* Background Circle */}
          <div className="flex justify-center w-[1400px] h-[1400px] absolute right-[-1050px] bg-gradient-to-b from-red-500 via-pink-500 to-purple-700 rounded-full shadow-2xl shadow-pink-800"></div>
          <TextUploadComponent/>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSection === index 
                ? "bg-pink-500 w-6" 
                : "bg-white opacity-70 hover:opacity-100"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Left/Right arrows for navigation */}
      {currentSection > 0 && (
        <button 
          onClick={() => scrollToSection(currentSection - 1)}
          className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md p-2 rounded-full z-50 hover:bg-white/20"
          aria-label="Previous section"
        >
          <ChevronLeft size={30} className="text-white" />
        </button>
      )}
      
      {currentSection < totalSections - 1 && (
        <button 
          onClick={() => scrollToSection(currentSection + 1)}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md p-2 rounded-full z-50 hover:bg-white/20"
          aria-label="Next section"
        >
          <ChevronRight size={30} className="text-white" />
        </button>
      )}
    </>
  );
}

export default VideoUpload;