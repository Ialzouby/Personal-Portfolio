import FadeDown from "@/components/motionEffect/FadeDown";
import Link from "next/link";
import React from "react";
import { PiArrowRight } from "react-icons/pi";

const NextProject = () => {
  return (
    <section className="next-project pt-120 pb-120">
      <FadeDown>
        <div className="container d-flex gap-3 gap-md-6 flex-wrap justify-content-between align-items-center">
          <div className="next-project-content">
            <h3 className="display-four n11-color fw-semibold mb-2 mb-md-4">
              Let’s Build Something That Matters
            </h3>
            <p className="fs-seven n11-color">
              I’m currently open to research opportunities, internships, and roles focused on medical AI, human modeling, or systems engineering. Let’s connect if you're looking for someone driven to make an impact through real-world AI.
            </p>
          </div>
          <Link
            href="/contact"
            className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 h-100"
          >
            <PiArrowRight />
            Reach out
          </Link>
        </div>
      </FadeDown>
    </section>
  );
};

export default NextProject;

