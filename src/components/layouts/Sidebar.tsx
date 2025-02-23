"use client";
import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Home, Users, Menu, X } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* ✅ Desktop Sidebar (Always Fixed and Takes Space) */}
      <div className="hidden md:block md:fixed md:top-6  md:left-6 md:h-[calc(100vh-2.5rem)] md:w-64 md:bg-gradient-to-br from-[#3A3D4E] via-[#3A3D4E] to-[#1b2131] shadow-xl border-r border-gray-700 text-white p-6 z-50 rounded-3xl">
      <nav className="space-y-6">
          <SidebarItem icon={<Home />} label="Dashboard" href="/dashboard" setIsOpen={setIsOpen} />
          <SidebarItem icon={<Users />} label="Users" href="/users" setIsOpen={setIsOpen} />
        </nav>
      </div>

      {/* ✅ Mobile Sidebar (Toggleable) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-5 left-5 bg-gray-800 shadow-xl text-white p-2 rounded-lg"
        >
          <Menu className=" text-gray-100" />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
            <div
              className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-[#3A3D4E] via-[#3A3D4E] to-[#1b2131] 
              shadow-xl border-r border-gray-700 text-white p-6 z-50 rounded-3xl transition-transform"
            >
              <button onClick={() => setIsOpen(false)} className="mb-6 flex items-center">
                <X className="w-6 h-6 text-gray-400" />
              </button>
              <nav className="space-y-6">
                <SidebarItem icon={<Home />} label="Dashboard" href="/dashboard" setIsOpen={setIsOpen} />
                <SidebarItem icon={<Users />} label="Users" href="/users" setIsOpen={setIsOpen} />
              </nav>
            </div>
          </>
        )}
      </div>

      <div className=" md:pl-64">
      
      </div>
    </div>
  );
};

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  setIsOpen: (isOpen: boolean) => void;
}

const SidebarItem = ({ icon, label, href, setIsOpen }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className={`flex items-center gap-4 p-2 rounded-2xl transition-all ${
        isActive ? "bg-[#4A4D5E] text-white font-semibold" : "hover:bg-[#4A4D5E]"
      }`}
    >
      {icon}
      <span className="text-lg">{label}</span>
    </Link>
  );
};

export default Sidebar;
