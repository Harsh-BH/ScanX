// Cube.jsx
import React from 'react';

const Cube = ({ id }) => (
  <div id={id} className="cube">
    <div className="container">
      <div className="left"></div>
      <div className="right"></div>
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="front"></div>
      <div className="back"></div>
    </div>
  </div>
);

export default Cube;
