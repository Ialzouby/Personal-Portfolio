"use client";

import ThemeButton from "@/components/DarkMode/ThemeButton/ThemeButton";
import Image from "next/image";
import profile from "@/../public/images/profile.png"; // Static image import
import Link from "next/link";

const Topbar = () => {
  return (
    <div className="w-100 bgn1-color p-3 position-fixed z-3 top-0 d-lg-none d-flex align-items-center justify-content-between br-bottom-n5 box-shadow1">
      
      {/* Profile image as circle button */}
      <Link href="/about" className="side-icon bgn2-color brn4 overflow-hidden p-0">
        <Image
          src={profile}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-circle"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="d-flex gap-3 align-items-center">
        {/* Dark mode toggle */}
        <div className="side-icon bg1-color">
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
