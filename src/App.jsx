import React, { useState } from "react";
import Filters from "./Components/Filters";
import FetchCSVData from "./Components/FetchCSVData";
import DataCard from "./Components/DataCard"; // Updated component
import Ticker from "./Components/Ticker";
import "./App.css";

function App() {
  const [data, setData] = useState([]); // Main data state
  const [filters, setFilters] = useState({ NSECode: "", PE: "" }); // Filters state
  const [selectedCompany, setSelectedCompany] = useState(null); // Track selected company

  // Filtered data based on filters
  const getFilteredData = () => {
    return data.filter((row) => {
      const nseCodeMatch = row["NSECode"]
        ?.toLowerCase()
        .includes(filters.NSECode.toLowerCase());

      const peValueMatch = filters.PE
        ? parseFloat(row["PE"]) === parseFloat(filters.PE)
        : true;

      return nseCodeMatch && peValueMatch;
    });
  };

  // Handle company selection
  const handleCompanyClick = (companyName) => {
    setSelectedCompany((prev) => (prev === companyName ? null : companyName)); // Toggle selection
  };

  return (
    <div className="app" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <h1>Company Data Viewer</h1>
      <FetchCSVData setData={setData} />
      {data.length > 0 && (
        <>
          {!selectedCompany ? (
            // Display all companies and filters
            <>
              <Filters filters={filters} setFilters={setFilters} />
              <Ticker data={data} />
              <div style={{ display: "flex",justifyContent:"center", flexWrap: "wrap", gap: "16px" }}>
                {getFilteredData().map((row, index) => (
                  <div
                    key={index}
                    className="data-card"
                    style={{
                      display:"flex",
                      justifyContent:"center",
                      fontSize:"0.6rem",
                      textAlign:"center",
                      borderRadius:"10px",
                      cursor: "pointer",
                      // minWidth:"3rem",
                      maxWidth: "7rem",
                      // padding:"2rem",
                      // padding: "16px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      backgroundColor: "#f9f9f9"
                    }}
                    onClick={() => handleCompanyClick(row.NSECode.slice(4))}
                  >
                    <h2 style={{ color: "#017cff" }}>
                      {row.NSECode.slice(4) || "Unknown Company"}
                    </h2>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Display selected company details
            <>
              <button
                onClick={() => setSelectedCompany(null)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginBottom: "16px",
                }}
              >
                Back to Companies
              </button>
              {data
                .filter((row) => row.NSECode.slice(4) === selectedCompany)
                .map((row, index) => (
                  <DataCard key={index} row={row} />
                ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
