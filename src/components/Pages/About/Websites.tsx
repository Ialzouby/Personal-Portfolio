"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "@/app/globals.css";

// Images
import site1 from "@/../public/images/websites/website1.png";
import site2 from "@/../public/images/websites/website2.png";
import site3 from "@/../public/images/websites/website3.png";
import site4 from "@/../public/images/websites/website4.png";
import site5 from "@/../public/images/projects/project5.png";
import site6 from "@/../public/images/projects/project6.png";
import site7 from "@/../public/images/projects/project7.png";
import site9 from "@/../public/images/projects/project9.png";

const websiteImages = [site1, site2, site3, site4, site5, site6, site7, site9];

const WebsiteGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Slider logic
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [rippleVisible, setRippleVisible] = useState(false);
  const [rippleX, setRippleX] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollRatio = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    const maxThumbMove = el.clientWidth - 40; // thumb is 40px
    setThumbLeft(scrollRatio * maxThumbMove);
  };

  const handleThumbClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    setRippleX(clickX);
    setRippleVisible(true);
    setTimeout(() => setRippleVisible(false), 600);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="pt-10 pb-20">
      <div className="container">
        <div className="section-heading mb-8">
          <div className="d-flex align-items-center gap-2">
            <div className="title-line"></div>
            <h2 className="display-four n5-color fw-semibold">Website Showcase</h2>
          </div>
          <p className="fs-seven n4-color mt-2 mt-md-4">
            A few web experiences I've built, live and responsive.
          </p>
        </div>

        {/* === Slider Container === */}
        <div className="gallery-scroll-wrapper">
          <div
            className="professional-gallery d-flex gap-4"
            ref={sliderRef}
            onScroll={handleScroll}
          >
            {websiteImages.map((img, index) => (
              <div
                key={index}
                className="gallery-item"
                style={{ minWidth: "320px", height: "180px", cursor: "pointer" }}
                onClick={() => openLightbox(index)}
              >
                <div className="gallery-item__wrapper">
                  <Image
                    src={img}
                    alt={`Website ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="gallery-item__image"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* === Custom Scrollbar === */}
          <div className="custom-scrollbar">
            <div
              className="custom-thumb"
              onClick={handleThumbClick}
              style={{ left: `${thumbLeft}px` }}
            >
              {rippleVisible && (
                <span
                  className="thumb-ripple"
                  style={{ left: `${rippleX}px` }}
                />
              )}
            </div>
          </div>
        </div>

        {/* === Lightbox === */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={websiteImages.map((img) => ({
            src: typeof img === "string" ? img : img.src,
          }))}
          index={selectedImageIndex}
        />
      </div>
    </section>
  );
};

export default WebsiteGallery;
