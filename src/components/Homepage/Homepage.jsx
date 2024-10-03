import React, { Suspense,useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { FaArrowRight } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import Scene from "./Scene";
import "./Scene.scss"
import RCP from "../../models/RCP";
import { Canvas } from '@react-three/fiber';
import NECC from "../../models/NECC";



function Home() {
  
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Track mouse position



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
          const nextScrollPosition = Math.ceil(currentScroll / sectionWidth) + 1;
          const nextScrollLeft = nextScrollPosition * sectionWidth;
  
          if (nextScrollLeft - currentScroll >= scrollThreshold) {
            isScrolling.current = true;
            container.scrollTo({
              left: nextScrollLeft,
              behavior: 'smooth',
            });
            setTimeout(() => {
              isScrolling.current = false;
            }, 1000);
          }
        }
      } else {
        if (currentScroll > 0) {
          const prevScrollPosition = Math.floor(currentScroll / sectionWidth) - 1;
          const prevScrollLeft = prevScrollPosition * sectionWidth;
  
          if (currentScroll - prevScrollLeft >= scrollThreshold) {
            isScrolling.current = true;
            container.scrollTo({
              left: prevScrollLeft,
              behavior: 'smooth',
            });
            setTimeout(() => {
              isScrolling.current = false;
            }, 500);
          }
        }
      }
    };
  
    if (container) {
      container.addEventListener('wheel', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, []); // Removed scrollTimeout dependency
  

  // Track mouse position
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>


    <div
      ref={containerRef}
      className="flex flex-row h-[100vh] overflow-y-hidden overflow-x-auto scrollbar-hide"
      onMouseMove={handleMouseMove} // Add mouse move event
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 20, 147, 0.3), transparent 80%)`,
        backdropFilter: 'blur(10px)', // Adds a blur effect for a glowing trail
      }}
    >
      
     {/* First Section */}
     <div className="text-white h-screen flex flex-col  flex-shrink-0 w-screen scrollbar-hide">
        <div className="h-screen w-screen px-11 py-11">
          <div className="flex flex-col items-start space-y-4 mt-0 scrollbar-hide">
            <h1 className="font-extrabold relative xl:text-[7vw] lg:text-[8vw] md:text-[40px]" style={{ lineHeight: 1 }}>
              Hello <br />
              <span>Welcome to </span> <br />
              <span className="text-[#3b231f] text-glow flicker-hover">ScanX</span>
            </h1>
          </div>

          <div className="left-[28vw] top-[64vh] absolute">
            <Scene />
          </div>

          {/* Rightmost Top Login Form */}
          <div className="absolute top-0 right-0 mt-6 mr-6 bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg w-full max-w-md text-center">
            <div className="text-lg font-semibold text-[#787878]">Log In</div>
            <div className="text-3xl font-semibold">Welcome Back!</div>
            <div className="space-y-4 mt-4">
              <button className="w-full flex items-center justify-center bg-white text-black font-semibold py-2 rounded-full shadow hover:bg-gray-200 transition">
                Sign Up with Google
              </button>
            </div>
          </div>

          <div className="absolute bottom-11 right-0 pr-8 w-[15vw] flex flex-col items-center">
            <div className="mb-4">
              <svg className="w-10 h-10 animate-bounce text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <p className="text-[1vw] max-w-xs mb-6 text-center">
              FIRST PLATFORM TO SOLVE ALL YOUR DEEPFAKE DETECTION NEEDS.
            </p>
          </div>
        </div>
      </div>


      {/* Additional sections */}
      <div className="text-white h-screen flex flex-col items-start justify-end w-screen flex-shrink-0">

      
     
      <div className="text-white h-screen flex flex-row justify-center flex-shrink-0 w-screen ">
      
        <div className="flex justify-center h-full blur-main ">
        <div className="flex justify-center w-[1400px] h-[1400px] absolute left-[14vw] bg-gradient-to-b from-red-500 via-pink-500 to-purple-700 rounded-full shadow-2xl shadow-pink-800"></div>
        </div>
        <div className="absolute top-[2vh] left-[2vw] 2xl:text-[90px] text-[80px] font-extrabold bg-gradient-to-b from-purple-400 via-pink-500 to-red-300 bg-clip-text text-transparent">
          UNVEIL THE REAL
        </div>
        <div className="absolute top-[17vh] text-[50px] 2xl:text-[60px] font-extrabold">
          DETECTING DEEPFAKES WITH PRECISION
        </div>

        <div className="absolute top-[40vh] 2xl:text-[30px] font-extrabold left-[2vw] w-[30vw] text-left text-gray-400">
        LEVERAGING THE POWER OF BLOCKCHAIN AND MACHINE LEARNING FOR DETECTION OF DEEP FAKE VIDEOS OVER THE INTERNET!
        </div>

        <div className="absolute top-[77vh] flex  gap-28 w-[40vw] left-[12vw] ">
          <button className="flex font-semibold text-[1.8vw] justify-center w-1/2 items-center gap-2 text-xl rounded-lg bg-gradient-to-r to-purple-600 from-pink-600 via-purple-700 px-4 py-4 hover:scale-110 hover:translate-y-[-10px] hover:shadow-lg hover:shadow-pink-400/20 transition" onClick={()=>{
            window.location.href = '/login'
          }}>
            <div className='flex items-center gap-2'>TRY NOW </div>
          </button>
          <button className="border-2 border-white px-4 py-4 text-[1.8vw] w-1/2 text-xl rounded-lg transition font-semibold hover:scale-110 hover:translate-y-[-10px]">HOW IT WORKS</button>
        </div>

      </div>

   

      </div>

      <div className="text-white h-screen flex flex-col items-start justify-end w-screen flex-shrink-0">

      
     
      <div className="text-white h-screen flex flex-row justify-center flex-shrink-0 w-screen ">
      
        <div className="flex justify-center h-full blur-main ">
      
        </div>
        <div className="absolute top-[2vh] right-[2vw] 2xl:text-[90px] text-[80px] font-extrabold bg-gradient-to-b from-purple-400 via-pink-500 to-red-300 bg-clip-text text-transparent">
          UNVEIL THE REAL
        </div>
        <div className="absolute top-[17vh] text-[50px] 2xl:text-[60px] font-extrabold">
          DETECTING DEEPFAKES WITH PRECISION
        </div>

        <div className="absolute top-[40vh] 2xl:text-[30px] font-extrabold right-[2vw] w-[30vw] text-left text-gray-400">
        LEVERAGING THE POWER OF BLOCKCHAIN AND MACHINE LEARNING FOR DETECTION OF DEEP FAKE VIDEOS OVER THE INTERNET!
        </div>

        <div className="absolute top-[77vh] flex  gap-28 w-[40vw] right-[12vw] ">
          <button className="flex font-semibold text-[1.8vw] justify-center w-1/2 items-center gap-2 text-xl rounded-lg bg-gradient-to-r to-purple-600 from-pink-600 via-purple-700 px-4 py-4 hover:scale-110 hover:translate-y-[-10px] hover:shadow-lg hover:shadow-pink-400/20 transition" onClick={()=>{
            window.location.href = '/login'
          }}>
            <div className='flex items-center gap-2'>TRY NOW </div>
          </button>
          <button className="border-2 border-white px-4 py-4 text-[1.8vw] w-1/2 text-xl rounded-lg transition font-semibold hover:scale-110 hover:translate-y-[-10px]">HOW IT WORKS</button>
        </div>

      </div>

   

      </div>
    </div>
    </>
  );
}

export default Home;
