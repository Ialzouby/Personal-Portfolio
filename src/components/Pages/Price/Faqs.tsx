"use client";
import Image from "next/image";
import light from "@/../public/images/light.png";
import { PiArrowRight, PiMinusBold, PiPlusBold } from "react-icons/pi";
import AnimateHeight from "react-animate-height";
import { frequentlyData } from "../../../../public/data/AllData";
import { useState } from "react";
import FadeDown from "@/components/motionEffect/FadeDown";

const Faqs = () => {
  const [toggle, setToggle] = useState<null | number>(1);

  const handleToggle = (id: number) => {
    if (toggle === id) {
      setToggle(null);
    } else {
      setToggle(id);
    }
  };
  return (
    <section className="pt-120 pb-120">
      <div className="container">
        <FadeDown>
          <div className="section-heading">
            <div className="d-flex align-items-center gap-2">
              <div className="title-line"></div>
              <h2 className="display-four n5-color fw-semibold">
                Have any questions?
              </h2>
            </div>
            <p className="fs-seven n4-color mt-2 mt-md-4">
              You can use this section to address any queries your potential
              clients may have.
            </p>
          </div>
        </FadeDown>
        <div className="row mt-8 mt-md-15 justify-content-between align-items-center gap-3">
          <div className="col-12 col-md-6">
            {frequentlyData.map(
              ({
                id,
                questions,
                answers,
              }: {
                id: number;
                questions: string;
                answers: string;
              }) => (
                <FadeDown key={id}>
                  <div
                    className={`p-4 p-md-8  mb-2 mb-md-4 cursor-pointer ${
                      toggle === id ? "br1" : "brn4"
                    }`}
                    onClick={() => handleToggle(id)}
                  >
                    <div className="question d-flex gap-3 justify-content-between align-items-center rounded-2">
                      <div className="d-flex gap-2 align-items-center">
                        <div
                          className={`${
                            toggle === id
                              ? "faq_icon_width_active"
                              : "faq_icon_width"
                          } d-flex flex-shrink-0 align-items-center justify-content-center 
                        `}
                        >
                          <i
                            className={`${
                              toggle === id ? "n11-color" : "p5-color"
                            }`}
                          >
                            <PiArrowRight />
                          </i>
                        </div>
                        <h3
                          className={`fs-seven fw-medium ${
                            toggle === id ? "p1-color" : "n4-color"
                          }`}
                        >
                          {questions}
                        </h3>
                      </div>
                      <span
                        className={`fs-five ${
                          toggle === id ? "p1-color" : "n4-color"
                        }`}
                      >
                        {toggle === id ? <PiMinusBold /> : <PiPlusBold />}
                      </span>
                    </div>

                    <AnimateHeight
                      duration={500}
                      easing="ease-in-out"
                      height={toggle === id ? "auto" : 0}
                    >
                      <p className="n5-color  font-medium leading-[150%] pt-3 pt-md-5 fs-seven">
                        {answers}
                      </p>
                    </AnimateHeight>
                  </div>
                </FadeDown>
              )
            )}
          </div>
          <div className="col-12 col-md-5">
            <FadeDown>
              <Image src={light} alt="light" />
            </FadeDown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
