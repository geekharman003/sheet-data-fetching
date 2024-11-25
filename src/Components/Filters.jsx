import React from "react";


function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    // console.log(filters)
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters" style={{display:"flex",gap:"5px",margin:"20px 0"}}>
      {/* Filter by NSE Code */}
      <div className="filter-item">
        <label htmlFor="nse-code">Search by NSE Code:</label>
        <input style={{border:"none",padding:"0.5rem 0.3rem",marginLeft:"5px",fontFamily:"inherit",borderRadius:"30px",backgroundColor:"#5e5b5b",outline:"none",color:"#fff"}}
          type="text"
          id="nse-code"
          name="NSECode"
          value={filters.NSECode}
          onChange={handleChange}
          placeholder="Enter NSE Code"
        />
      </div>

      {/* Filter by PE Value */}
      {/* <div className="filter-item">
        <label htmlFor="pe-value">Search by PE Value:</label>
        <input
          type="number"
          id="pe-value"
          name="PE"
          value={filters.PE}
          onChange={handleChange}
          placeholder="Enter PE Value"
        />
      </div> */}
    </div>
  );
}

export default Filters;
