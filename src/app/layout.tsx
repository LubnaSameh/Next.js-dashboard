"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import Sidebar from "@/components/layouts/Sidebar";
import Loader from "@/components/common/Loader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body className="relative">
        {loading && <Loader />} 
        <div className="md:flex p-7 gap-7 min-h-screen bg-gray-900 ">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
