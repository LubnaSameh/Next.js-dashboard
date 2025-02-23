"use client";

import { useState, useEffect } from "react";
import { UserCheck, UserX, ShoppingCart, BarChart } from "lucide-react";

const userStats = [
  {
    title: "Total Active Users",
    value: 32984,
    description: "Currently active users",
    icon: <UserCheck className="w-8 h-8 text-green-400" />,
    progress: 80,
  },
  {
    title: "Total Inactive Users",
    value: 1250,
    description: "Users not currently active",
    icon: <UserX className="w-8 h-8 text-red-400" />,
    progress: 20,
  },
  {
    title: "Avg Daily Logins",
    value: 4320,
    description: "Average logins per day",
    icon: <BarChart className="w-8 h-8 text-yellow-400" />,
    progress: 60,
  },
  {
    title: "Monthly Sales",
    value: 15670,
    description: "Total sales this month",
    icon: <ShoppingCart className="w-8 h-8 text-blue-400" />,
    progress: 90,
  },
];

export default function UserCardList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {userStats.map((stat, index) => (
        <AnimatedCard key={index} stat={stat} />
      ))}
    </div>
  );
}

// ✅ Animated Card Component
function AnimatedCard({ stat }: { stat: (typeof userStats)[0] }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500; // 1.5s animation duration
    
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progressTime = timestamp - startTime;

      const newValue = Math.round(stat.value * easeOutExpo(progressTime / duration));
      const newProgress = Math.round(stat.progress * easeOutExpo(progressTime / duration));

      setAnimatedValue(newValue > stat.value ? stat.value : newValue);
      setAnimatedProgress(newProgress > stat.progress ? stat.progress : newProgress);

      if (progressTime < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [stat.value, stat.progress]);

  return (
    <div className="flex flex-col gap-1 items-center bg-[#3A3D4E] p-3 rounded-3xl shadow-xl border-r border-gray-600 ">
      <div className="flex items-center gap-3">
        {stat.icon}
        <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
      </div>
      <p className="text-xl text-white font-bold">
        {animatedValue.toLocaleString()}
      </p>
      <p className="text-gray-400 text-sm">{stat.description}</p>
      <div className="relative w-16 h-16">
        <svg width="100%" height="100%" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="transparent"
            stroke="#4B5563"
            strokeWidth="3"
          />
          {/* Animated Progress Circle */}
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="transparent"
            stroke={
              stat.progress >= 80
                ? "#10B981"
                : stat.progress >= 40
                ? "#F59E0B"
                : "#EF4444"
            }
            strokeWidth="3"
            strokeDasharray="94"
            strokeDashoffset={94 - (94 * animatedProgress) / 100}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
        
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-xs fill-white "
          >
            {animatedProgress}%
          </text>
        </svg>
      </div>
    </div>
  );
}
