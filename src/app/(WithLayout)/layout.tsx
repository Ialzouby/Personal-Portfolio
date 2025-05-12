
import Sidebar from "@/components/Shared/Sidebar/Sidebar";
import Topbar from "@/components/Shared/Topbar/Topbar";
import BottomNav from "@/components/Shared/BottomNav/BottomNav";

export default function WithLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="d-flex">
      <div>
        <Sidebar/>
        <Topbar />
        <BottomNav />
      </div>
      <div className="main-content w-100">{children}</div>
    </div>
  );
}
