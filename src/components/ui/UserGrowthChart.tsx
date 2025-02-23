"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const userGrowthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "User Growth",
      data: [150, 180, 250, 400, 600, 900],
      borderColor: "#60A5FA",
      backgroundColor: "rgba(99, 163, 240, 0.2)",
      pointBackgroundColor: "#34D399",
      pointBorderColor: "#34D399",
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 3,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // ✅ يخلي الـ Chart يتمدد وياخد كل الطول
  plugins: {
    legend: {
      labels: {
        color: "#FFFFFF",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#E5E7EB",
      },
      grid: {
        color: "rgba(255,255,255,0.1)",
      },
    },
    y: {
      ticks: {
        color: "#E5E7EB",
      },
      grid: {
        color: "rgba(255,255,255,0.1)",
      },
    },
  },
};

export default function UserGrowthChart() {
  return (
    <div className="text-white p-4 bg-[#3A3D4E] rounded-3xl flex flex-col flex-grow h-full">
      <h2 className="font-semibold mb-2">User Growth</h2>
      <div className="w-full h-full  "> 
        <Line data={userGrowthData} options={chartOptions} />
      </div>
    </div>
  );
}
