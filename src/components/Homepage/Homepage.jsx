import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { FaArrowRight } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";

function Home() {
  const containerRef = useRef(null);
  const [scrollTimeout, setScrollTimeout] = useState(null); // Used to detect when scrolling stops
  const sections = 3; // Number of sections

  // Handle the wheel event to scroll horizontally and snap to sections
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = (e) => {
      e.preventDefault();

      const sectionWidth = container.offsetWidth;
      const currentScroll = container.scrollLeft;
      const newScrollLeft = currentScroll + e.deltaY;

      container.scrollLeft = newScrollLeft; // Move horizontally as the user scrolls

      // Clear previous timeout if it exists
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a timeout to detect when scrolling stops
      const newTimeout = setTimeout(() => {
        const currentIndex = Math.round(container.scrollLeft / sectionWidth);
        const targetScroll = currentIndex * sectionWidth;

        // Snap to the closest section, making it snappier
        container.scrollTo({
          left: targetScroll,
          behavior: "smooth", // Snappier scroll (you can also use 'smooth' if you want it less instant)
        });
      }, 30); // Faster snapping (lower timeout)

      setScrollTimeout(newTimeout);
    };

    // Attach the event listener
    if (container) {
      container.addEventListener('wheel', handleScroll);
    }

    // Clean up the event listener on unmount
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, [scrollTimeout]);

  return (
    <>

      <Navbar/>

    <div
      ref={containerRef}
      className="flex flex-row h-[100vh] overflow-y-hidden overflow-x-auto scrollbar-hide"
    >
      
      
      {/* First Section */}
      <div className="text-white h-screen flex flex-row justify-center flex-shrink-0 w-screen bg-black">
      
        <div className="flex justify-center h-full blur-main ">
        <div className="flex justify-center w-[1400px] h-[1400px] absolute top-[-1100px] bg-gradient-to-b from-red-500 via-pink-500 to-purple-700 rounded-full shadow-2xl shadow-pink-800"></div>
        </div>
        <div className="absolute top-[30vh] 2xl:text-[90px] text-[80px] font-extrabold bg-gradient-to-b from-purple-400 via-pink-500 to-red-300 bg-clip-text text-transparent">
          UNVEIL THE REAL
        </div>
        <div className="absolute top-[45vh] text-[50px] 2xl:text-[60px] font-extrabold">
          DETECTING DEEPFAKES WITH PRECISION
        </div>

        <div className="absolute top-[60vh] 2xl:text-[15px] text-[13px] font-extrabold px-36 w-[60vw] text-center text-gray-400">
        LEVERAGING THE POWER OF BLOCKCHAIN AND MACHINE LEARNING FOR DETECTION OF DEEP FAKE VIDEOS OVER THE INTERNET!
        </div>

        <div className="absolute top-[75vh] flex gap-28 w-[40vw]">
          <button className="flex font-semibold text-[1.8vw] justify-center w-1/2 items-center gap-2 text-xl rounded-lg bg-gradient-to-r to-purple-600 from-pink-600 via-purple-700 px-4 py-4 hover:scale-110 hover:translate-y-[-10px] hover:shadow-lg hover:shadow-pink-400/20 transition">TRY NOW
          <FaArrowRight />
          </button>
          <button className="border-2 border-white px-4 py-4 text-[1.8vw] w-1/2 text-xl rounded-lg transition font-semibold hover:scale-110 hover:translate-y-[-10px]">HOW IT WORKS</button>
        </div>

      </div>

      {/* Second Section */}
      <div className="text-white bg-black h-screen flex justify-center items-center w-screen flex-shrink-0">
      
      <div className="flex justify-center items-center h-full blur-main ">
        <div className="flex justify-center w-[450px] h-[450px] absolute bg-radial-gradient rounded-full shadow-2xl "></div>
      </div>
      <div className="absolute top-[20vh] 2xl:text-[80px] text-[70px] font-extrabold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          FEATURES
      </div>
      <div className="flex gap-32 w-[70vw] absolute top-[38vh] h-[57vh]">

        <div className="w-1/2 h-full flex flex-col p-4 justify-evenly items-center bg-white bg-opacity-20 rounded-2xl backdrop-blur-lg">
        <div className="w-[100px] h-[100px] bg-white rounded-full text-black flex justify-center items-center">img</div>
         
        <div className="text-center font-bold 2xl:text-[20px] text-[18px]">BEGIN YOUR SEAMLESS EXPERIENCE NOW WITH OUR PRECISE TOOL FOR DETECTING DEEPFAKE PHOTOS AND VIDEOS EASILY.</div>

        <button className="flex font-semibold text-[1.8vw] justify-center items-center text-xl rounded-3xl bg-gradient-to-r to-purple-800 from-pink-600 via-purple-700 px-4 py-4 hover:scale-110 hover:translate-y-[-10px] hover:shadow-lg hover:shadow-pink-400/20 transition">LEARN MORE</button>
        </div>

        <div className="w-1/2 h-full flex flex-col p-4 justify-evenly items-center bg-white bg-opacity-20 rounded-2xl backdrop-blur-lg">
        <div className="w-[200px] h-[50px] border-2 border-cyan-500 rounded-full font-semibold text-cyan-500 flex justify-center items-center gap-2">Generate
        <RiAiGenerate />
        </div>
         
        <div className="text-center font-bold 2xl:text-[20px] text-[18px]">BEGIN YOUR SEAMLESS EXPERIENCE NOW WITH OUR PRECISE TOOL FOR DETECTING DEEPFAKE PHOTOS AND VIDEOS EASILY.</div>

        <button className="flex font-semibold text-[1.8vw] justify-center items-center text-xl rounded-3xl bg-gradient-to-r to-purple-800 from-pink-600 via-purple-700 px-4 py-4 hover:scale-110 hover:translate-y-[-10px] hover:shadow-lg hover:shadow-pink-400/20 transition">LEARN MORE</button>
        </div>
      </div>
      </div>

      {/* Third Section */}
      <div className="text-white bg-green-500 h-screen flex justify-center items-center w-screen flex-shrink-0">
        <h1>Third Section</h1>
      </div>
    </div>
    </>
  );
}

export default Home;

