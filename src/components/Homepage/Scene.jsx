// Scene.jsx
import React from 'react';
import Cube from './Cube';

const Scene = () => (
  <div className="scene">
    <Cube id="ground" />
    <div className="rocks">
      {Array.from({ length: 5 }, (_, i) => (
        <Cube key={i} id={`rock-${i + 1}`} />
      ))}
    </div>
    <div className="jedi">
      <div className="head">
        <Cube id="head" />
        <Cube id="neck" />
        <Cube id="nose" />
        <div className="eyes">
          <Cube id="eye-left" />
          <Cube id="eye-right" />
        </div>
        <div className="hair">
          <Cube id="hair-top" />
          <Cube id="hair-center" />
          <Cube id="hair-center-back" />
          <Cube id="hair-back" />
        </div>
      </div>
      <div className="body">
        <Cube id="body" />
      </div>
      <div className="legs">
        <div className="leg-left">
          <Cube id="leg-left" />
          <Cube id="foot-left" />
        </div>
        <div className="leg-right">
          <Cube id="leg-right" />
          <Cube id="foot-right" />
        </div>
      </div>
      <div className="arms">
        <div className="arm-left">
          <Cube id="arm-left" />
          <div className="elbow-left">
            <Cube id="arm-left-bottom" />
            <Cube id="hand-left" />
          </div>
        </div>
        <div className="arm-right">
          <Cube id="arm-right" />
          <Cube id="hand-right" />
          <div className="light-saber">
            <Cube id="light-saber" />
            <Cube id="light-saber-bolster" />
            <Cube id="light-saber-handle" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Scene;
