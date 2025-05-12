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
    <div className="d-flex align-items-center gap-2">
      <button
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      >
        <span className="dark_btn d-flex justify-content-center align-items-center n11-color">
          {resolvedTheme === "light" ? <PiMoonFill /> : <PiSunFill />}
        </span>
      </button>
    </div>
  );
};

export default ThemeButton;
