import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TextUploadComponent = () => {
  const [text, setText] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [classification, setClassification] = useState(null);
  const [LoaderActive, setLoaderActive] = useState(false);

  const navigate  =useNavigate()

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handleUpload = async () => {
    if (!text) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
      return;
    }
  
    try {
      setLoaderActive(true);
      const response = await fetch("http://127.0.0.1:5000/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Set content type to JSON
        },
        body: JSON.stringify({ text }),  // Send text as a JSON object
      });
  
      const data = await response.json();  // Parse the JSON response
      setClassification(data.classification);
    } catch (error) {
      console.error("Error classifying text:", error);
    } finally {
      setLoaderActive(false);
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen flex-shrink-0">
      <div className="text-section flex flex-col gap-4">
      <button
              className="w-fit flex items-center gap-2 py-2.5 px-5 bg-white/10 backdrop-blur-lg hover:bg-[#252525] text-[#f1f3f5] text-[1.1rem] rounded-full"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft /> Return To Homepage
            </button>
        <div className="text-5xl font-semibold">Upload Text</div>
        <div className="text-2xl font-medium">Enter Your Text</div>

        <textarea
          rows="10"
          cols="50"
          value={text}
          onChange={handleTextChange}
          className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-lg border border-[#ffffff10] text-[#f1f3f5]"
          placeholder="Type or paste your text here"
        ></textarea>

        <div className="relative">
          <button
            onClick={handleUpload}
            className={`py-2.5 px-5 bg-[#f1f3f5] hover:bg-[#ddd] text-[1.185rem] text-gray-900 font-semibold rounded-full ${
              LoaderActive ? "opacity-50" : ""
            }`}
          >
            Upload
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 bg-red-500 text-white text-lg p-3 rounded-xl shadow-lg transition-opacity duration-300 ease-in-out  w-48 text-center">
              Please enter some text.
            </div>
          )}
        </div>

        {/* Display classification result */}
        {classification && (
          <div className="classification-result mt-4">
            <h3 className="text-2xl font-semibold">Classification Result:</h3>
            <p className="text-xl">{classification}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextUploadComponent;
