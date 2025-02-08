import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Pie from "@/components/Graph";

export default function Home() {
  const chartSeries = [40, 30, 30];
  const chartSeries1 = [210, 40, 50];

  const [data, setData] = useState({ labels: [], values: [] })

  // api call
  const getData = async () => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
      console.log('token home', token)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/expenses?home=true`, {
        credentials: "include", // Ensures cookies are sent with the request
        headers: {
          "Content-Type": "application/json", // Ensure proper content type
        }
      })

      if (!res.ok) {
        throw new Error('Failed to catch expenses')
      }
      const result = await res.json();
      // console.log('------data------', data)
      setData({ labels: result.labels, values: result.values })

    } catch (error) {
      console.log("Error loading expenses", error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

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
        <Pie chartSeries={data.values} showDataLabels={true} labels={data.labels} /> {/* Show percentages */}
        <Pie chartSeries={data.values} showDataLabels={false} labels={data.labels} /> {/*  Show raw numbers */}
      </div>
    </>
  );
}
