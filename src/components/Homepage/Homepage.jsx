import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { FaArrowRight } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";


function Home() {
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Track mouse position

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      if (userDetails) setUser(userDetails);
    };
    fetchUserDetails();
  }, []);

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
  }, [scrollTimeout]);

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

      <Navbar/>

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
     <div className="text-white h-screen flex flex-col justify-start items-start flex-shrink-0 w-screen scrollbar-hide">
        <div className="h-screen w-screen px-11 py-11">
          <div className="flex flex-col items-start space-y-4 mt-0 scrollbar-hide">
            <h1 className="font-extrabold relative xl:text-[7vw] lg:text-[8vw] md:text-[40px]" style={{ lineHeight: 1 }}>
              Hello {user?.username}, <br />
              <span>Welcome to </span> <br />
              <span className="text-[#3b231f] text-glow flicker-hover">ScanX</span>
            </h1>
          </div>

          <div className="left-[28vw] top-[67vh] absolute">
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
      <div className="text-white h-screen flex items-start justify-end w-screen flex-shrink-0">
        <div className="container px-4 justify-end text-center w-full">
          <div className="space-y-4 w-[90%]">
            <h1 className="font-bold" style={{ fontSize: "4rem", lineHeight: "1.2" }}>
              The science is settled. We are in an emergency of climate and
              nature. The world is past breaking point; the breakdown has
              begun...
            </h1>
            <div className="space-y-2">
              <details className="group">
                <summary className="text-white py-2 px-4 cursor-pointer flex justify-between items-center">
                  <span>------------------------------------------</span>
                  <br />
                  <span>The Role of Design</span>
                  <span>&#x25BC;</span>
                </summary>
                <div className="p-4 bg-gray-700">
                  <p>Details about the role of design in the climate emergency.</p>
                </div>
              </details>
              <details className="group">
                <summary className="text-white py-2 px-4 cursor-pointer flex justify-between items-center">
                  <span>------------------------------------------</span>
                  <br />
                  <span>Time for Change</span>
                  <span>&#x25BC;</span>
                </summary>
                <div className="p-4 bg-gray-700">
                  <p>It's time for drastic change to counter the climate emergency.</p>
                </div>
              </details>
              <details className="group">
                <summary className="text-white py-2 px-4 cursor-pointer flex justify-between items-center">
                  <span>------------------------------------------</span>
                  <br />
                  <span>Act with Urgency</span>
                  <span>&#x25BC;</span>
                </summary>
                <div className="p-4 bg-gray-700">
                  <p>We must act now with a sense of urgency to prevent further damage.</p>
                </div>
              </details>
            </div>
            <div className="mt-8">
              <button className="bg-white text-black hover:bg-[#ff4b2b] hover:text-white py-2 px-6 rounded">
                View our D! Intro Video
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-white h-screen flex items-start justify-end w-screen flex-shrink-0">
        <div className="container px-4 justify-end text-center w-full">
          <div className="space-y-4 w-[90%]">
            <h1 className="font-bold" style={{ fontSize: "4rem", lineHeight: "1.2" }}>
              The science is settled. We are in an emergency of climate and
              nature. The world is past breaking point; the breakdown has
              begun...
            </h1>
            <div className="space-y-2">
              <details className="group">
                <summary className="text-white py-2 px-4 cursor-pointer flex justify-between items-center">
                  <span>------------------------------------------</span>
                  <br />
                  <span>The Role of Design</span>
                  <span>&#x25BC;</span>
                </summary>
                <div className="p-4 bg-gray-700">
                  <p>Details about the role of design in the climate emergency.</p>
                </div>
              </details>
              <details className="group">
                <summary className="text-white py-2 px-4 cursor-pointer flex justify-between items-center">
                  <span>------------------------------------------</span>
                  <br />
                  <span>Time for Change</span>
                  <span>&#x25BC;</span>
                </summary>
                <div className="p-4 bg-gray-700">
                  <p>It's time for drastic change to counter the climate emergency.</p>
                </div>
              </details>
              <details className="group">
                <summary className="text-white py-2 px-4 cursor-pointer flex justify-between items-center">
                  <span>------------------------------------------</span>
                  <br />
                  <span>Act with Urgency</span>
                  <span>&#x25BC;</span>
                </summary>
                <div className="p-4 bg-gray-700">
                  <p>We must act now with a sense of urgency to prevent further damage.</p>
                </div>
              </details>
            </div>
            <div className="mt-8">
              <button className="bg-white text-black hover:bg-[#ff4b2b] hover:text-white py-2 px-6 rounded">
                View our D! Intro Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
