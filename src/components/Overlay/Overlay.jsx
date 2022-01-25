import React from "react";
import "./Overlay.css";

function Overlay({ text, spinner }) {

  // Calculate the height
  // var window_height = window.innerHeight * 0.67 ;
  // document.getElementById("window-height").style.height = "50px";
  // console.log(window_height);

  return (
    <>
      {/* <div id="window-height" style={{height: (window_height)}}></div> */}

      <div className="overlay">
        <div className="content">
          {spinner ?
            (
              <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
              </div>
            )
            :
            null
          }

          <div className="overlay-message-container">
            <h1 className="overlay-message">{text}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overlay;
