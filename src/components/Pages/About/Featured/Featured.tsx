import { PiArrowRight } from "react-icons/pi";
import { featureds } from "../../../../../public/data/ProjectData";
import FeaturedCard from "./FeaturedCard";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";

const idsToShow = [1, 2];


const Featured = () => {
  return (
    <section className="pt-120 pb-120 br-bottom-n3">
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
              className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 h-100 text-nowrap"
            >
              <PiArrowRight />
              View Portfolio
            </Link>
          </div>
        </FadeDown>


<div className="row g-6 g-md-10">
  {featureds
    .filter(({ id }) => idsToShow.includes(id))
    .map(({ id, img, tag1, tag2, tag3, title, award }) => (
      <FeaturedCard
        key={id}
        img={img}
        tag1={tag1}
        tag2={tag2}
        tag3={tag3}
        title={title}
        award={award}
      />
    ))}
</div>

      </div>
    </section>
  );
};

export default Featured;
