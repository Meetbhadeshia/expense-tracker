import React from "react";
import Navbar from "@/components/Navbar";
import Pie from "@/components/Graph";

export default function Home() {
  const chartSeries = [40, 30, 30];
  const chartSeries1 = [210, 40, 50];
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center", // Center items vertically
          gap: "20px", // Add space between the pie charts
          height: "100vh",
        }}
        className="tertiary-color"
      >
        <Pie chartSeries={chartSeries} showDataLabels={true} /> {/* Show raw numbers */}
        <Pie chartSeries={chartSeries1} showDataLabels={false} /> {/* Show percentages */}
      </div>
    </>
  );
}
