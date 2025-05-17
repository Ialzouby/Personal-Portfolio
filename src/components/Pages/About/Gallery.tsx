"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import FadeDown from "@/components/motionEffect/FadeDown";

// Images
import img1 from "@/../public/images/project1.png";
import img2 from "@/../public/images/project2.png";
import img3 from "@/../public/images/project3.png";
import img4 from "@/../public/images/project4.png";
import img5 from "@/../public/images/project5.png";
import img6 from "@/../public/images/project6.png";
import img7 from "@/../public/images/project7.png";
import img8 from "@/../public/images/project8.jpeg";
import img9 from "@/../public/images/project9.png";
import img10 from "@/../public/images/project10.jpeg";
import img11 from "@/../public/images/project11.png";
import img12 from "@/../public/images/project12.png";
import img13 from "@/../public/images/project13.png";
import img14 from "@/../public/images/project14.png";
import img15 from "@/../public/images/project15.png";


const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];

const Gallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = 0.5; // px/frame

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
  
    let animationFrameId: number;
  
    const scroll = () => {
      container.scrollLeft += speed;
  
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
  
      animationFrameId = requestAnimationFrame(scroll); // ✅ RECURSE here to loop
    };
  
    // ✅ Start loop
    animationFrameId = requestAnimationFrame(scroll);
  
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  

  const duplicatedImages = [...images, ...images];

  return (
    <section className="pt-120 pb-120">
      <div className="container">
        <FadeDown>
          <div className="section-heading mb-10">
            <div className="d-flex align-items-center gap-2">
              <div className="title-line"></div>
              <h2 className="display-four n5-color fw-semibold">Gallery</h2>
            </div>
            <p className="fs-seven n4-color mt-2 mt-md-4">
              Research, development, and innovation — captured.
            </p>
          </div>
        </FadeDown>

        <div
  ref={scrollRef}
  className="d-flex flex-nowrap overflow-x-scroll hide-scrollbar gap-3"

  style={{
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
    whiteSpace: "nowrap",
    minWidth: "100vw", // ensures overflow if container is too small
  }}
  
        >
          {Array.from({ length: Math.ceil(duplicatedImages.length / 2) }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="d-flex flex-column gap-3 flex-shrink-0"
              style={{
                width: "350px",
                scrollSnapAlign: "start",
              }}
            >
              {duplicatedImages.slice(colIndex * 2, colIndex * 2 + 2).map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`gallery-${colIndex}-${idx}`}
                  className="rounded"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "170px",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
