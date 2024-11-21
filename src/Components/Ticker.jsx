import React from "react";
import "./Ticker.css";

function Ticker({ data }) {
  return (
    <div style={{display:"flex" ,margin:"1rem",borderRadius:"10px"}} className="ticker-container">
      <marquee behavior="scroll" direction="alternate">
        {data.map((row, index) => (
          <span key={index} className="ticker-item">
            <strong>{row["NSECode"].slice(4) || "N/A"}</strong>: {row["CMP"] || "N/A"}&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </marquee>
    </div>
  );
}

export default Ticker;
