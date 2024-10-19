import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Landing from "./Landing.jsx";
import Predict from "./predict.jsx";
import Home from "./components/Homepage/Homepage.jsx";
import Login from "./components/Login/Login.jsx";
import VideoUpload from "./prediction.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ResultPage from "./ResultPage.jsx";

function App() {
  return (
    <div className="App">
  
      {/* Your existing Router structure */}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/upload-video" element={<VideoUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
