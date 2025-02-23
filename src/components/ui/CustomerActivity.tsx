import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Users, MousePointerClick, ShoppingCart, Package } from "lucide-react"; // ✅ أيقونات lucide-react

// تسجيل العناصر المطلوبة
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CustomerActivity = () => {
  const stats = [
    { icon: <Users className="text-blue-500 w-5 h-5" />, label: "Users", value: "32,984" },
    { icon: <MousePointerClick className="text-blue-500 w-5 h-5" />, label: "Clicks", value: "2.42m" },
    { icon: <ShoppingCart className="text-blue-500 w-5 h-5" />, label: "Sales", value: "2,400$" },
    { icon: <Package className="text-blue-500 w-5 h-5" />, label: "Items", value: "320" },
  ];

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Active Users",
        data: [5000, 10000, 8000, 15000, 20000, 18000],
        backgroundColor: "rgba(247, 104, 140, 0.5)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#fff" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.2)" },
        ticks: { color: "#fff" },
      },
    },
  };

  return (
    <div className="text-white w-full ">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <h2 className="text-lg font-semibold">Active Users</h2>
        <p className="text-sm text-green-400 mt-2 sm:mt-0">(+23) than last week</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center ">
            <div className="flex items-center gap-2">
              {stat.icon}
              <span className="text-sm">{stat.label}</span>
            </div>
            <p className="text-sm font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className=" min-h-[150px] mt-4 overflow-x-auto">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CustomerActivity;
