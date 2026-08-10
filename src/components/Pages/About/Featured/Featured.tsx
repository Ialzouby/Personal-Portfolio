"use client";
import { PiArrowRight } from "react-icons/pi";
import { featureds } from "../../../../../public/data/ProjectData";
import FeaturedCard from "./FeaturedCard";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";

const idsToShow = [26, 2, 21];


const Featured = () => {
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
        /* Optional: Add a very faint blue gradient overlay to match the "blue tint" perception if p1 is blue */
        .glass-background::before {
           content: "";
           position: absolute;
           inset: 0;
           background: linear-gradient(180deg, rgba(var(--p1), 0.02) 0%, rgba(var(--p1), 0.05) 100%);
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
                  Featured Projects
                </h2>
              </div>
              <p className="fs-seven n4-color mt-2 mt-md-4">
                View more projects!
              </p>
            </div>
            <Link
              href="/portfolio"
              className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 text-nowrap"
            >
              <PiArrowRight />
              Portfolio
            </Link>
          </div>
        </FadeDown>

        <div className="row g-6 g-md-10">
          {featureds
            .filter(Boolean)
            .filter(({ id }) => idsToShow.includes(id))
            .map(({ id, img, tag1, tag2, tag3, title, award, description }) => (
              <FeaturedCard
                key={id}
                id={id}
                img={img}
                tag1={tag1}
                tag2={tag2}
                tag3={tag3}
                title={title}
                award={award as "1st" | "2nd" | "3rd" | undefined}
                description={description}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
