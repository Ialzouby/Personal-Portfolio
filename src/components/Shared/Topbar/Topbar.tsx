"use client";

import ThemeButton from "@/components/DarkMode/ThemeButton/ThemeButton";
import Image from "next/image";
import profile from "@/../public/images/profile.png";
import Link from "next/link";
import { useState } from "react";
import { PiList, PiX } from "react-icons/pi";
import { bottomNavData } from "../../../../public/data/Sidebar";

const Topbar = () => {
  const [open, setOpen] = useState(false);

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
            onClick={() => setOpen(!open)}
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
            {open ? <PiX size={20} /> : <PiList size={20} />}
          </button>
        </div>
      </div>

      {/* Drawer menu */}
      {open && (
        <div
          className="position-fixed top-0 end-0 h-100 bgn1-color shadow z-2 d-lg-none"
          style={{
            width: "75%",
            padding: "2rem 1.5rem",
            paddingTop: "5rem",
            transition: "transform 0.3s ease-in-out",
            overflowY: "auto",
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
            boxShadow: "rgba(0, 0, 0, 0.15) -4px 0px 12px",
          }}
        >
          <h5
            style={{
              marginBottom: "1.5rem",
              fontWeight: 600,
              letterSpacing: "0.5px",
              color: "var(--bs-dark)",
            }}
          >
            Navigation
          </h5>
          <ul className="list-unstyled">
            {bottomNavData.map(({ id, name, url, icon }) => (
              <li key={id} className="mb-3">
                <Link
                  href={url}
                  onClick={() => setOpen(false)}
                  className="d-flex align-items-center gap-3 fs-five text-decoration-none"
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                    backgroundColor: "rgba(var(--bs-light-rgb), 0.3)",
                    color: "var(--bs-dark)",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(var(--bs-primary-rgb), 0.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(var(--bs-light-rgb), 0.3)")
                  }
                >
                  <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                  <span>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Topbar;
