import React from "react";
import "./DataCard.css";

function DataCard({ row }) {
  // Destructure the required fields with fallback values
  const {
    "52 Week High": weekHigh = "0",
    "52 Week Low": weekLow = "0",
    PE: peValue = "N/A",
    NSECode: nseCode = "N/A",
    ...otherData
  } = row || {}; // Ensure `row` is defined

  // Parse numeric values safely
  const high = parseFloat(weekHigh.replace(/,/g, "")) || 0;
  const low = parseFloat(weekLow.replace(/,/g, "")) || 0;

  // Click handler for company name
  function handleClick(e) {
    console.log(`${nseCode.slice(4)} clicked!`); // Example logging
  }

  return (
    <div className="data-card" style={{ color: "#000",backgroundColor:"#fff" }}>
      {/* Display company name with a click event */}
      <h3 onClick={handleClick} style={{ color: "#017cff", cursor: "pointer" }}>
        {nseCode.slice(4) || "Unknown Company"}
      </h3>

      {/* Display 52-week high/low */}
      {high && low && (
        <div>
          <h4>52 Week Range</h4>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <span>{low}</span>
            <span>{high}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "red" }}>L</span>
            <div style={{ width: "150px", height: "5px", backgroundColor: "#000", borderRadius: "5px" }}></div>
            <span style={{ color: "green" }}>H</span>
          </div>
        </div>
      )}

      {/* Display PE Value */}
      <p>
        <strong>PE Value:</strong> {peValue}
      </p>

      {/* Display other data dynamically */}
      <div>
        <h4>Overview</h4>
        {Object.entries(otherData).map(([key, value]) => (
          <React.Fragment key={key}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                <strong>{key}</strong>
              </p>
              <p>{value || "N/A"}</p>
            </div>
            <hr style={{ margin: "0" }} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DataCard;
