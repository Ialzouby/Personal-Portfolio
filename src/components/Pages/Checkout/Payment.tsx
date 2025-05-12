"use client";
import { ChangeEvent, useState } from "react";
import AnimateHeight from "react-animate-height";

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState<string>("py1");

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.id);
  };

  return (
    <div className="brn4 p-3 p-md-5 rounded">
      <h5 className="fs-six fw-medium n5-color">Payment</h5>
      <p className="n4-color fs-eight mb-3 mb-md-5">
        All transactions are secure and encrypted.
      </p>

      <div className="d-flex flex-column gap-2 gap-md-3">
        {/* Radio Option 1 */}
        <div className="radio-wrapper position-relative">
          <div
            className={`radioBtn d-flex gap-2 align-items-center brn4 px-2 px-md-3 rounded w-100 ${
              selectedOption === "py1" ? "radio-active-bg" : ""
            }`}
          >
            <input
              type="radio"
              required
              className="payment brn4 p-3 n5-color my-2 my-md-3 w-max"
              id="py1"
              name="pay"
              defaultChecked
              onChange={handleOptionChange}
            />
            <label
              htmlFor="py1"
              className="cursor-pointer n5-color py-1 py-md-2 w-100"
            >
              Cash on Delivery (COD)
            </label>
          </div>
          <AnimateHeight
            duration={500}
            height={selectedOption === "py1" ? "auto" : 0}
          >
            <div className="radio-content p-2 rounded bgn2-color">
              <p className="n5-color text-center">
                Only applicable INSIDE DHAKA CITY
              </p>
            </div>
          </AnimateHeight>
        </div>

        {/* Radio Option 2 */}
        <div className="radio-wrapper position-relative">
          <div
            className={`radioBtn d-flex gap-2 align-items-center brn4 px-2 px-md-3 rounded w-100 ${
              selectedOption === "py2" ? "radio-active-bg" : ""
            }`}
          >
            <input
              type="radio"
              required
              className="payment brn4 p-3 n5-color my-2 my-md-3 w-max"
              id="py2"
              name="pay"
              onChange={handleOptionChange}
            />
            <label
              htmlFor="py2"
              className="cursor-pointer n5-color py-1 py-md-2 w-100"
            >
              Bkash Payment
            </label>
          </div>
          <AnimateHeight
            duration={500}
            height={selectedOption === "py2" ? "auto" : 0}
          >
            <div className="radio-content p-2 rounded bgn2-color">
              <span className="n5-color d-block">
                Pay with your bkash wallet
              </span>
              <span className="n5-color d-block">
                4004911111 - Merchant Account (Make Payment)
              </span>
              <span className="n5-color d-block">
                Put your order ID as reference number
              </span>
            </div>
          </AnimateHeight>
        </div>

        {/* Radio Option 3 */}
        <div className="radio-wrapper position-relative">
          <div
            className={`radioBtn d-flex gap-2 align-items-center brn4 px-2 px-md-3 rounded w-100 ${
              selectedOption === "py3" ? "radio-active-bg" : ""
            }`}
          >
            <input
              type="radio"
              required
              className="payment brn4 p-3 n5-color my-2 my-md-3 w-max"
              id="py3"
              name="pay"
              onChange={handleOptionChange}
            />
            <label
              htmlFor="py3"
              className="cursor-pointer n5-color py-1 py-md-2 w-100"
            >
              Bank Transfer - BEFTN/NPSB
            </label>
          </div>
          <AnimateHeight
            duration={500}
            height={selectedOption === "py3" ? "auto" : 0}
          >
            <div className="radio-content p-2 rounded bgn2-color">
              <span className="n5-color d-block">
                You can transfer the invoice amount to following Bank Account:
              </span>
              <span className="n5-color d-block">
                Bank Name: City Bank Bangladesh
              </span>
              <span className="n5-color d-block">
                Account Name: GRID Ventures Ltd
              </span>
              <span className="n5-color d-block">
                Account Number: 1003615365001
              </span>
              <span className="n5-color d-block">
                Branch Name: Banani Branch
              </span>
              <span className="n5-color d-block">
                Please call us at 014044-330 to confirm the payment after the
                transfer.
              </span>
            </div>
          </AnimateHeight>
        </div>

        {/* Radio Option 4 */}
        <div className="radio-wrapper position-relative">
          <div
            className={`radioBtn d-flex gap-2 align-items-center brn4 px-2 px-md-3 rounded w-100 ${
              selectedOption === "py4" ? "radio-active-bg" : ""
            }`}
          >
            <input
              type="radio"
              required
              className="payment brn4 p-3 n5-color my-2 my-md-3 w-max"
              id="py4"
              name="pay"
              onChange={handleOptionChange}
            />
            <label
              htmlFor="py4"
              className="cursor-pointer n5-color py-1 py-md-2 w-100"
            >
              Cash On Delivery - Outside Dhaka
            </label>
          </div>
          <AnimateHeight
            duration={500}
            height={selectedOption === "py4" ? "auto" : 0}
          >
            <div className="radio-content p-2 rounded bgn2-color">
              <p className="n5-color d-block">
                Minimum 10% of total invoice amount + shipping charge needs to
                be paid in Advance.
              </p>
            </div>
          </AnimateHeight>
        </div>

        {/* Radio Option 5 */}
        <div className="radio-wrapper position-relative">
          <div
            className={`radioBtn d-flex gap-2 align-items-center brn4 px-2 px-md-3 rounded w-100 ${
              selectedOption === "py5" ? "radio-active-bg" : ""
            }`}
          >
            <input
              type="radio"
              required
              className="payment brn4 p-3 n5-color my-2 my-md-3 w-max"
              id="py5"
              name="pay"
              onChange={handleOptionChange}
            />
            <label
              htmlFor="py5"
              className="cursor-pointer n5-color py-1 py-md-2 w-100"
            >
              EMI - Credit Card
            </label>
          </div>
          <AnimateHeight
            duration={500}
            height={selectedOption === "py5" ? "auto" : 0}
          >
            <div className="radio-content p-2 rounded bgn2-color">
              <span className="n5-color d-block">
                EMI available for following bank credit card:
              </span>
              <span className="n5-color d-block">Eastern Bank Limited</span>
              <span className="n5-color d-block">
                LankaBangla Finance Limited
              </span>
              <span className="n5-color d-block">United Commercial Bank</span>
              <span className="n5-color d-block">Dutch Bangla Bank Ltd.</span>
              <span className="n5-color d-block">BRAC Bank</span>
            </div>
          </AnimateHeight>
        </div>
      </div>
    </div>
  );
};

export default Payment;
