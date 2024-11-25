import React, { useState } from "react";
import FetchCSVData from "./Components/FetchCSVData";
import Filters from "./Components/Filters";
import DataGrid from "./Components/DataGrid";
import Ticker from "./Components/Ticker";
import "./App.css";

function App() {
  const [data, setData] = useState({ largeCapData: [], midCapData: [], smallCapData: [] });
  const [filters, setFilters] = useState({ NSECode: "" });
  const [selectedSize, setSelectedSize] = useState("");
  const [marqueeData, setMarqueeData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all"); // Default to show all data

  // Function to set the fetched data and update marquee data
  const setFetchedData = (largeCapData, midCapData, smallCapData) => {
    setData({ largeCapData, midCapData, smallCapData });
    setMarqueeData([...largeCapData, ...midCapData, ...smallCapData]); // Update marquee data
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter); // Update selected filter
  };

  const getFilteredData = () => {
    // Combine data from all sheets by default
    const combinedData = [...data.largeCapData, ...data.midCapData, ...data.smallCapData];
    
    // Filter data based on selected filter and input fields
    const filteredData =
      selectedFilter === "all" ? combinedData : data[selectedFilter] || [];

    return filteredData.filter((row) => {
      const nseCodeMatch = row["NSECode"]?.toLowerCase().includes(filters.NSECode.toLowerCase());
      const sizeMatch = selectedSize ? row.size === selectedSize : true;
      return nseCodeMatch && sizeMatch;
    });
  };

  return (
    <div className="app">
      <div id="stocks-image" style={{ width: "100vw", height: "300px" }}>
        <img width="100%" height="100%" src="./src/images/stock-news.jpg" alt="" />
      </div>
      <h1 style={{color:"#2f3c4c"}}>Stocks Data</h1>
      
      {marqueeData.length > 0 && <Ticker marqueeData={marqueeData} />}

      <Filters
        filters={filters}
        setFilters={setFilters}
        setSelectedSize={setSelectedSize}
      />
      
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button className="filter-btns" onClick={() => handleFilterChange("all")}>All</button>
        <button className="filter-btns" onClick={() => handleFilterChange("largeCapData")}>LargeCap</button>
        <button className="filter-btns" onClick={() => handleFilterChange("midCapData")}>MidCap</button>
        <button className="filter-btns" onClick={() => handleFilterChange("smallCapData")}>SmallCap</button>
      </div>
      
      {getFilteredData().length > 0 && <DataGrid data={getFilteredData()} />}

      <FetchCSVData setFetchedData={setFetchedData} />
    </div>
  );
}

export default App;
