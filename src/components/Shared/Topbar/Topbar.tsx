"use client";

import ThemeButton from "@/components/DarkMode/ThemeButton/ThemeButton";
import Image from "next/image";
import profile from "@/../public/images/profile.png";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { PiList, PiX } from "react-icons/pi";

type TopbarProps = {
  sidebarOpen?: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
};

const Topbar = ({ sidebarOpen = false, setSidebarOpen }: TopbarProps) => {

  return (
    <>
      {/* Topbar */}
      <div
        className="w-100 bgn1-color p-3 position-fixed z-3 top-0 d-lg-none d-flex align-items-center justify-content-between br-bottom-n5 box-shadow1"
        style={{
          height: "60px",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        {/* Profile image as circle button */}
        <Link
          href="/about"
          className="side-icon bgn2-color brn4 overflow-hidden p-0"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={profile}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-circle"
            style={{ objectFit: "cover" }}
          />
        </Link>

        <div className="d-flex align-items-center gap-2">
          {/* Dark mode toggle */}
          <div
            className="side-icon bg1-color"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemeButton />
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setSidebarOpen && setSidebarOpen(!sidebarOpen)}
            className="bg1-color text-white border-0"
            aria-label="Toggle Menu"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
            }}
          >
            {sidebarOpen ? <PiX size={20} /> : <PiList size={20} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Topbar;
