// Example: لو عايز تخلي Dashboard هو الصفحة الرئيسية فعلاً

"use client";
import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Home, Users, Menu, X } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* ✅ Desktop Sidebar (Sidebar بيظهر في الشاشات الكبيرة) */}
      <div
        className="hidden md:block md:fixed md:top-6 md:left-6 md:h-[calc(100vh-2.5rem)] md:w-64
        md:bg-gradient-to-br from-[#3A3D4E] via-[#3A3D4E] to-[#1b2131] shadow-xl
        border-r border-gray-700 text-white p-6 z-50 rounded-3xl"
      >
        <nav className="space-y-6">
          {/* 
            لو الصفحة الرئيسية هي الـDashboard
            خلّي الـhref="/" عشان تبقى Active على طول وانت في /
          */}
          <SidebarItem icon={<Home />} label="Dashboard" href="/" />
          <SidebarItem icon={<Users />} label="Users" href="/users" />
        </nav>
      </div>

      {/* ✅ Mobile Sidebar (Sidebar بيظهر في الموبايل) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-5 left-5 bg-gray-800 shadow-xl text-white p-2 rounded-lg"
        >
          <Menu className="text-gray-100" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div
              className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-[#3A3D4E] via-[#3A3D4E] to-[#1b2131]
              shadow-xl border-r border-gray-700 text-white p-6 z-50 rounded-3xl transition-transform"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="mb-6 flex items-center"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
              <nav className="space-y-6">
                <SidebarItem icon={<Home />} label="Dashboard" href="/" />
                <SidebarItem icon={<Users />} label="Users" href="/users" />
              </nav>
            </div>
          </>
        )}
      </div>

      <div className="md:pl-64"></div>
    </div>
  );
};

// ✅ SidebarItem a function (فنكشن بتعمل اللينك في الـSidebar)
interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const SidebarItem = ({ icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();

  // ✅ هنشيك لو الباث الحالي === href أو بيبدأ بنفسه
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
        isActive
          ? "bg-[#1F2937] text-white font-semibold shadow-xl rounded-3xl" // Example valid color
          : "hover:bg-[#1F2937] text-gray-300"
      }`}
    >
      {icon}
      <span className="text-lg">{label}</span>
    </Link>
  );
};

export default Sidebar;
