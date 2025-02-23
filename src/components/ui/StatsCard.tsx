import React, { useState, useEffect } from "react";

interface StatsCardProps {
  title: string;
  value: number | string; 
  description: string;
  icon: React.ReactNode;
  progress?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  progress = 0,
}) => {
  const numericValue = typeof value === "string" ? parseFloat(value.replace(/[$,]/g, "")) : value;
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (isNaN(numericValue)) return; 

    let startTime: number | null = null;
    const duration = 1500;
    
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progressTime = timestamp - startTime;
      
      const newValue = Math.round(numericValue * easeOutExpo(progressTime / duration));
      const newProgress = Math.round(progress * easeOutExpo(progressTime / duration));

      setAnimatedValue(newValue > numericValue ? numericValue : newValue);
      setAnimatedProgress(newProgress > progress ? progress : newProgress);

      if (progressTime < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [numericValue, progress]);

  return (
    <div className="bg-[#3A3D4E] text-white p-4 rounded-3xl shadow-xl border-r border-gray-600  flex gap-4">
      <div className="rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">
          {isNaN(animatedValue) ? "N/A" : animatedValue.toLocaleString()}
        </p>
        <p className="text-gray-400 text-sm">{description}</p>

        <div className="mt-3">
          <div className="w-full bg-gray-600 h-2 rounded-full">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${animatedProgress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-300">
            {animatedProgress}% completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
