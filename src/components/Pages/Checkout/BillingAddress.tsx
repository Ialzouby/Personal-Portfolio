"use client";
import { ChangeEvent, useState } from "react";
import SelectCountry from "./SelectCountry";
import AnimateHeight from "react-animate-height";

const BillingAddress = () => {
  const [selectedOption, setSelectedOption] = useState<string>("py11");

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.id);
  };

  return (
    <div className="brn4 p-3 p-md-5 rounded">
      <h5 className="fs-six fw-medium n5-color mb-3 mb-md-5">
        Billing address
      </h5>
      <div className="d-flex flex-column gap-2 gap-md-3">
        <div className="radio-wrapper position-relative">
          <div
            className={`radioBtn active d-flex gap-2 align-items-center brn4 px-2 px-md-3 rounded w-100 ${
              selectedOption === "py11" ? "radio-active-bg" : ""
            }`}
          >
            <input
              type="radio"
              required
              className="billing brn4 p-3 n5-color my-2 my-md-3 w-max"
              id="py11"
              name="billing"
              defaultChecked
              onChange={handleOptionChange}
            />
            <label
              htmlFor="py11"
              className="cursor-pointer n5-color py-1 py-md-2 w-100"
            >
              Same as shipping address
            </label>
          </div>
          <div className="radio-content rounded"></div>
        </div>
        <div className="radio-wrapper position-relative">
          <div
            className={`radioBtn d-flex gap-2 align-items-center brn4 px-2 px-md-3 rounded w-100 ${
              selectedOption === "py22" ? "radio-active-bg" : ""
            }`}
          >
            <input
              type="radio"
              required
              className="billing brn4 p-3 n5-color my-2 my-md-3 w-max"
              id="py22"
              name="billing"
              onChange={handleOptionChange}
            />
            <label
              htmlFor="py22"
              className="cursor-pointer n5-color py-1 py-md-2 w-100"
            >
              Use a different billing address
            </label>
          </div>
          <AnimateHeight
            duration={500}
            height={selectedOption === "py22" ? "auto" : 0}
          >
            <div className="radio-content p-3 rounded bgn2-color">
              <SelectCountry />
              <div className="d-flex flex-wrap flex-xxl-nowrap align-items-center gap-2 gap-md-3 my-2 my-md-3 my-2 my-md-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="brn4 p-3 n5-color bgn1-color"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  className="brn4 p-3 n5-color bgn1-color"
                />
              </div>
              <input
                type="text"
                placeholder="Company (optional)"
                className="brn4 p-3 n5-color my-2 my-md-3 bgn1-color"
              />
              <input
                type="text"
                placeholder="Address"
                required
                className="brn4 p-3 n5-color my-2 my-md-3 bgn1-color"
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="brn4 p-3 n5-color my-2 my-md-3 bgn1-color"
              />
              <div className="d-flex flex-wrap flex-xxl-nowrap align-items-center gap-2 gap-md-3 my-2 my-md-3 my-2 my-md-3">
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="brn4 p-3 n5-color bgn1-color"
                />
                <input
                  type="text"
                  placeholder="Postal Code (optional)"
                  className="brn4 p-3 n5-color bgn1-color"
                />
              </div>
              <input
                type="number"
                placeholder="Phone"
                required
                className="brn4 p-3 n5-color my-2 my-md-3 bgn1-color"
              />
            </div>
          </AnimateHeight>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
