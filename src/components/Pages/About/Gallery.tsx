// === File: components/Gallery.tsx ===
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import img1 from "@/../public/images/g1.png";
import img2 from "@/../public/images/gallery2.jpg";
import img3 from "@/../public/images/g3.png";
import img4 from "@/../public/images/g12.png";
import img5 from "@/../public/images/p13.JPG";
import img6 from "@/../public/images/project6.png";
import img7 from "@/../public/images/project7.png";
import img8 from "@/../public/images/project8.jpeg";
import img9 from "@/../public/images/gallery5.jpg";
import img10 from "@/../public/images/gallery10.jpg";
import img11 from "@/../public/images/gallery11.png";
import img12 from "@/../public/images/g12.png";
import img13 from "@/../public/images/p13.JPG";
import img14 from "@/../public/images/gallery12.png";

const images = [
  img1, img2, img3, img4, img5, img7, img8, img9, img10, img11, img12, img13, img14
];

// Custom layout pattern to control order explicitly
const layoutTypes = [
  "tall",      // img1
  "standard",  // img2
  "wide",      // img3
  "standard",  // img4
  "large",     // img5
  "standard",  // img7
  "tall",      // img8
  "standard",  // img9
  "wide",      // img10
  "standard",  // img11
  "large"       // img12
];

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageLayouts = layoutTypes;

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="pt-20 pb-20">
      <div className="container">
        <div className="section-heading mb-10">
          <div className="d-flex align-items-center gap-2">
            <div className="title-line"></div>
            <h2 className="display-four n5-color fw-semibold">Gallery</h2>
          </div>
          <p className="fs-seven n4-color mt-2 mt-md-4">
            Research, development, and innovation — captured.
          </p>
        </div>

        <div className="professional-gallery">
          {images.map((img, index) => (
            <div
              key={index}
              className={`gallery-item gallery-item--${imageLayouts[index]}`}
              onClick={() => openLightbox(index)}
            >
              <div className="gallery-item__wrapper">
                <Image
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="gallery-item__image"
                  style={{ objectFit: "cover" }}
                />
                <div className="gallery-item__overlay">
                  <div className="gallery-item__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.5 10.5L7.5 10.5M10.5 7.5L10.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={images.map((img, index) => ({ src: typeof img === 'string' ? img : img.src }))}
          index={selectedImageIndex}
          carousel={{ padding: '20px', spacing: '20px', imageFit: 'contain' }}
          render={{ buttonPrev: () => null, buttonNext: () => null }}
        />
      </div>
    </section>
  );
};

export default Gallery;
