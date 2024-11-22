import React, { useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";

function FetchCSVData({ setFetchedData }) {
  const fetchCSVData = async () => {
    const LargeCap =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vROGV9f18s3RsCt3Owa8DkkddKJnEtCj_rDdmjpojJhUkRPtBqID7Tcu15gYsPQMX-vr0SbvUSbQbhp/pub?gid=2042082656&single=true&output=csv";
    const MidCap =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vROGV9f18s3RsCt3Owa8DkkddKJnEtCj_rDdmjpojJhUkRPtBqID7Tcu15gYsPQMX-vr0SbvUSbQbhp/pub?gid=666655100&single=true&output=csv";
    const SmallCap =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vROGV9f18s3RsCt3Owa8DkkddKJnEtCj_rDdmjpojJhUkRPtBqID7Tcu15gYsPQMX-vr0SbvUSbQbhp/pub?gid=459641059&single=true&output=csv";

    try {
      const responses = await axios.all([
        axios.get(LargeCap),
        axios.get(MidCap),
        axios.get(SmallCap),
      ]);

      const largeCapData = Papa.parse(responses[0].data, { header: true, skipEmptyLines: true }).data;
      const midCapData = Papa.parse(responses[1].data, { header: true, skipEmptyLines: true }).data;
      const smallCapData = Papa.parse(responses[2].data, { header: true, skipEmptyLines: true }).data;

      setFetchedData(largeCapData, midCapData, smallCapData); // Pass data to parent component
      console.log(largeCapData)
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchCSVData();

    // Set up interval to fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchCSVData();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null;
}

export default FetchCSVData;
