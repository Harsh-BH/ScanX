// ResultPage.jsx
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, fileName } = location.state || {}; // Access passed result and fileName
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Track mouse position

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  if (!result) {
    return (
      <div className="text-center text-white">
        <h2>No result data available. Please upload a file first.</h2>
        <button
          onClick={() => navigate('/upload-video')}
          className="mt-5 bg-[#1e1e1e] text-white py-2 px-4 rounded-lg"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  // Determine if the file is an image or video based on fileType from backend
  const isImage = result.fileType === 'image';
  console.log(result)

  return (
    <div
      ref={containerRef}
      className="relative flex flex-row h-screen overflow-y-hidden overflow-x-auto scrollbar-hide w-full"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 20, 147, 0.3), transparent 80%)`,
        backdropFilter: "blur(10px)", // Adds a blur effect for a glowing trail
      }}
    >
      <div className="min-h-screen text-white p-10 w-full">
        {/* Header */}
        <header className="flex justify-between items-center">
          <button
            onClick={() => navigate('/upload-video')}
            className="flex items-center gap-2 py-2.5 px-5 bg-white/10 backdrop-blur-lg text-[#f1f3f5] text-[1.3rem] rounded-full"
          >
            <ArrowLeft /> Return To Upload
          </button>
          <h1 className="text-5xl font-semibold">{isImage ? 'Image' : 'Video'} Analysis Result</h1>
        </header>

        {/* Result Overview */}
        <div className="mt-10 p-8 bg-white/10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-4 text-xl">
            <p><span className="font-bold">File Name:</span> {fileName}</p>
            <p><span className="font-bold">Prediction:</span> {result.prediction}</p>
            <p><span className="font-bold">Confidence:</span> {result.confidence}%</p>
            <p><span className="font-bold">Total Faces Analyzed:</span> {result.total_faces_analyzed}</p>
            <p><span className="font-bold">Processing Time:</span> {result.processing_time} seconds</p>
          </div>
        </div>

        {/* Per Frame Analysis (for videos) or Single Face Analysis (for images) */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold mb-4">
            {isImage ? 'Face Confidence' : 'Per Frame Confidence'}
          </h2>
          <div className="overflow-auto max-h-[400px] p-5 bg-white/10 rounded-lg scrollbar-hide">
            <table className="min-w-full table-auto text-lg">
              <thead>
                <tr className="text-left bg-white/20">
                  <th className="py-3 px-6">Frame Number</th>
                  <th className="py-3 px-6">Timestamp</th>
                  <th className="py-3 px-6">Confidence (%)</th>
                </tr>
              </thead>
              <tbody>
                {result.details.map((frame, index) => (
                  <tr key={index} className="border-b border-white/20">
                    <td className="py-2 px-6">
                      {isImage ? 'N/A' : (frame.frame_number !== null ? frame.frame_number : 'N/A')}
                    </td>
                    <td className="py-2 px-6">
                      {isImage ? 'N/A' : (typeof frame.timestamp === 'number' ? `${frame.timestamp.toFixed(2)}s` : 'N/A')}
                    </td>
                    <td className={`py-2 px-6 ${frame.confidence > 50 ? 'text-red-500' : 'text-green-500'}`}>
                      {frame.confidence.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
