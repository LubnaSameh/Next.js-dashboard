"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Active Users",
      data: [3200, 4000, 5000, 7000, 8500, 10000],
      backgroundColor: "rgba(34, 197, 94, 0.8)", // ✅ Green bars
      borderRadius: 5,
    },
    {
      label: "Inactive Users",
      data: [1200, 1100, 1300, 1400, 1350, 1200],
      backgroundColor: "rgba(239, 68, 68, 0.8)", // ✅ Red bars
      borderRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // ✅ Enables auto-resizing
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#fff",
      },
    },
  
  },
  scales: {
    x: {
      ticks: { color: "#fff" },
      grid: { color: "rgba(255, 255, 255, 0.12)" },
    },
    y: {
      beginAtZero: true,
      ticks: { color: "#fff" },
      grid: { color: "rgba(255, 255, 255, 0.2)" },
    },
  },
};

export default function UserChart() {
  return (
    <div className="bg-[#3A3D4E] p-4 rounded-3xl">
      <h3 className="text-white font-semibold pb-4">User Activity Overview</h3>

      <div className="w-full h-auto min-h-[250px]  aspect-[16/9]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
