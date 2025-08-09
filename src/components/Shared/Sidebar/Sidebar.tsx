"use client";
import Image from "next/image";
import Link from "next/link";
import profile from "@/../public/images/profile.png";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiGithubLogo,
  PiPaperPlaneTilt,
  PiShoppingCart,
  PiX,
  PiCaretLeft,
  PiCaretRight,
} from "react-icons/pi";
import ThemeButton from "@/components/DarkMode/ThemeButton/ThemeButton";
import { sidebarsData } from "../../../../public/data/Sidebar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type SidebarProps = {
  sidebarOpen?: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ sidebarOpen = false, setSidebarOpen }: SidebarProps) => {
  const { resolvedTheme } = useTheme();
  const path = usePathname();

  const [mounted, setMounted] = useState(false);

  const closeOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 991) {
      setSidebarOpen && setSidebarOpen(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`side-menu ${sidebarOpen ? "active" : ""}`}>
      {/* Desktop right-edge center toggle anchored to sidebar */}
      <button
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        onClick={() => setSidebarOpen && setSidebarOpen(!sidebarOpen)}
        className="position-absolute d-none d-lg-flex align-items-center justify-content-center"
        style={{
          top: 12,
          right: -14,
          transform: "none",
          width: 28,
          height: 72,
          borderRadius: 9999,
          border: "none",
          zIndex: 1100,
          background: "rgba(var(--p1), 1)",
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
      >
        {sidebarOpen ? <PiCaretLeft size={16} /> : <PiCaretRight size={16} />}
      </button>
      {/* Close button only on mobile; desktop uses right-edge toggle */}
      <div
        onClick={() => setSidebarOpen && setSidebarOpen(false)}
        className={`sidebar-btn close-btn cursor-pointer d-block d-lg-none`}
      >
        <i className="fs-two p1-color">
          <PiX />
        </i>
      </div>

      <div className="d-flex">



        <div className="side-menu-right overflow-y-auto">
          <div className="d-flex flex-column gap-6 justify-content-between py-10 px-5 bgn2-color h-100">
            <div className="">
              <div className="sidebar-profile">
                <div className="position-relative">
                  <div className="profile-img1 d-flex justify-content-center overflow-hidden mx-auto">
                    <Image src={profile} alt="user" width={200} height={200} className="" />
                  </div>
                  <span className="thumb">🦾</span>
                </div>
                <h4 className="n5-color fw-semibold fs-five mt-2 text-center">
                Issam Alzouby
                </h4>
                <span className="n5-color fs-nine d-block text-center">
                 AI Researcher
                </span>
                <div className="d-flex justify-content-center gap-2 align-items-center mt-4">
                <Link href="https://www.linkedin.com/in/alzouby/" className="social-icon">
                    <i className="p1-color">
                      <PiLinkedinLogo />
                    </i>
                  </Link>
                  <Link href="https://github.com/Ialzouby" className="social-icon">
                    <i className="p1-color">
                      <PiGithubLogo />
                    </i>
                  </Link>


                </div>
              </div>
              <div className="line-divider my-4 my-md-8"></div>
              <div className="menu-list">
                <ul className="d-flex flex-column gap-3">
                  {sidebarsData.map(
                    ({
                      id,
                      name,
                      url,
                      icon,
                      numbers,
                    }: {
                      id: number;
                      name: string;
                      url: string;
                      icon: React.JSX.Element;
                      numbers?: number | undefined;
                    }) => (
                      <li key={id} className="rounded-3">
                        <Link
                          href={url}
                          onClick={closeOnMobile}
                          className={`d-flex justify-content-between align-items-center rounded-3 ${
                            path === url && "active"
                          }`}
                        >
                          <div
                            className={`menu-item d-flex align-items-center gap-2 n5-color fs-eight px-3 py-2 `}
                          >
                            {icon}
                            {name}
                          </div>

                          {numbers ? (
                            <span className="n5-color bg2-color fs-ten px-1 pt-1 rounded-2 me-3">
                              {numbers}
                            </span>
                          ) : (
                            ""
                          )}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-3">
  <Link
    href="/contact"
    //href="https://the-ai-bridge.vercel.app/"
    className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2"
    onClick={closeOnMobile}
  >
    <i className="ph ph-paper-plane-tilt">
      <PiPaperPlaneTilt />
    </i>
    Contact Me
  </Link>

  <div className="side-icon bg1-color d-flex align-items-center justify-content-center">
    <ThemeButton />
  </div>
</div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
