"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [rippleVisible, setRippleVisible] = useState(false);
  const [rippleX, setRippleX] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startLeft: 0 });
  const scrollAnimationRef = useRef<number | null>(null);
  const [thumbWidth, setThumbWidth] = useState(20);

  const handleScroll = useCallback(() => {
    const el = sliderRef.current;
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
    const el = sliderRef.current;
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
    
    const el = sliderRef.current;
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
    
    const el = sliderRef.current;
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
    
    const el = sliderRef.current;
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
          <div className="custom-scrollbar" onClick={handleScrollbarClick}>
            <div
              className={`custom-thumb ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleThumbMouseDown}
              style={{ left: `${thumbLeft}px`, width: `${thumbWidth}px` }}
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
          slides={websiteImages.map((item) => ({
            src: typeof item.image === "string" ? item.image : item.image.src,
          }))}
          index={selectedImageIndex}
        />
      </div>
    </section>
  );
};

export default WebsiteGallery;
