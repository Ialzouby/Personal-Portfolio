import SelectCountry from "./SelectCountry";

const Delivery = () => {
  return (
    <div className="brn4 p-3 p-md-5 rounded">
      <h5 className="fs-six fw-medium n5-color mb-3 mb-md-5">Delivery</h5>
      <SelectCountry />

      <div className="d-flex flex-wrap flex-xxl-nowrap align-items-center gap-2 gap-md-3 my-2 my-md-3 my-2 my-md-3">
        <input
          type="text"
          placeholder="First Name"
          className="brn4 p-3 n5-color"
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          className="brn4 p-3 n5-color"
        />
      </div>
      <input
        type="text"
        placeholder="Company (optional)"
        className="brn4 p-3 n5-color my-2 my-md-3"
      />
      <input
        type="text"
        placeholder="Address"
        required
        className="brn4 p-3 n5-color my-2 my-md-3"
      />
      <input
        type="text"
        placeholder="Apartment, suite, etc. (optional)"
        className="brn4 p-3 n5-color my-2 my-md-3"
      />
      <div className="d-flex flex-wrap flex-xxl-nowrap align-items-center gap-2 gap-md-3 my-2 my-md-3 my-2 my-md-3">
        <input
          type="text"
          placeholder="City"
          required
          className="brn4 p-3 n5-color"
        />
        <input
          type="text"
          placeholder="Postal Code (optional)"
          className="brn4 p-3 n5-color"
        />
      </div>
      <input
        type="number"
        placeholder="Phone"
        required
        className="brn4 p-3 n5-color my-2 my-md-3"
      />
      <div className="d-flex align-items-center gap-2">
        <input type="checkbox" id="check1" className="cursor-pointer fs-six" />
        <label
          htmlFor="check1"
          className="n4-color fs-eight cursor-pointer d-block mt-1"
        >
          Save this information for next time
        </label>
      </div>
    </div>
  );
};

export default Delivery;
