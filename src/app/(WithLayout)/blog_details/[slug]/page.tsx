"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

import { blogs } from "@/../public/data/BlogData";
import CommentsClient from "@/components/Pages/BlogDetails/CommentsClient";
import FadeDown from "@/components/motionEffect/FadeDown";
import Footer from "@/components/Shared/Footer/Footer";
import {
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
      <section className="pt-120 pb-120 mt-10 mt-lg-0">
        <div className="container">
          <FadeDown>
            <div className="mx-auto" style={{ maxWidth: "850px" }}>
              <h1 className="n5-color fs-one fw-bold mb-3">{blog.title}</h1>
              <p className="n3-color fs-eight mb-4">
                Published {blog.date} · <span className="n4-color">{blog.tag}</span>
              </p>
              <div className="card rounded-4 shadow-sm overflow-hidden mb-5">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  className="w-100"
                  style={{ height: "420px", objectFit: "cover" }}
                />
              </div>
              <p className="n5-color fs-eight lh-lg mb-5">{blog.content}</p>
            </div>
          </FadeDown>

          {blog.sections?.map((section, idx) => (
            <FadeDown key={idx}>
              <div className="mx-auto mb-8 mb-md-15" style={{ maxWidth: "850px" }}>
                {section.heading && (
                  <h3 className="n5-color fs-two fw-semibold mb-4">{section.heading}</h3>
                )}

                {section.text && (
                  <p className="n5-color fs-eight lh-lg mb-5">{section.text}</p>
                )}

                {section.image && (
                  <div className="card rounded-4 shadow-sm overflow-hidden mb-5">
                    <Image
                      src={section.image}
                      alt="..."
                      className="w-100"
                      style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                  </div>
                )}

                {section.bullets && (
                  <div className="card rounded-4 bgn2-color shadow-sm p-4 mb-5">
                    <ul className="mb-0 ps-3">
                      {section.bullets.map((bullet: string, i: number) => (
                        <li key={i} className="n4-color fs-seven mb-2">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.quote && (
                  <blockquote className="bgn2-color br-left-p1 p-4 p-md-5 rounded-4 mb-5">
                    <h4 className="n5-color fs-five fw-medium mb-2">
                      “{section.quote.text}”
                    </h4>
                    <footer className="text-muted fs-eight mt-2">
                      – {section.quote.author}
                    </footer>
                  </blockquote>
                )}

                {section.videoImage && (
                  <div className="card rounded-4 shadow-sm overflow-hidden position-relative mb-5">
                    <Image
                      src={section.videoImage}
                      alt="Video preview"
                      className="w-100"
                      style={{ objectFit: "cover", maxHeight: "400px" }}
                    />
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <button
                        onClick={() => setOpen(true)}
                        className="btn btn-light rounded-circle shadow"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <PiPlayFill size={30} className="ms-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </FadeDown>
          ))}

          <FadeDown>
            <div className="mx-auto py-4 py-md-5 border-top border-bottom" style={{ maxWidth: "850px" }}>
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex flex-wrap gap-2 align-items-center mb-3 mb-md-0">
                  <h5 className="fs-five fw-semibold n5-color mb-0">Tags:</h5>
                  {["AI", "Healthcare", "Transplant", "ICU"].map((tag, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="bgn2-color n4-color py-2 px-3 rounded-pill brn4 fs-eight"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <div className="d-flex gap-3">
                  <Link href="#" className="text-dark fs-five"><PiFacebookLogo /></Link>
                  <Link href="#" className="text-dark fs-five"><PiInstagramLogo /></Link>
                  <Link href="#" className="text-dark fs-five"><PiXLogo /></Link>
                  <Link href="#" className="text-dark fs-five"><PiLinkedinLogo /></Link>
                </div>
              </div>
            </div>
          </FadeDown>

          <div className="mx-auto mt-10" style={{ maxWidth: "850px" }}>
            <CommentsClient slug={String(slug)} />
          </div>
        </div>
      </section>

      <Footer />

      {blog.sections?.some((s) => s.videoId) && (
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 0 }}
          isOpen={isOpen}
          videoId={blog.sections.find((s) => s.videoId)?.videoId}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default BlogDetails;
