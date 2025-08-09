"use client";
import { useState } from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import Sidebar from "@/components/Shared/Sidebar/Sidebar";
import Topbar from "@/components/Shared/Topbar/Topbar";
import BottomNav from "@/components/Shared/BottomNav/BottomNav";
export default function WithLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className={`d-flex ${sidebarOpen ? "" : "desktop-collapsed"}`}>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
       {/* <BottomNav /> */}
      </div>
      <div className="main-content w-100">{children}</div>
    </div>
  );
}
