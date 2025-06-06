"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

import { blogs } from "@/../public/data/BlogData";
import Comments from "@/components/Pages/BlogDetails/Comments";
import LeaveReply from "@/components/Pages/BlogDetails/LeaveReply";
import FadeDown from "@/components/motionEffect/FadeDown";
import Footer from "@/components/Shared/Footer/Footer";
import {
  PiCaretDoubleLeft,
  PiCaretDoubleRight,
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiPlayFill,
  PiXLogo,
} from "react-icons/pi";

const BlogDetails = () => {
  const { slug } = useParams();
  const [isOpen, setOpen] = useState(false);

  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return <div className="container mt-10">Blog not found.</div>;

  return (
    <div>
      <section className="blog-details-section pt-120 pb-120 mt-10 mt-lg-0">
        <div className="container">
          <FadeDown>
            <div className="mb-8 mb-md-15">
              <h3 className="n5-color fs-one">{blog.title}</h3>
              <p className="n3-color fs-eight mt-3">
                Published {blog.date} · <span className="n4-color">{blog.tag}</span>
              </p>
              <div className="my-5 overflow-hidden">
                <Image src={blog.img} alt={blog.title} className="blog-details-img" />
              </div>
              <p className="details-description n5-color fs-eight">{blog.content}</p>
            </div>
          </FadeDown>

          {blog.sections?.map((section, idx) => (
            <FadeDown key={idx}>
              <div className="mb-8 mb-md-15">
                {section.heading && (
                  <h3 className="details-description n5-color fs-two">{section.heading}</h3>
                )}
                {section.text && (
                  <p className="details-description n5-color fs-eight my-3 my-md-5">{section.text}</p>
                )}
                {section.image && (
                  <div className="overflow-hidden">
                    <Image src={section.image} alt="..." className="blog-details-img" />
                  </div>
                )}
                {section.bullets && (
                  <ul className="ps-4 ps-md-8">
                    {section.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="n4-color fs-seven mb-3">{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.quote && (
                  <div className="details-description mb-8 mb-md-15 px-8 px-md-15 py-5 py-md-10 bgn2-color br-left-p1">
                    <h4 className="n5-color fs-five fw-medium">“{section.quote.text}”</h4>
                    <div className="d-flex gap-2 align-items-center mt-3">
                      <div className="line3"></div>
                      <span className="n4-color fs-eight">– {section.quote.author}</span>
                    </div>
                  </div>
                )}
                {section.videoImage && (
                  <div className="overflow-hidden position-relative">
                    <Image src={section.videoImage} alt="Video" className="blog-details-img" />
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
                )}
              </div>
            </FadeDown>
          ))}

          <FadeDown>
            <div className="mb-8 mb-md-15 py-4 py-md-8 brn4-y">
              <div className="d-flex flex-wrap justify-content-between gap-4">
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <h4 className="fs-five fw-semibold n5-color">Tags:</h4>
                  {["AI", "Healthcare", "Transplant", "ICU"].map((tag, i) => (
                    <Link key={i} href="#" className="bgn2-color n4-color py-2 px-4 rounded-pill brn4">{tag}</Link>
                  ))}
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Link href="#" className="blog-social-icon brn4"><PiFacebookLogo /></Link>
                  <Link href="#" className="blog-social-icon brn4"><PiInstagramLogo /></Link>
                  <Link href="#" className="blog-social-icon brn4"><PiXLogo /></Link>
                  <Link href="#" className="blog-social-icon brn4"><PiLinkedinLogo /></Link>
                </div>
              </div>
              {/* Optional next/previous logic here */}
            </div>
          </FadeDown>

          <Comments />
          <LeaveReply />
        </div>
      </section>
      <Footer />

      {blog.sections?.some(s => s.videoId) && (
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 0 }}
          isOpen={isOpen}
          videoId={blog.sections.find(s => s.videoId)?.videoId}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default BlogDetails;
