"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { BarChart, ShoppingCart, DollarSign } from "lucide-react";

// ✅ Lazy Load Components
const StatsCard = dynamic(() => import("@/components/ui/StatsCard"), { ssr: false });
const FinancialDataTable = dynamic(() => import("@/components/ui/DataTable"), { ssr: false });
const AnalyticsChart = dynamic(() => import("@/components/ui/AnalyticsChart"), { ssr: false });
const CustomerActivity = dynamic(() => import("@/components/ui/CustomerActivity"), { ssr: false });

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-h-screen">
      
     
      <StatsCard title="Monthly Revenue" value="$4,200" description="Previous month: $3.1K" icon={<DollarSign />} progress={84} />
      <StatsCard title="Monthly Sales" value="$2,100" description="Previous month: $3.1K" icon={<ShoppingCart />} progress={70} />
      <StatsCard title="Total Profit" value="$10,200" description="Previous month: $9.5K" icon={<BarChart />} progress={85} />

     
      <div className="md:col-span-3 flex flex-col md:flex-row gap-5 h-full overflow-hidden">


<div className="flex-1 p-6 bg-[#3A3D4E] shadow-xl border-r border-gray-600 rounded-3xl min-h-[350px] min-w-0">
  <Suspense fallback={<div className="animate-pulse bg-gray-700  h-full rounded-3xl"></div>}>
    <AnalyticsChart />
  </Suspense>
</div>


<div className="p-6 bg-[#3A3D4E] shadow-xl border-r border-gray-600 rounded-3xl h-full min-w-0">
  <Suspense fallback={<div className="animate-pulse bg-gray-700  h-full rounded-3xl"></div>}>
    <CustomerActivity />
  </Suspense>
</div>

</div>


   
      <div className="md:col-span-3 bg-[#3A3D4E] p-6 shadow-xl border-r border-gray-600 rounded-3xl min-h-[400px]">
        <Suspense fallback={<div className="animate-pulse bg-gray-700 h-80 rounded-3xl"></div>}>
          <FinancialDataTable />
        </Suspense>
      </div>

    </div>
  );
}
