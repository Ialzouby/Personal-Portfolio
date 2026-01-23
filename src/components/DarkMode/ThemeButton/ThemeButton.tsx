"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { PiMoonFill, PiSunFill } from "react-icons/pi";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="d-flex align-items-center gap-2">
        <button
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
          className="theme-toggle-btn"
        >
          <span className="dark_btn d-flex justify-content-center align-items-center">
            {resolvedTheme === "light" ? <PiMoonFill /> : <PiSunFill />}
          </span>
        </button>
      </div>

      <style jsx>{`
        .theme-toggle-btn {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .dark_btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        /* Light mode - gray button */
        :global([data-theme="light"]) .dark_btn {
          background: #6b7280;
          color: #ffffff;
        }

        :global([data-theme="light"]) .dark_btn:hover {
          background: #4b5563;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
        }

        /* Dark mode - white button */
        :global([data-theme="dark"]) .dark_btn {
          background: #ffffff;
          color: #1f2937;
        }

        :global([data-theme="dark"]) .dark_btn:hover {
          background: #f3f4f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
};

export default ThemeButton;
