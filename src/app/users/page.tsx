"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { UserCard } from "@/components/ui";

const RadarChart = dynamic(() => import("@/components/ui/RadarChart"), { ssr: false });
const UserChart = dynamic(() => import("@/components/ui/UserChart"), { ssr: false });
const UserGrowthChart = dynamic(() => import("@/components/ui/UserGrowthChart"), { ssr: false });

export default function UsersPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4  w-full">
      
      <div className="lg:col-span-4 rounded-3xl">
        <UserCard />
      </div>
      <div className="lg:col-span-4 flex flex-col lg:flex-row gap-4 items-stretch w-full">
                <div className="lg:w-1/2 flex  shadow-xl border-r border-gray-600 flex-col rounded-3xl bg-[#3A3D4E] w-full">
          <Suspense fallback={<div className="animate-pulse rounded-3xl w-full h-full"></div>}>
            <RadarChart />
          </Suspense>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-4 ">
                    <div className="flex-1 rounded-3xl  bg-[#3A3D4E] shadow-xl border-r border-gray-600 w-full">
            <Suspense fallback={<div className="animate-pulse bg-gray-700 rounded-3xl w-full h-full"></div>}>
              <UserChart />
            </Suspense>
          </div>
          <div className="flex-1 rounded-3xl shadow-xl border-r border-gray-600  w-full">
            <Suspense fallback={<div className="animate-pulse  "></div>}>
              <UserGrowthChart />
            </Suspense>
          </div>

        </div>

      </div>

    </div>
  );
}
