// === File: components/Gallery.tsx ===
"use client";

import { useState, useRef, useEffect, useCallback } from "react";



import { useMemo } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";


import img1 from "@/../public/images/gallery/g1.png";
import img2 from "@/../public/images/gallery/gallery2.jpg";
import img3 from "@/../public/images/gallery/g17.JPG";
import img4 from "@/../public/images/gallery/g15.JPG";
import img5 from "@/../public/images/gallery/g13.jpg";
import img6 from "@/../public/images/gallery/project6.png";
import img7 from "@/../public/images/gallery/project7.png";
import img8 from "@/../public/images/gallery/project8.jpeg";
import img9 from "@/../public/images/gallery/gallery5.jpg";
import img10 from "@/../public/images/gallery/gallery10.jpg";
import img11 from "@/../public/images/gallery/gallery11.png";
import img12 from "@/../public/images/gallery/p13.JPG";
import img13 from "@/../public/images/gallery/project6.png";
import img14 from "@/../public/images/gallery/gallery12.png";
import img15 from "@/../public/images/gallery/g3.png";
import img16 from "@/../public/images/gallery/g14.jpg";
import img17 from "@/../public/images/gallery/p13.JPG";
import img18 from "@/../public/images/gallery/g16.png";
import img20 from "@/../public/images/gallery/g18.JPG";
import img21 from "@/../public/images/gallery/g19.png";
import img22 from "@/../public/images/gallery/g20.JPG";

