import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../APIs/userDetails";
import logo from "/src/assets/deeptrace_logo_transparent.png";
import Scene from './Scene'; // Adjust the path as needed
import './Scene.scss'; // Import the SCSS styles
import { useRef } from 'react';


function Home() {
  const [user, setUser] = useState(1); // Initialize as null to avoid rendering "1"
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      if (userDetails) setUser(userDetails);
    };
    fetchUserDetails();
  }, []);
  
  const containerRef = useRef(null);

  // Add an event listener to capture the wheel scroll and translate it to horizontal scroll
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY; // Horizontal scroll when vertical wheel movement
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
  }, []);
  

  return (
    <div
      ref={containerRef}
      className="flex flex-row h-[100vh] overflow-y-hidden overflow-x-auto scrollbar-hide"
    >
      {/* First Section */}
      <div className="text-white h-screen flex flex-col justify-top items-start flex-shrink-0 w-screen scrollbar-hide">
        <div className="h-screen w-screen px-11 py-11">
          {/* Left Side - Main Title */}
          <div className="flex flex-col items-start space-y-4 mt-0 scrollbar-hide">
            <h1
              className="font-extrabold relative xl:text-[7vw] lg:text-[6.5vw] md:text-[40px]"
              style={{lineHeight: 1 }}
            >
              Hello {user.username}, <br />
              <span className="type-animation">Welcome to </span> <br />
              <span className="type-animation text-[#ff4b2b]">ScanX</span>
            </h1>
          </div>
          <div className="left-[28vw] top-[67vh] absolute ">
            <Scene />
          </div>

          {/* Right Side - Description and Buttons */}
          <div className="absolute bottom-11 right-0 pr-8 w-[15vw]">
            <p className="text-[1vw] max-w-xs mb-6">
              Design Declares is a growing group of designers, design studios,
              agencies, and institutions here to declare a climate and
              ecological emergency.
            </p>

            {/* Buttons */}
            <div className="space-y-2">
              <button className="bg-white text-[1.2vw] text-black hover:bg-[#ff4b2b] hover:text-white py-2 px-4 rounded">
                Menu +
              </button>
              <br />
              <button className="bg-white text-[1.2vw] text-black hover:bg-[#ff4b2b] hover:text-white py-2 px-4 rounded">
                Declare Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <div className="text-white h-screen flex items-start justify-end w-screen flex-shrink-0">
        <div className="container px-4 justify-end text-center w-full">
          {/* Right Side Content */}
          <div className="space-y-4 w-[90%]">
            {/* Main Headline */}
            <h1
              className="font-bold"
              style={{ fontSize: "4rem", lineHeight: "1.2" }}
            >
              The science is settled. We are in an emergency of climate and
              nature. The world is past breaking point; the breakdown has
              begun...
            </h1>

            {/* Collapsible Sections */}
            <div className="space-y-2">
              <details className="group">
                <summary className="text-white py-2 px-4 cursor-pointer flex justify-between items-center">
                  <span>------------------------------------------</span>
                  <br />
                  <span>The Role of Design</span>
                  <span>&#x25BC;</span>
                </summary>
                <div className="p-4 bg-gray-700">
                  <p>
                    Details about the role of design in the climate emergency.
                  </p>
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
                  <p>
                    It's time for drastic change to counter the climate
                    emergency.
                  </p>
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
                  <p>
                    We must act now with a sense of urgency to prevent further
                    damage.
                  </p>
                </div>
              </details>
            </div>

            {/* View Video Button */}
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
          {/* Right Side Content */}
          <div className="space-y-4 w-[90%]">
            {/* Main Headline */}
            <h1
              className="font-bold"
              style={{ fontSize: "4rem", lineHeight: "1.2" }}
            >
              The science is settled. We are in an emergency of climate and
              nature. The world is past breaking point; the breakdown has
              begun...
            </h1>

            {/* Collapsible Sections */}
            <div className="space-y-2">
              <details className="group">
                <summary className="text-white py-2 px-4 cursor-pointer flex justify-between items-center">
                  <span>------------------------------------------</span>
                  <br />
                  <span>The Role of Design</span>
                  <span>&#x25BC;</span>
                </summary>
                <div className="p-4 bg-gray-700">
                  <p>
                    Details about the role of design in the climate emergency.
                  </p>
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
                  <p>
                    It's time for drastic change to counter the climate
                    emergency.
                  </p>
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
                  <p>
                    We must act now with a sense of urgency to prevent further
                    damage.
                  </p>
                </div>
              </details>
            </div>

            {/* View Video Button */}
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
          {/* Right Side Content */}
          <div className="space-y-4 w-[90%]">
            {/* Main Headline */}
            <h1
              className="font-bold"
              style={{ fontSize: "4rem", lineHeight: "1.2" }}
            >
              The science is settled. We are in an emergency of climate and
              nature. The world is past breaking point; the breakdown has
              begun...
            </h1>

            {/* Collapsible Sections */}
            <div className="space-y-2">
              <details className="group">
                <summary className="text-white py-2 px-4 cursor-pointer flex justify-between items-center">
                  <span>------------------------------------------</span>
                  <br />
                  <span>The Role of Design</span>
                  <span>&#x25BC;</span>
                </summary>
                <div className="p-4 bg-gray-700">
                  <p>
                    Details about the role of design in the climate emergency.
                  </p>
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
                  <p>
                    It's time for drastic change to counter the climate
                    emergency.
                  </p>
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
                  <p>
                    We must act now with a sense of urgency to prevent further
                    damage.
                  </p>
                </div>
              </details>
            </div>

            {/* View Video Button */}
            <div className="mt-8">
              <button className="bg-white text-black hover:bg-[#ff4b2b] hover:text-white py-2 px-6 rounded">
                View our D! Intro Video
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Home;
