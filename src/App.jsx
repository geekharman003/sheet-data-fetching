import React, { useState } from "react";
import FetchCSVData from "./Components/FetchCSVData";
import Filters from "./Components/Filters";
import DataGrid from "./Components/DataGrid";
import Ticker from "./Components/Ticker";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ NSECode: "" });
  const [selectedSize, setSelectedSize] = useState("");
  const [marqueeData, setMarqueeData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");  // State for selected filter
  const [color,setColor] = useState("");
  const [backgroundColor,setBackgroundColor] = useState("");
  const[clicked,setClicked] = useState(false);

  // Function to set the fetched data and update marquee data
  const setFetchedData = (largeCapData, midCapData, smallCapData) => {
    setData({ largeCapData, midCapData, smallCapData });
    setMarqueeData([...largeCapData, ...midCapData, ...smallCapData]); // Update marquee data
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);  // Update selected filter
    setClicked(prev => !prev)


    // Filter data based on the selected sheet
    const filteredData = data[filter] || [];
    setData({ ...data, [filter]: filteredData });
  };

  const getFilteredData = () => {
    return (data[selectedFilter] || []).filter((row) => {
      const nseCodeMatch = row["NSECode"]?.toLowerCase().includes(filters.NSECode.toLowerCase());
      const sizeMatch = selectedSize ? row.size === selectedSize : true;
      return nseCodeMatch && sizeMatch;
    });
  };

  return (
    <div className="app">
      <h1>Company Data Viewer</h1>
      <div style={{display:"flex",gap:"1rem",justifyContent:"center",marginBottom:"1rem"}}>
        <button style={{backgroundColor:"#017CFF",color:"#fff"}} onClick={() => handleFilterChange("largeCapData")}>LargeCap</button>
        <button style={{backgroundColor:"#017CFF",color:"#fff"}} onClick={() => handleFilterChange("midCapData")}>MidCap</button>
        <button style={{backgroundColor:"#017CFF",color:"#fff"}} onClick={() => handleFilterChange("smallCapData")}>SmallCap</button>
      </div>
      
      <Filters
        filters={filters}
        setFilters={setFilters}
        setSelectedSize={setSelectedSize}
      />
      
      {marqueeData.length > 0 && <Ticker marqueeData={marqueeData} />}
      {data[selectedFilter]?.length > 0 && <DataGrid data={getFilteredData()} />}
      
      <FetchCSVData setFetchedData={setFetchedData} />
    </div>
  );
}

export default App;
