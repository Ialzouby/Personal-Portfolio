"use client";

import { PiSealCheckFill } from "react-icons/pi";
import ProductCard from "@/components/Pages/Product/ProductCard";
import { productsData } from "../../../../public/data/AllData";
import CartModal from "@/components/Shared/Modal/CartModal";
import ProductDetailsBanner from "@/components/Pages/ProductDetails/[id]/ProductDetailsBanner";
import ProductDetailsDescriptiion from "@/components/Pages/ProductDetails/[id]/ProductDetailsDescription";
import Footer from "@/components/Shared/Footer/Footer";

const cardsData = [
  {
    id: 1,
    heading: "Hands-On Creativity Challenges",
  },
  {
    id: 2,
    heading: "Personal Project Guidance",
  },
  {
    id: 3,
    heading: "Interactive Exercises and Coding Playground",
  },
  {
    id: 4,
    heading: "Inspiration Hub - Stories and Interviews",
  },
];

const ProductDetails = () => {
  return (
    <div className="container">
      <ProductDetailsBanner />
      <section className="pt-60">
        <div className="row g-3 g-md-6">
          {cardsData.map(({ id, heading }: { id: number; heading: string }) => (
            <div key={id} className="col-sm-6 col-xl-4 col-xxl-3">
              <div className="bgn2-color brn4 p-3 p-md-5 rounded">
                <span className="fs-five p1-color d-block">
                  <PiSealCheckFill />
                </span>
                <span className="fs-five fw-medium n5-color mt-1 mt-md-2">
                  {heading}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProductDetailsDescriptiion />

      <section className="pb-120">
        <h3 className="fs-two n5-color mb-5 mb-md-10">
          Check out similar products
        </h3>
<div className="d-flex flex-column gap-4">
  {productsData.slice(3, 6).map(({ id, img, title, des, price }) => (
    <ProductCard
      key={id}
      img={img}
      title={title}
      des={des}
      price={price}
    />
  ))}
</div>

      </section>
      <Footer />
      <CartModal />
    </div>
  );
};

export default ProductDetails;
