import React from "react";
import DataCard from "./DataCard";
import "./DataGrid.css";

function DataGrid({ data }) {
  if (data.length === 0) return <p>No data matches the filters.</p>;

  return (
    <div className="data-grid">
      {data.map((row, index) => (
        <DataCard key={index} row={row} />
      ))}
    </div>
  );
}

export default DataGrid;
