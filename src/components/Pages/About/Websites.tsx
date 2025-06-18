"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "@/app/globals.css";

// Images
import site1 from "@/../public/images/websites/website1.png";
import site2 from "@/../public/images/websites/website2.png";
import site3 from "@/../public/images/websites/website3.png";
import site4 from "@/../public/images/websites/website15.png";
import site5 from "@/../public/images/websites/website5.png";
import site6 from "@/../public/images/websites/website6.png";
import site9 from "@/../public/images/websites/website9.png";
import site10 from "@/../public/images/websites/website10.png";
import site11 from "@/../public/images/websites/website11.png";
import site12 from "@/../public/images/websites/website12.png";
import site13 from "@/../public/images/websites/website13.png";
import site14 from "@/../public/images/websites/website14.png";
import site15 from "@/../public/images/websites/website4.png";



const websiteImages = [
  {image:site1, link:"https://ecmo.up.railway.app/"}, 
{image:site2, link:"https://bamm.up.railway.app/dashboard"}, 
{image:site3, link:"https://omar-auto.up.railway.app/"}, 
{image:site4, link:"https://ai-demo.up.railway.app/"}, 
{image:site5, link:"https://buzzprints.up.railway.app/"}, 
{image:site6, link:"https://unityvision.up.railway.app/"}, 
{image:site9, link:"https://unityyconnect.up.railway.app/"}, 
{image:site10, link:"https://www.campusdev.link/"}, 
{image:site11, link:"https://sonicsounds.up.railway.app/Home.html"}, 
{image:site12, link:"https://ai4health-production.up.railway.app/"}, 
{image:site13, link:"https://technolab.up.railway.app/"}, 
{image:site14, link:"https://gitscan.up.railway.app/"}, 
{image:site15, link:"https://swiftsign.up.railway.app/"} ];

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
{websiteImages.map(({ image, link }, index) => (
  <a
    key={index}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="gallery-item"
    style={{ minWidth: "320px", height: "180px" }}
  >
    <div className="gallery-item__wrapper">
      <Image
        src={image}
        alt={`Website ${index + 1}`}
        fill
        style={{ objectFit: "cover" }}
        className="gallery-item__image"
      />
    </div>
  </a>
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
