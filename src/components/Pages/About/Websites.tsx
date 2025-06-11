"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "@/app/globals.css";

// Replace with your actual website images
import site1 from "@/../public/images/project1.png";
import site2 from "@/../public/images/project2.png";
import site3 from "@/../public/images/project3.png";
import site4 from "@/../public/images/project4.png";
import site5 from "@/../public/images/project5.png";
import site6 from "@/../public/images/project6.png";
import site7 from "@/../public/images/project7.png";
import site9 from "@/../public/images/project9.png";


const websiteImages = [site1, site2, site3, site4, site5, site6, site7, site9];

const WebsiteGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

        <div className="website-slider-wrapper overflow-auto pb-2">
          <div className="website-slider d-flex gap-4">
            {websiteImages.map((img, index) => (
              <div
                key={index}
                className="website-slide position-relative rounded overflow-hidden"
                style={{ minWidth: "320px", height: "180px", cursor: "pointer" }}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={img}
                  alt={`Website ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={websiteImages.map(img => ({ src: typeof img === "string" ? img : img.src }))}
          index={selectedImageIndex}
        />
      </div>
    </section>
  );
};

export default WebsiteGallery;
