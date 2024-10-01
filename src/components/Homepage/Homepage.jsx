import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../APIs/userDetails";
import logo from "/src/assets/deeptrace_logo_transparent.png";
import Scene from './Scene'; // Adjust the path as needed
import './Scene.scss'; // Import the SCSS styles



function Home() {
  const [user, setUser] = useState(1); // Initialize as null to avoid rendering "1"
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      if (userDetails) setUser(userDetails);
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-row h-screen overflow-x-auto overflow-y-hidden scrollbar-hide">
      {/* First Section */}
      <div className="text-white h-screen flex flex-col justify-top items-start flex-shrink-0 w-screen">
        <div className="  h-screen w-screen px-11 py-11">
          {/* Left Side - Main Title */}
          <div className="flex flex-col items-start space-y-4 mt-0">
          <h1
  className="font-extrabold"
  style={{ fontSize: "8rem", lineHeight: 1 }}
>
  Hello {user.username}, <br />
  <span className="type-animation">Welcome to </span> <br />
  <span className="type-animation text-[#ff4b2b]">ScanX</span>
</h1>

          </div>
          <div className="mt-32 ml-96">
          <Scene />
          </div>

 

          {/* Right Side - Description and Buttons */}
          <div className="absolute bottom-11 right-0 pr-8">
            <p className="text-base max-w-xs mb-6">
              Design Declares is a growing group of designers, design studios,
              agencies, and institutions here to declare a climate and
              ecological emergency. As part of the global declaration movement,
              we commit to harnessing the tools of our industry to reimagine,
              rebuild, and heal our world.
            </p>

            {/* Buttons */}
            <div className="space-y-2">
              <button className="bg-white text-black hover:bg-[#ff4b2b] hover:text-white py-2 px-4 rounded">
                Menu +
              </button>
              <br />
              <button className="bg-white text-black hover:bg-[#ff4b2b] hover:text-white py-2 px-4 rounded">
                Declare Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
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
      {/* Second Section */}
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
      {/* Second Section */}
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
