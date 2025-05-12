"use client";
import { ChangeEvent, useState } from "react";

const Shipping = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.id);
  };

  return (
    <div className="brn4 p-3 p-md-5 rounded">
      <h5 className="fs-six fw-medium n5-color mb-3 mb-md-5">
        Shipping method
      </h5>

      <div
        className={`radioBtn d-flex gap-2 align-items-center brn4 px-2 px-md-3 rounded w-100 mb-2 mb-md-3 ${
          selectedOption === "radio1" ? "radio-active-bg" : ""
        }`}
      >
        <input
          type="radio"
          required
          className="brn4 p-3 n5-color my-2 my-md-3 w-max"
          id="radio1"
          name="radio"
          onChange={handleOptionChange}
        />
        <label
          htmlFor="radio1"
          className="cursor-pointer n5-color d-flex justify-content-between align-items-center py-1 py-md-2 w-100"
        >
          Inside Dhaka City
          <span className="n5-color">Free</span>
        </label>
      </div>

      <div
        className={`radioBtn d-flex gap-2 align-items-center brn4 px-2 px-md-3 rounded w-100 ${
          selectedOption === "radio2" ? "radio-active-bg" : ""
        }`}
      >
        <input
          type="radio"
          required
          className="brn4 p-3 n5-color my-2 my-md-3 w-max"
          id="radio2"
          name="radio"
          onChange={handleOptionChange}
        />
        <label
          htmlFor="radio2"
          className="cursor-pointer n5-color d-flex justify-content-between align-items-center py-1 py-md-2 w-100"
        >
          Outside Dhaka City
          <span className="n5-color">$20USD</span>
        </label>
      </div>
    </div>
  );
};

export default Shipping;