const images = [
  img1, img2, img3, img4, img5, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img20, img21, img22
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
  "large",       // img12
  "standard",  // img13
  "standard",  // img14
  "wide",  // img15
  "wide",  // img16
  "standard",  // img17
  "tall",  // img18
  "standard",  // img19
  "wide",  // img20
  "standard",  // img21
  "standard",  // img22
];

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);




  const galleryRef = useRef<HTMLDivElement>(null);
  const [rippleVisible, setRippleVisible] = useState(false);
  const [rippleX, setRippleX] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startLeft: 0 });
  const scrollAnimationRef = useRef<number | null>(null);
  const [thumbWidth, setThumbWidth] = useState(20);
  
  const handleScroll = useCallback(() => {
    const el = galleryRef.current;
    if (!el || isDragging) return;
    
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setThumbLeft(0);
      return;
    }
    
    const scrollRatio = el.scrollLeft / maxScroll;
    const maxThumbMove = el.clientWidth - thumbWidth;
    const newThumbLeft = scrollRatio * maxThumbMove;
    setThumbLeft(Math.max(0, Math.min(newThumbLeft, maxThumbMove)));
  }, [thumbWidth, isDragging]);

  const updateThumbSize = useCallback(() => {
    const el = galleryRef.current;
    if (!el) return;
    
    const containerWidth = el.clientWidth;
    const contentWidth = el.scrollWidth;
    const scrollableWidth = contentWidth - containerWidth;
    
    if (scrollableWidth <= 0) {
      setThumbWidth(containerWidth); // Full width if no scrolling needed
    } else {
      // Calculate thumb width based on visible content ratio
      const visibleRatio = containerWidth / contentWidth;
      const minThumbWidth = 20;
      const maxThumbWidth = containerWidth * 0.8; // Max 80% of container
      const calculatedWidth = Math.max(minThumbWidth, Math.min(maxThumbWidth, containerWidth * visibleRatio));
      setThumbWidth(calculatedWidth);
    }
  }, []);

  const handleThumbClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    setRippleX(clickX);
    setRippleVisible(true);
    setTimeout(() => setRippleVisible(false), 600);
  };

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    // Store the initial mouse position and thumb position
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    dragRef.current.startX = e.clientX;
    dragRef.current.startLeft = thumbLeft;
  }, [thumbLeft]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const el = galleryRef.current;
    if (!el) return;
    
    // Get scrollbar element position
    const scrollbar = el.parentElement?.querySelector('.custom-scrollbar') as HTMLElement;
    if (!scrollbar) return;
    
    const scrollbarRect = scrollbar.getBoundingClientRect();
    const deltaX = e.clientX - dragRef.current.startX;
    const newThumbLeft = Math.max(0, Math.min(dragRef.current.startLeft + deltaX, scrollbarRect.width - thumbWidth));
    
    // Calculate and update scroll position based on thumb position
    const availableScrollbarWidth = scrollbarRect.width - thumbWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    
    if (maxScroll <= 0) return;
    
    const scrollRatio = newThumbLeft / availableScrollbarWidth;
    const targetScrollLeft = scrollRatio * maxScroll;
    
    // Update scroll position - this will trigger handleScroll which updates thumb
    el.scrollLeft = targetScrollLeft;
    
    // Also update thumb position directly for immediate feedback
    setThumbLeft(newThumbLeft);
  }, [isDragging, thumbWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleScrollbarClick = useCallback((e: React.MouseEvent) => {
    if (isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const scrollbarWidth = rect.width;
    
    const el = galleryRef.current;
    if (!el) return;
    
    const availableScrollbarWidth = el.clientWidth - thumbWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    
    if (maxScroll <= 0) return;
    
    // Calculate scroll position based on click position
    const scrollRatio = Math.max(0, Math.min(1, (clickX - thumbWidth / 2) / availableScrollbarWidth));
    const targetScrollLeft = scrollRatio * maxScroll;
    
    // Instant scroll (not smooth) for scrollbar clicks - feels more responsive
    el.scrollLeft = targetScrollLeft;
    
    // Thumb position will update via handleScroll
  }, [isDragging, thumbWidth]);
  
  useEffect(() => {
    updateThumbSize();
    handleScroll(); // set initial position
    
    const el = galleryRef.current;
    if (!el) return;
    
    // Add scroll event listener - passive for better performance
    el.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, updateThumbSize]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: false });
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Update thumb size on window resize
  useEffect(() => {
    const handleResize = () => {
      updateThumbSize();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateThumbSize]);

  
  const imageLayouts = layoutTypes;

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="gallery-section pt-8 pb-20">
      <div className="container">
        <div className="section-heading mb-2">
          <div className="d-flex align-items-center gap-2">
            <div className="title-line"></div>
            <h2 className="display-four n5-color fw-semibold">Gallery</h2>
          </div>
          <p className="fs-seven n4-color mt-2 mt-md-4">
            Research, development, and innovation — captured.
          </p>
        </div>

        <div className="gallery-scroll-wrapper">
  <div className="professional-gallery" ref={galleryRef} onScroll={handleScroll}>
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

  <div className="custom-scrollbar" onClick={handleScrollbarClick}>
<div
  className={`custom-thumb ${isDragging ? 'dragging' : ''}`}
  onMouseDown={handleThumbMouseDown}
  style={{ left: `${thumbLeft}px`, width: `${thumbWidth}px` }}
>
      {rippleVisible && <span className="thumb-ripple" style={{ left: rippleX + "px" }} />}
    </div>
  </div>
</div>

        <Lightbox
  open={lightboxOpen}
  close={() => setLightboxOpen(false)}
  index={selectedImageIndex}
  slides={images.map((img, index) => ({
    src: typeof img === "string" ? img : img.src,
    description: `Gallery image ${index + 1}`,
  }))}
  plugins={[Thumbnails, Captions, Fullscreen]}
  carousel={{ padding: 20, spacing: 20, imageFit: "contain" }}
  thumbnails={{
    position: "bottom",        // or "top"
    width: 90,                 // thumbnail width
    height: 60,                // thumbnail height
    border: 2,
    borderRadius: 8,
    padding: 4,
    gap: 12,
    vignette: true,            // fade edges
    showToggle: false,         // hide toggle button
  }}
/>

      </div>

    </section>
  );
};

export default Gallery;
