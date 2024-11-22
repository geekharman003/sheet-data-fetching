import React from "react";
import "./Ticker.css";

function Ticker({ marqueeData }) {
  // console.log(marqueeData)m 
  return (
    <div style={{display:"flex" ,margin:"1rem",borderRadius:"10px"}} className="ticker-container">
      <marquee behavior="scroll" direction="left">
        {marqueeData.map((row, index) => (
          <span key={index} className="ticker-item">
            <strong>{row["NSECode"].slice(4) || "N/A"}</strong>: {row["CMP"] || "N/A"}&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </marquee>
    </div>
  );
}

export default Ticker;
