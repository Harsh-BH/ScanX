// Printer.jsx
import React, { useEffect } from 'react';
import './Printer.scss'; // Import the styles (we'll create this file later)

const Printer = () => {
  useEffect(() => {
    const printer = document.getElementById('printer');
    const shadows = document.getElementById('shadows');
    const paper = document.getElementById('paper');
    const paperShadow = document.getElementById('paper-shadow');
    const text = document.getElementById('text');
    const audio = document.getElementById('audio');

    const printerFunction = () => {
      printer.classList.toggle('is-printer-animated');
      shadows.classList.toggle('is-shadows-animated');
      paper.classList.toggle('is-paper-animated');
      paperShadow.classList.toggle('is-paper-shadow-animated');
      text.classList.toggle('is-text-animated');

      audio.loop = true;

      if (audio.paused) audio.play();
      else {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    printer.addEventListener('click', printerFunction);

    // Cleanup event listener on unmount
    return () => {
      printer.removeEventListener('click', printerFunction);
    };
  }, []);

  return (
    <div className="printer-container">
      <audio id="audio">
        <source
          src="https://raw.githubusercontent.com/ricardoolivaalonso/Codepen/master/Printer/printer.mp3"
          type="audio/mpeg"
        />
      </audio>
      <div className="shadows" id="shadows">
        <div className="shadow-1 face"></div>
        <div className="shadow-2 face"></div>
        <div className="shadow-3 face"></div>
        <div className="shadow-4 face"></div>
      </div>
      <div className="printer" id="printer">
        <div className="inside-shadow"></div>
        <div className="paper-shadow face" id="paper-shadow"></div>
        <div className="paper" id="paper"></div>
        {/* Top Elements */}
        <div className="at">
          <div className="at__front face"></div>
          <div className="at__back face"></div>
          <div className="at__right face"></div>
          <div className="at__left face"></div>
          <div className="at__top face"></div>
          <div className="at__bottom face"></div>
        </div>
        {/* Bottom Elements */}
        <div className="ab">
          <div className="ab__front face"></div>
          <div className="ab__back face"></div>
          <div className="ab__right face"></div>
          <div className="ab__left face"></div>
          <div className="ab__top face"></div>
          <div className="ab__bottom face"></div>
        </div>
        {/* Middle Elements */}
        <div className="am">
          <div className="am__front face"></div>
          <div className="am__back face"></div>
          <div className="am__right face"></div>
          <div className="am__left face"></div>
          <div className="am__top face"></div>
          <div className="am__bottom face"></div>
        </div>
        {/* Left Side */}
        <div className="bl">
          <div className="bl__front face"></div>
          <div className="bl__back face"></div>
          <div className="bl__right face"></div>
          <div className="bl__left face"></div>
          <div className="bl__top face"></div>
          <div className="bl__bottom face"></div>
        </div>
        {/* Right Side */}
        <div className="br">
          <div className="br__front face"></div>
          <div className="br__back face"></div>
          <div className="br__right face"></div>
          <div className="br__left face"></div>
          <div className="br__top face"></div>
          <div className="br__bottom face"></div>
        </div>
        {/* Base Bottom */}
        <div className="bb">
          <div className="bb__front face"></div>
          <div className="bb__back face"></div>
          <div className="bb__right face"></div>
          <div className="bb__left face"></div>
          <div className="bb__top face"></div>
          <div className="bb__bottom face"></div>
        </div>
        {/* Base Top */}
        <div className="bt">
          <div className="bt__front face"></div>
          <div className="bt__back face"></div>
          <div className="bt__right face"></div>
          <div className="bt__left face"></div>
          <div className="bt__top face"></div>
          <div className="bt__bottom face"></div>
        </div>
        {/* Center Left */}
        <div className="cl">
          <div className="cl__front face"></div>
          <div className="cl__back face"></div>
          <div className="cl__right face"></div>
          <div className="cl__left face"></div>
          <div className="cl__top face"></div>
          <div className="cl__bottom face"></div>
        </div>
        {/* Center Right */}
        <div className="cr">
          <div className="cr__front face"></div>
          <div className="cr__back face"></div>
          <div className="cr__right face"></div>
          <div className="cr__left face"></div>
          <div className="cr__top face"></div>
          <div className="cr__bottom face"></div>
        </div>
        {/* Center Middle */}
        <div className="cm">
          <div className="cm__front face">
            <div className="screen">
              <div className="screen__text" id="text">
                Printing
              </div>
            </div>
            <div className="buttons">
              <div className="button button--cta">
                {/* Button Faces */}
                <div className="button__front face"></div>
                <div className="button__back face"></div>
                <div className="button__right face"></div>
                <div className="button__left face"></div>
                <div className="button__top face"></div>
                <div className="button__bottom face"></div>
              </div>
              {/* Repeat buttons as necessary */}
              {/* ... */}
              <div className="large" id="button">
                <div className="large__front face"></div>
                <div className="large__back face"></div>
                <div className="large__right face"></div>
                <div className="large__left face"></div>
                <div className="large__top face">Start</div>
                <div className="large__bottom face"></div>
              </div>
            </div>
          </div>
          <div className="cm__back face"></div>
          <div className="cm__right face"></div>
          <div className="cm__left face"></div>
          <div className="cm__top face"></div>
          <div className="cm__bottom face"></div>
        </div>
        {/* Center Top */}
        <div className="ct">
          <div className="ct__front face"></div>
          <div className="ct__back face"></div>
          <div className="ct__right face"></div>
          <div className="ct__left face"></div>
          <div className="ct__top face"></div>
          <div className="ct__bottom face"></div>
        </div>
        {/* Center Bottom */}
        <div className="cb">
          <div className="cb__front face"></div>
          <div className="cb__back face"></div>
          <div className="cb__right face"></div>
          <div className="cb__left face"></div>
          <div className="cb__top face"></div>
          <div className="cb__bottom face"></div>
        </div>
        {/* Center Bottom Left */}
        <div className="cbl">
          <div className="cbl__front face"></div>
          <div className="cbl__back face"></div>
          <div className="cbl__right face"></div>
          <div className="cbl__left face"></div>
          <div className="cbl__top face"></div>
          <div className="cbl__bottom face"></div>
        </div>
        {/* Center Bottom Right */}
        <div className="cbr">
          <div className="cbr__front face"></div>
          <div className="cbr__back face"></div>
          <div className="cbr__right face"></div>
          <div className="cbr__left face"></div>
          <div className="cbr__top face"></div>
          <div className="cbr__bottom face"></div>
        </div>
      </div>
    </div>
  );
};

export default Printer;
