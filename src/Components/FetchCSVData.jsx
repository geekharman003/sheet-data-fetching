import React, { useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";

function FetchCSVData({ setData }) {
  const fetchCSVData = async () => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vROGV9f18s3RsCt3Owa8DkkddKJnEtCj_rDdmjpojJhUkRPtBqID7Tcu15gYsPQMX-vr0SbvUSbQbhp/pub?output=csv";
    // console.log(csvUrl[1])
    try {
      const response = await axios.get(csvUrl);
      console.log(response.data)
      const parsed = Papa.parse(response.data, {
        header: true,
        skipEmptyLines: true,
      });
      setData(parsed.data);
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }
  };

  useEffect(() => {
    fetchCSVData();
  }, []);

  return null; // This component fetches data, no UI required
}

export default FetchCSVData;
