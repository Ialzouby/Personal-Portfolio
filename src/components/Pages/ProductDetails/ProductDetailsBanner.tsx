import Image from "next/image";
import product from "@/../public/images/react-dashboard.png";

const ProductDetailsBanner = () => {
  return (
    <section className="pt-120 mt-10 mt-lg-0">
      <div className="row g-6 g-sm-12 g-xl-20 align-items-center justify-content-between">
        <div className="col-xl-6">
          <h2 className="fs-two n4-color">React Dashboard Template</h2>
          <p className="n3-color fs-six mt-3 mt-xl-6">
            Embark on a journey through the ever-evolving landscape of software
            development. Unlock the full potential of your data with this
            powerful React dashboard template. Tailored for developers and
            businesses, this template offers a seamless blend of functionality
            and design. Customize it to fit your needs and start making
            data-driven decisions with ease.
          </p>
          <div className="d-flex align-items-center gap-3 gap-md-4 mt-5 mt-xl-10">
            <span className="fs-five fw-semibold n5-color">$120.00 USD</span>
            <button
              type="button"
              className="p-btn bg1-color p-3 rounded n11-color"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="col-xl-6 d-flex align-items-center justify-content-center">
          <div className="overflow-hidden">
            <Image src={product} alt="..." className="product-details-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsBanner;
