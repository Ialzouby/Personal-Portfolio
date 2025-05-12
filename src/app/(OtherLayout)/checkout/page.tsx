import Delivery from "@/components/Pages/Checkout/Delivery";
import Shipping from "@/components/Pages/Checkout/Shipping";
import Payment from "@/components/Pages/Checkout/Payment";
import BillingAddress from "@/components/Pages/Checkout/BillingAddress";
import ProductListCard from "@/components/Pages/Checkout/ProductListCard";
import Footer from "@/components/Shared/Footer/Footer";
import { modalProductsData } from "../../../../public/data/AllData";

const Checkout = () => {
  return (
    <div>
      <section className="pt-120 pb-120 mt-10 mt-lg-0">
        <div className="container">
          <div className="row g-6 g-xxl-12">
            <div className="col-lg-6 order-2">
              <form className="d-flex flex-column gap-4 gap-md-8">
                <div className="brn4 p-3 p-md-5 rounded">
                  <h5 className="fs-six fw-medium n5-color mb-3 mb-md-5">
                    Contact
                  </h5>
                  <input
                    type="text"
                    placeholder="Email or mobile number"
                    required
                    className="brn4 p-3 n5-color mb-2 mb-md-3"
                  />
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      id="check"
                      className="cursor-pointer fs-six"
                    />
                    <label
                      htmlFor="check"
                      className="n4-color fs-eight cursor-pointer"
                    >
                      Email me with news and offers
                    </label>
                  </div>
                </div>
                <Delivery />
                <Shipping />
                <Payment />
                <BillingAddress />

                <button className="p-btn bg1-color w-100 py-3 py-md-4">
                  Complete Order
                </button>
              </form>
            </div>

            <div className="col-lg-6 order-1 order-lg-2">
              <div className="bgn2-color p-3 p-sm-6 p-md-10 h-100 br-left-n4 rounded">
                <div className="checkout-right brn4 p-3 p-md-5 rounded">
                  {modalProductsData.map(({ id, img, title, price }) => (
                    <ProductListCard
                      key={id}
                      img={img}
                      title={title}
                      price={price}
                    />
                  ))}

                  <form className="d-flex flex-wrap flex-sm-nowrap flex-lg-wrap flex-xl-nowrap align-items-center gap-2 mt-3 mt-md-6">
                    <input
                      type="text"
                      className="brn4 p-3 n5-color"
                      placeholder="Discount code"
                    />
                    <button className="p-3 bg1-color rounded n11-color">
                      Apply
                    </button>
                  </form>
                  <div className="mt-3 mt-md-6">
                    <span className="d-flex align-items-center gap-2 justify-content-between mb-1">
                      <span className="n5-color">Subtotal:</span>
                      <span className="n5-color">$220.00 USD</span>
                    </span>
                    <span className="d-flex align-items-center gap-2 justify-content-between">
                      <span className="n5-color">Shipping:</span>
                      <span className="n5-color">Free</span>
                    </span>
                    <span className="line-divider"></span>
                    <span className="d-flex align-items-center gap-2 justify-content-between">
                      <span className="fw-medium fs-five n5-color">Total:</span>
                      <span className="n5-color fw-medium">$220.00 USD</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;
