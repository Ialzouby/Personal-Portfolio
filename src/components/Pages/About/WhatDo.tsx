import Image, { StaticImageData } from "next/image";
import { PiArrowRight } from "react-icons/pi";
import { services } from "../../../../public/data/AllData";
import js from "@/../public/images/js.png";
import angular from "@/../public/images/angular.png";
import react from "@/../public/images/react.png";
import vue from "@/../public/images/vue.png";
import node from "@/../public/images/node.png";
import python from "@/../public/images/python.png";
import php from "@/../public/images/php.png";
import npm from "@/../public/images/npm.png";
import gulp from "@/../public/images/gulp.png";
import grunt from "@/../public/images/grunt.png";
import html from "@/../public/images/html.png";
import css from "@/../public/images/css.png";
import sass from "@/../public/images/sass.png";
import less from "@/../public/images/less.png";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";

const WhatDo = () => {
  return (
    <section className="pt-120 pb-120">
      <div className="container">
        <FadeDown>
          <div className="d-flex gap-3 flex-wrap flex-xxl-nowrap justify-content-between align-items-end">
            <div className="section-heading">
              <div className="d-flex align-items-center gap-2">
                <div className="title-line"></div>
                <h2 className="display-four n5-color fw-semibold">What I do</h2>
              </div>
              <p className="fs-seven n4-color mt-2 mt-md-4">
              I engineer AI systems that simulate human health — combining motion modeling, clinical data, and infrastructure. These areas together power my work in real-time digital twins and medical AI.
              </p>
            </div>
            <Link
              href="/resume"
              className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 h-100 text-nowrap"
            >
              <PiArrowRight /> My Experiences
            </Link>
          </div>
        </FadeDown>

        <div className="row g-3 g-md-6 pt-60">
          {services.map(
            ({
              id,
              title,
              des,
              imgs,
            }: {
              id: number;
              title: string;
              des: string;
              imgs: StaticImageData[];
            }) => (
              <div
                key={id}
                className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3"
              >
                <FadeDown>
                  <div className="service-card px-4 px-lg-8 py-5 py-lg-10">
                    <div className="d-flex align-items-center gap-3">
                      {imgs.map((img, idx) => (
                        <div key={idx}>
                          <Image src={img} alt="..." className="service-icon" />
                        </div>
                      ))}
                    </div>
                    <h4 className="fs-six n5-color fw-medium mt-3 mt-md-6 mb-2 mb-md-3">
                      {title}
                    </h4>
                    <p className="fs-seven n4-color">{des}</p>
                  </div>
                </FadeDown>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default WhatDo;
