"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: ["Performance", "Engagement", "Growth", "Satisfaction", "Retention"],
  datasets: [
    {
      label: "User Metrics",
      data: [75, 85, 90, 70, 80],
      backgroundColor: "rgba(34, 197, 94, 0.5)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 2,
    },
  ],
};
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, 
        labels: { color: "#fff" },
      },
    
    },
    scales: {
      r: {
        angleLines: { color: "rgba(255, 255, 255, 0.2)" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
        pointLabels: { color: "#fff" },
      },
    },
  };
  

export default function RadarChart() {
  return (
   <div className="p-5 ">
     <h3 className="text-white mb-6 font-semibold">User Performance Radar</h3>
    
    <div className="  h-full rounded-3xl">
      <Radar data={data} options={options} />
    </div> 
</div>
  );
}
