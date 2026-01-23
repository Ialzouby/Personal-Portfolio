"use client";
// import { useState } from "react"; // Commented out - used for sidebar
// import Sidebar from "@/components/Shared/Sidebar/Sidebar"; // Commented out - using Header instead
// import Topbar from "@/components/Shared/Topbar/Topbar"; // Commented out - Header handles mobile menu
import Header from "@/components/Shared/Header/Header";
import BottomNav from "@/components/Shared/BottomNav/BottomNav";

export default function WithLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Sidebar state - commented out, kept for potential reversion
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="d-flex flex-column">
      <Header />
      {/* <BottomNav /> */}
      <div className="main-content w-100">{children}</div>
    </div>
  );
}

/* 
// ====== SIDEBAR VERSION - COMMENTED OUT ======
// Uncomment this and comment out the header version above to revert to sidebar

"use client";
import { useState } from "react";
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
    <div className={\`d-flex \${sidebarOpen ? "" : "desktop-collapsed"}\`}>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="main-content w-100">{children}</div>
    </div>
  );
}
*/
