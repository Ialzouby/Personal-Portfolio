"use client";
import Image from "next/image";
import Link from "next/link";
import blog9 from "@/../public/images/blog9.png";
import blog7 from "@/../public/images/blog7.png";
import blog3 from "@/../public/images/blog3.png";
import blog2 from "@/../public/images/blog2.png";
import blog1 from "@/../public/images/blog1.png";
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
import "@/../../node_modules/react-modal-video/scss/modal-video.scss";
import { useState } from "react";

const BlogDetails = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <section className="blog-details-section pt-120 pb-120 mt-10 mt-lg-0">
        <div className="container">
          <FadeDown>
            <div className="mb-8 mb-md-15">
              <div>
                <h3 className="n5-color fs-one">
                  Why Every Developer Should Have A Blog
                </h3>
                <div className="d-flex flex-wrap align-items-center gap-2 gap-md-3 mt-3">
                  <span className="n3-color fs-eight">
                    Published <span className="n4-color">2</span> days ago
                  </span>
                  <ul className="d-flex align-items-center gap-3">
                    <li className="n3-color fs-eight">
                      <span className="n4-color">5</span> min read
                    </li>
                    <li className="n3-color fs-eight">
                      <span className="n4-color">5</span> min read
                    </li>
                  </ul>
                </div>
              </div>
              <div className="my-5 my-md-10 overflow-hidden">
                <Image src={blog9} alt="..." className="blog-details-img" />
              </div>
              <p className="details-description n5-color fs-eight">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim.
              </p>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="mb-8 mb-md-15">
              <h3 className="details-description n5-color fs-two">
                Code Block Example
              </h3>
              <p className="details-description n5-color fs-eight my-3 my-md-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis
                arcu enim urna adipiscing praesent velit viverra sit semper
                lorem eu cursus vel hendrerit elementum morbi curabitur etiam
                nibh justo, lorem aliquet donec sed sit mi dignissim at ante
                massa mattis.
              </p>
              <div className="overflow-hidden">
                <Image src={blog7} alt="..." className="blog-details-img" />
              </div>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="details-description mb-8 mb-md-15">
              <h3 className="n5-color fs-two">Typography</h3>
              <p className="n5-color fs-eight my-3 my-md-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis
                arcu enim urna adipiscing praesent velit viverra sit semper
                lorem eu cursus vel hendrerit elementum morbi curabitur etiam
                nibh justo, lorem aliquet donec sed sit mi dignissim at ante
                massa mattis.
              </p>
              <h5 className="n5-color fs-four fw-semibold mb-3 mb-md-5">
                Bullet Points:
              </h5>
              <ul className="ps-4 ps-md-8">
                <li className="n4-color fs-seven mb-3">
                  Lorem ipsum dolor sit amet, consectetuer.
                </li>
                <li className="n4-color fs-seven mb-3">
                  Aenean commodo ligula eget dolor.
                </li>
                <li className="n4-color fs-seven">
                  Etiam ultricies nisi vel augue.
                </li>
              </ul>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="details-description mb-8 mb-md-15">
              <h3 className="n5-color fs-two">Quote Example:</h3>
              <p className="n5-color fs-eight my-3 my-md-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis
                arcu enim urna adipiscing praesent velit viverra sit semper
                lorem eu cursus vel hendrerit elementum morbi curabitur etiam
                nibh justo, lorem aliquet donec sed sit mi dignissim at ante
                massa mattis.
              </p>
              <h5 className="n5-color fs-four fw-semibold mb-3 mb-md-5">
                Bullet Points:
              </h5>
              <ul className="ps-4 ps-md-8">
                <li className="n4-color fs-seven mb-3">
                  Lorem ipsum dolor sit amet, consectetuer.
                </li>
                <li className="n4-color fs-seven mb-3">
                  Aenean commodo ligula eget dolor.
                </li>
                <li className="n4-color fs-seven">
                  Etiam ultricies nisi vel augue.
                </li>
              </ul>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="details-description mb-8 mb-md-15 px-8 px-md-15 py-5 py-md-10 bgn2-color br-left-p1">
              <h4 className="n5-color fs-five fw-medium">
                You might not think that programmers are artists, but
                programming is an extremely creative profession. It&apos;s
                logic-based creativity.
              </h4>
              <div className="d-flex gap-2 gap-md-3 align-items-center mt-3 mt-md-6">
                <div className="line3"></div>
                <span className="n4-color fs-eight">John Romero</span>
              </div>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="mb-8 mb-md-15">
              <h3 className="details-description n5-color fs-two">
                Video Example
              </h3>
              <p className="details-description n5-color fs-eight my-3 my-md-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis
                arcu enim urna adipiscing praesent velit viverra sit semper
                lorem eu cursus vel hendrerit elementum morbi curabitur etiam
                nibh justo, lorem aliquet donec sed sit mi dignissim at ante
                massa mattis.
              </p>
              <div className="overflow-hidden position-relative">
                <Image src={blog2} alt="..." className="blog-details-img" />
                <div className="wrapper">
                  <div className="video-main">
                    <div className="promo-video">
                      <div className="waves-block">
                        <div className="waves wave-1"></div>
                        <div className="waves wave-2"></div>
                        <div className="waves wave-3"></div>
                      </div>
                    </div>
                    <span
                      onClick={() => setOpen(true)}
                      className="video cursor-pointer"
                    >
                      <PiPlayFill />
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="details-description n5-color fs-five mt-5 mt-md-10">
                Conclusion
              </h3>
              <p className="details-description n5-color fs-eight mt-3 mt-md-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis
                arcu enim urna adipiscing praesent velit viverra sit semper
                lorem eu cursus vel hendrerit elementum morbi curabitur etiam
                nibh justo, lorem aliquet donec sed sit mi dignissim at ante
                massa mattis.
              </p>
            </div>
          </FadeDown>

          <FadeDown>
            <div className="mb-8 mb-md-15 py-4 py-md-8 brn4-y">
              <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between">
                <div className="d-flex flex-wrap gap-4 gap-md-8 align-items-center">
                  <h4 className="fs-five fw-semibold n5-color">Tag:</h4>
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <Link
                      href="#"
                      className="bgn2-color n4-color py-2 py-md-3 px-3 px-md-5 d-block rounded-pill brn4"
                    >
                      Business
                    </Link>
                    <Link
                      href="#"
                      className="bgn2-color n4-color py-2 py-md-3 px-3 px-md-5 d-block rounded-pill brn4"
                    >
                      Analysis
                    </Link>
                    <Link
                      href="#"
                      className="bgn2-color n4-color py-2 py-md-3 px-3 px-md-5 d-block rounded-pill brn4"
                    >
                      Technology
                    </Link>
                    <Link
                      href="#"
                      className="bgn2-color n4-color py-2 py-md-3 px-3 px-md-5 d-block rounded-pill brn4"
                    >
                      Design
                    </Link>
                    <Link
                      href="#"
                      className="bgn2-color n4-color py-2 py-md-3 px-3 px-md-5 d-block rounded-pill brn4"
                    >
                      Strategy
                    </Link>
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-2 align-items-center">
                  <Link href="#" className="blog-social-icon brn4">
                    <i className=" p1-color">
                      <PiFacebookLogo />
                    </i>
                  </Link>
                  <Link href="#" className="blog-social-icon brn4">
                    <i className="p1-color">
                      <PiInstagramLogo />
                    </i>
                  </Link>
                  <Link href="#" className="blog-social-icon brn4">
                    <i className="ph ph-x-logo p1-color">
                      <PiXLogo />
                    </i>
                  </Link>
                  <Link href="#" className="blog-social-icon brn4">
                    <i className="p1-color">
                      <PiLinkedinLogo />
                    </i>
                  </Link>
                </div>
              </div>

              <div className="d-flex flex-wrap flex-md-nowrap gap-3 gap-md-6 mt-4 mt-md-8">
                <Link
                  href="#"
                  className="prev-card d-flex gap-3 gap-md-6 align-items-center p-3 brn4 rounded-3"
                >
                  <div>
                    <Image src={blog3} alt="..." className="prev-img" />
                  </div>
                  <div>
                    <button className="d-flex gap-1 align-items-center p1-color">
                      <PiCaretDoubleLeft />
                      Previous
                    </button>
                    <span className="n5-color fw-semibold fs-eight mt-2 d-block">
                      7 Great Web Development Languages to Learn this Year
                    </span>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="next-card d-flex gap-3 gap-md-6 align-items-center p-3 brn4 rounded-3"
                >
                  <div>
                    <Image src={blog1} alt="..." className="prev-img" />
                  </div>
                  <div>
                    <button className="d-flex gap-1 align-items-center p1-color">
                      Next
                      <PiCaretDoubleRight />
                    </button>
                    <span className="n5-color fw-semibold fs-eight mt-2 d-block">
                      How to Optimize your Website for Better Performance
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
