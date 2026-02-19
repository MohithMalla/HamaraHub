import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// Function to generate random activity
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      date: currentDate.toISOString().split("T")[0], 
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Generate data for the current year or a specific range
    const startDate = "2024-01-01"; 
    const endDate = "2024-12-31"; // Extended range for better visual
    const data = generateActivityData(startDate, endDate);
    setActivityData(data);
  }, []);

  return (
    <div>
      <h4>Recent Contributions</h4>
      <HeatMap
        className="HeatMapProfile"
        style={{ width: "100%", color: "#888" }}
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2024-01-01")}
        rectSize={14}
        space={4}
        
        // ✅ FIX: Use rectProps to force the BLUE color fill
        rectProps={(data) => {
          const count = data.count || 0;
          let color = "#ebedf0"; // Default Gray (Empty)

          // Define Blue Scale based on count intensity
          if (count > 0)  color = "#9be9a8"; // Green (Default - replaced below)
          
          // BLUE SCALE OVERRIDE
          if (count > 0)  color = "#b6e3ff"; // Light Blue
          if (count > 10) color = "#54aeff"; // Medium Blue
          if (count > 20) color = "#0969da"; // Dark Blue
          if (count > 30) color = "#0a3069"; // Very Dark Blue

          return {
            fill: color,
            rx: 2, // Rounded corners
          };
        }}
        
        // You can remove panelColors as rectProps handles it now
      />
    </div>
  );
};

export default HeatMapProfile;