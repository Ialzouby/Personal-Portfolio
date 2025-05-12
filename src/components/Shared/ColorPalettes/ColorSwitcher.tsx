import React, { useState, useEffect } from "react";
import { PiGearSix } from "react-icons/pi";

const ColorSwitcher = () => {
  const [isOpened, setIsOpened] = useState(false);
  const colors = ["120, 171, 168", "255, 145, 251", "253, 187, 46"];
  const colors2 = ["82, 113, 255", "0, 255, 255", "84, 182, 137"];

  const toggleSwitcher = () => {
    setIsOpened(!isOpened);
  };

  const setColor = (color: string) => {
    document.documentElement.style.setProperty("--p1", color);
    localStorage.setItem("primary-color", color);
  };

  useEffect(() => {
    const colorBg = localStorage.getItem("primary-color");
    if (colorBg) {
      document.documentElement.style.setProperty("--p1", colorBg);
    }
  }, []);

  return (
    <div
      className={`color-switcher ${isOpened ? "opened" : ""}`}
      onClick={toggleSwitcher}
    >
      <button className="switcher-btn">
        <PiGearSix />
      </button>
      <div className="pallates box-shadow2 brn4 d-flex flex-column gap-2">
        <div className="d-flex gap-2">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`color-btn bg-color${index + 1}`}
              data-color={color}
              onClick={() => setColor(color)}
            ></button>
          ))}
        </div>
        <div className="d-flex gap-2">
          {colors2.map((color, index) => (
            <button
              key={index}
              className={`color-btn bg-color${index + 4}`}
              data-color={color}
              onClick={() => setColor(color)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSwitcher;
