"use client";
import Image from "next/image";
import Link from "next/link";
import blog1 from "@/../public/images/blog1.gif";
import blog2 from "@/../public/images/blog2.jpg";
import blog3 from "@/../public/images/blog3.png";
import {
  PiCaretDoubleLeft,
  PiCaretDoubleRight,
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiPlayFill,
  PiXLogo,
} from "react-icons/pi";
import Comments from "@/components/Pages/BlogDetails/Comments";
import LeaveReply from "@/components/Pages/BlogDetails/LeaveReply";
import FadeDown from "@/components/motionEffect/FadeDown";
import Footer from "@/components/Shared/Footer/Footer";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import { useState } from "react";

const BlogDetails = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <section className="blog-details-section pt-120 pb-120 mt-10 mt-lg-0">
        <div className="container">
          <FadeDown>
            <div className="mb-8 mb-md-15">
              <h3 className="n5-color fs-one">
                Computer Algorithm to Rescue Donation After Circulatory Death (DCD) Organs
              </h3>
              <p className="n3-color fs-eight mt-3">
                Published <span className="n4-color">2</span> days ago · <span className="n4-color">5</span> min read
              </p>
              <div className="my-5 overflow-hidden">
                <Image src={blog2} alt="AI Organ Donation" className="blog-details-img" />
              </div>
              <p className="details-description n5-color fs-eight">
                Only 6–7% of patients who qualified to donate organs were approached for donation at this quaternary care center.
                Potentially contributory are inefficiencies in occupied intensive care unit staff making phone calls to the OPO to initiate donor approach.
                Our findings endorse an algorithm for automated donor evaluation and referral as a feasible solution.
              </p>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="mb-8 mb-md-15">
              <h3 className="details-description n5-color fs-two">Background</h3>
              <p className="details-description n5-color fs-eight my-3 my-md-5">
                Organ transplantation is an impactful use-case for AI. We hypothesize that organs are being missed by donation after circulatory death (DCD)
                workflows due to inefficiencies and underuse of ex-vivo perfusion systems. This study quantifies how many thoracic organ donors are being missed
                and proposes a computer algorithm to address the gap.
              </p>
              <div className="overflow-hidden">
                <Image src={blog3} alt="Data Chart" className="blog-details-img" />
              </div>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="details-description mb-8 mb-md-15">
              <h3 className="n5-color fs-two">Methods</h3>
              <p className="n5-color fs-eight my-3 my-md-5">
                This study analyzed 2,233 deaths at a medical center between June 2020 and June 2022. Exclusion criteria were used to identify
                potential heart/lung donors. These were cross-referenced with OPO data to find missed evaluations.
                Interviews with ICU staff revealed workflow challenges and informed the algorithm’s design.
              </p>
              <ul className="ps-4 ps-md-8">
                <li className="n4-color fs-seven mb-3">Cross-referenced 2233 deaths with OPO referral data.</li>
                <li className="n4-color fs-seven mb-3">Identified 265 cardiac and 280 lung-qualified donors.</li>
                <li className="n4-color fs-seven">Only 18 patients were approached for transplant.</li>
              </ul>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="details-description mb-8 mb-md-15 px-8 px-md-15 py-5 py-md-10 bgn2-color br-left-p1">
              <h4 className="n5-color fs-five fw-medium">
                “Programming is an extremely creative profession. It's logic-based creativity.”
              </h4>
              <div className="d-flex gap-2 align-items-center mt-3">
                <div className="line3"></div>
                <span className="n4-color fs-eight">– John Romero</span>
              </div>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="mb-8 mb-md-15">
              <h3 className="details-description n5-color fs-two">Conclusion</h3>
              <p className="details-description n5-color fs-eight my-3 my-md-5">
                Optimizing donor referral workflow could exponentially increase transplant success. Our findings endorse
                a computer algorithm that automates evaluation and referral. Future studies will implement and clinically validate
                this system to reduce missed opportunities and save lives.
              </p>
              <div className="overflow-hidden position-relative">
                <Image src={blog1} alt="Video" className="blog-details-img" />
                <div className="wrapper">
                  <div className="video-main">
                    <div className="promo-video">
                      <div className="waves-block">
                        <div className="waves wave-1"></div>
                        <div className="waves wave-2"></div>
                        <div className="waves wave-3"></div>
                      </div>
                    </div>
                    <span onClick={() => setOpen(true)} className="video cursor-pointer">
                      <PiPlayFill />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="mb-8 mb-md-15 py-4 py-md-8 brn4-y">
              <div className="d-flex flex-wrap justify-content-between gap-4">
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <h4 className="fs-five fw-semibold n5-color">Tags:</h4>
                  <Link href="#" className="bgn2-color n4-color py-2 px-4 rounded-pill brn4">AI</Link>
                  <Link href="#" className="bgn2-color n4-color py-2 px-4 rounded-pill brn4">Healthcare</Link>
                  <Link href="#" className="bgn2-color n4-color py-2 px-4 rounded-pill brn4">Transplant</Link>
                  <Link href="#" className="bgn2-color n4-color py-2 px-4 rounded-pill brn4">ICU</Link>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Link href="#" className="blog-social-icon brn4"><PiFacebookLogo /></Link>
                  <Link href="#" className="blog-social-icon brn4"><PiInstagramLogo /></Link>
                  <Link href="#" className="blog-social-icon brn4"><PiXLogo /></Link>
                  <Link href="#" className="blog-social-icon brn4"><PiLinkedinLogo /></Link>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3 mt-6">
                <Link href="#" className="prev-card d-flex gap-3 p-3 brn4 rounded-3">
                  <Image src={blog3} alt="Previous post" className="prev-img" />
                  <div>
                    <button className="d-flex align-items-center p1-color">
                      <PiCaretDoubleLeft /> Previous
                    </button>
                    <span className="n5-color fw-semibold fs-eight mt-2 d-block">
                      AI for Surgical Risk Prediction Models
                    </span>
                  </div>
                </Link>
                <Link href="#" className="next-card d-flex gap-3 p-3 brn4 rounded-3">
                  <Image src={blog2} alt="Next post" className="prev-img" />
                  <div>
                    <button className="d-flex align-items-center p1-color">
                      Next <PiCaretDoubleRight />
                    </button>
                    <span className="n5-color fw-semibold fs-eight mt-2 d-block">
                      Modeling ICU Outcomes with AI-Powered Digital Twins
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </FadeDown>

          <Comments />
          <LeaveReply />
        </div>
      </section>
      <Footer />

      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="AVHozwCteL4"
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default BlogDetails;
