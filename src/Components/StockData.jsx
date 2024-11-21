import React, { useState } from "react";
import "./StockData.css"; // Import your CSS for styling

export default function StockData({ stocks }) {
  const [selectedStock, setSelectedStock] = useState(null); // Track selected stock

  const handleStockClick = (stock) => {
    setSelectedStock(stock); // Set the clicked stock as selected
  };

  return (
    <div className="stock-list">
      {selectedStock ? (
        // Detailed view of a single stock
        <div className="stock-container">
          <button onClick={() => setSelectedStock(null)} className="back-button">
            Back to List
          </button>
          <div className="stock-header">
            <h1>{selectedStock.name}</h1>
            <p className="stock-symbol">{selectedStock.symbol}</p>
          </div>

          <div className="stock-prices">
            <div className="price-info">
              <h3 className="price">{selectedStock.price}</h3>
              <p
                className={`change ${
                  selectedStock.change < 0 ? "negative" : "positive"
                }`}
              >
                {selectedStock.change} ({selectedStock.percentChange}%)
              </p>
            </div>

            <div className="stock-details">
              <div className="detail">
                <p className="label">52 Week High</p>
                <p className="value">{selectedStock["52 Week High"]}</p>
              </div>
              <div className="detail">
                <p className="label">52 Week Low</p>
                <p className="value">{selectedStock["52 Week Low"]}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // List view of all stocks
        stocks.map((stock, index) => (
          <div
            className="stock-container clickable"
            key={index}
            onClick={() => handleStockClick(stock)}
          >
            <div className="stock-header">
              <h1>{stock.name}</h1>
              <p className="stock-symbol">{stock.symbol}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
