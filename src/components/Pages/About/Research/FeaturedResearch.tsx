"use client";

import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import FadeDown from "@/components/motionEffect/FadeDown";
import ProductCard from "@/components/Pages/Product/ProductCard";
import { productsData } from "../../../../../public/data/AllData";

const featuredIds = [1, 2, 3];

const FeaturedResearch = () => {
  const featuredPublications = productsData.filter(({ id }) =>
    featuredIds.includes(id)
  );

  return (
    <section className="pt-120 pb-120 br-bottom-n3 position-relative" style={{ zIndex: 1 }}>
      <div className="glass-background"></div>
      <style jsx>{`
        .glass-background {
          position: absolute;
          inset: 0;
          background: rgba(var(--n2), 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(var(--p1), 0.8);
          border-bottom: 1px solid rgba(var(--p1), 0.8);
          z-index: -1;
        }
        .glass-background::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(var(--p1), 0.02) 0%,
            rgba(var(--p1), 0.05) 100%
          );
          pointer-events: none;
        }
      `}</style>

      <div className="container">
        <FadeDown>
          <div className="d-flex gap-3 flex-wrap flex-xxl-nowrap justify-content-between align-items-end mb-8 mb-md-15">
            <div className="section-heading">
              <div className="d-flex align-items-center gap-2">
                <div className="title-line"></div>
                <h2 className="display-four n5-color fw-semibold">
                  Featured Research
                </h2>
              </div>
              <p className="fs-seven n4-color mt-2 mt-md-4">
                Selected publications in medical AI and clinical impact.
              </p>
            </div>
            <Link
              href="/research"
              className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 text-nowrap"
            >
              <PiArrowRight />
              View All Research
            </Link>
          </div>
        </FadeDown>

        <div className="d-flex flex-column gap-4 gap-md-6">
          {featuredPublications.map(({ id, img, title, des, price }) => (
            <ProductCard
              key={id}
              id={id}
              img={img}
              title={title}
              des={des}
              price={price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedResearch;
