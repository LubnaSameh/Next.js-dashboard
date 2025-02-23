import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Type for chart reference
type AnalyticsChartRef = ChartJS<"line", number[], unknown>;

const AnalyticsChart = () => {
  const chartRef = useRef<AnalyticsChartRef | null>(null);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [100, 400, 250, 600, 350, 500],
        borderColor: "rgba(243, 118, 145, 0.1)",
        backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; chartArea: { top: number; bottom: number } } }) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          
          if (!chartArea) return "rgba(255,99,132,0.5)"; // Default color to prevent TypeScript error

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(255,99,132,0.5)");
          gradient.addColorStop(1, "rgba(238, 117, 117, 0.16)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "rgba(255,255,255,0.7)" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "rgba(255,255,255,0.7)" },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
    },
  };

  return (
    <div className="w-full h-64 flex flex-col">
      <div className="mb-4">
        <h3 className="text-white text-xl font-semibold">Sales overview</h3>
        <p className="text-gray-400 text-sm">
          <span className="text-green-400 font-bold">(+5)</span> more in 2021
        </p>
      </div>

      <div className="flex-1 relative"> 
        <Line
          ref={chartRef}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default AnalyticsChart;
