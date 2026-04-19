import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Pie from "@/components/Graph";
import { useRouter } from 'next/navigation';
import { getAuthToken, logout } from '../utils/auth';

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState({ labels: [], values: [] })

  // api call
  const getData = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
          logout();
          router.push('/login');
          return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/api/expenses?home=true`, {
        headers: {
          "Content-Type": "application/json", // Ensure proper content type
          "Authorization": `Bearer ${token}`
        }
      })

      if (res.status === 401 || res.status === 403) {
          logout();
          router.push('/login');
          return;
      }
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
      <div className="tertiary-color home-charts-container">
        <Pie chartSeries={data.values} showDataLabels={true} labels={data.labels} />
        <Pie chartSeries={data.values} showDataLabels={false} labels={data.labels} />
      </div>
    </>
  );
}
