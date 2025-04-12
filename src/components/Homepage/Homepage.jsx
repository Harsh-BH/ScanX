import React, { Suspense, useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { FaArrowRight } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import Scene from "./Scene";
import "./Scene.scss";
import RCP from "../../models/RCP";
import { Canvas } from "@react-three/fiber";
import NECC from "../../models/NECC";
import Loaderv2 from "../../components/Loaderv2/Loaderv2";
import UserProfileCard from "./UserProfileCard";

function Home() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsContentVisible(true);
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <Loaderv2 />;
  }

  return (
    <>
      <div
        ref={containerRef}
        // Added scroll snap classes for horizontal snap scrolling
        className={`flex flex-row h-[100vh] overflow-y-hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory transition-opacity duration-1000 ${
          isContentVisible ? "opacity-100" : "opacity-0"
        }`}
        onMouseMove={handleMouseMove}
        style={{
          scrollBehavior: "smooth",
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 20, 147, 0.3), transparent 80%)`,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* First Section with scroll snap */}
        <div className="snap-start text-white h-screen flex flex-col flex-shrink-0 w-screen scrollbar-hide">
          <div className="h-screen w-screen px-11 py-11">
            <div className="flex flex-col items-start space-y-4 mt-0 scrollbar-hide">
              <h1
                className="font-extrabold relative xl:text-[7vw] lg:text-[8vw] md:text-[40px]"
                style={{ lineHeight: 1 }}
              >
                Hello <br />
                <span>Welcome to </span> <br />
                <span className="text-[#3b231f] text-glow flicker-hover">
                  ScanX
                </span>
              </h1>
            </div>

            <div className="left-[28vw] top-[64vh] absolute">
              <Scene />
            </div>

            {/* Rightmost Top Login Form */}
            <UserProfileCard />

            <div className="absolute bottom-11 right-0 pr-8 w-[15vw] flex flex-col items-center">
              <div className="mb-4">
                <svg
                  className="w-10 h-10 animate-bounce text-white"
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
              <p className="text-[1vw] max-w-xs mb-6 text-center">
                FIRST PLATFORM TO SOLVE ALL YOUR DEEPFAKE DETECTION NEEDS.
              </p>
            </div>
          </div>
        </div>

        {/* Second Section with scroll snap */}
        <div className="snap-start text-white h-screen flex flex-col items-start justify-end w-screen flex-shrink-0">
          <div className="text-white h-screen flex flex-row justify-center flex-shrink-0 w-screen ">
            <div className="flex justify-center h-full blur-main ">
              <div className="flex justify-center w-[1400px] h-[1400px] absolute left-[14vw] bg-gradient-to-b from-red-500 via-pink-500 to-purple-700 rounded-full shadow-2xl shadow-pink-800"></div>
            </div>
            <div className="absolute top-[2vh] left-[2vw] 2xl:text-[90px] text-[80px] font-extrabold bg-gradient-to-b from-purple-400 via-pink-500 to-red-300 bg-clip-text text-transparent">
              UNMASK THE TRUTH
            </div>
            <div className="absolute top-[20vh] text-[50px] 2xl:text-[60px] font-extrabold">
              DETECTING AUTHENTCITY IN EVERY FRAME 
            </div>

            <div className="absolute top-[40vh] 2xl:text-[35px] font-extrabold left-[2vw] w-[30vw] text-left text-gray-400">
              SPOT THE DIFFERENCE: PRECISION TOOLS FOR AUTHENTICATING VIDEOS AND IMAGES IN A WORLD OF DECEPTION.  
            </div>

            <div className="absolute top-[77vh] flex gap-28 w-[40vw] left-[30vw] ">
              <button
                className="flex font-semibold text-[1.8vw] justify-center w-1/2 items-center gap-2 text-xl rounded-lg bg-gradient-to-r to-purple-600 from-pink-600 via-purple-700 px-4 py-4 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-pink-400/20 transition"
                onClick={() => {
                  window.location.href = "/upload-video";
                }}
              >
                <div className="flex items-center gap-2">TRY NOW</div>
              </button>
            </div>
          </div>
        </div>

        {/* Third Section with scroll snap */}
        <div className="snap-start text-white h-screen flex flex-col items-start justify-end w-screen flex-shrink-0">
          <div className="text-white h-screen flex flex-row justify-center flex-shrink-0 w-screen ">
            <div className="flex justify-center h-full blur-main "></div>
            <div className="absolute top-[2vh] right-[2vw] 2xl:text-[90px] text-[80px] font-extrabold bg-gradient-to-b from-purple-400 via-pink-500 to-red-300 bg-clip-text text-transparent">
              TRUTH IN TEXT
            </div>
            <div className="absolute top-[20vh] text-[50px] 2xl:text-[60px] font-extrabold">
              IDENTIFYING THE ORGIN OF EVERY WRITTEN WORD
            </div>

            <div className="absolute top-[40vh] 2xl:text-[35px] font-extrabold right-[2vw] w-[30vw] text-left text-gray-400">
              WORDS WITH INTEGRITY: YOUR TRUSTED RESOURCE FOR DETECTING AI-GENERATED TEXT VS. GENUINE STUDENT WRITING.
            </div>

            <div className="absolute top-[77vh] flex gap-28 w-[40vw] right-[12vw] ">
              <button
                className="flex font-semibold text-[1.8vw] justify-center w-1/2 items-center gap-2 text-xl rounded-lg bg-gradient-to-r to-purple-600 from-pink-600 via-purple-700 px-4 py-4 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-pink-400/20 transition"
                onClick={() => {
                  window.location.href = "/upload-video";
                }}
              >
                <div className="flex items-center gap-2">TRY NOW</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;