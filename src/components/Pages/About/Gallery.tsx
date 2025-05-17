"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/autoplay";

import img1 from "@/../public/images/g1.png";
import img2 from "@/../public/images/g2.png";
import img3 from "@/../public/images/g3.png";
import img4 from "@/../public/images/project4.png";
import img5 from "@/../public/images/project5.png";
import img6 from "@/../public/images/project6.png";
import img7 from "@/../public/images/project7.png";
import img8 from "@/../public/images/g8.png";
import img9 from "@/../public/images/g9.png";
import img10 from "@/../public/images/project10.png";
import img11 from "@/../public/images/project11.png";
import img12 from "@/../public/images/g12.png";
import img13 from "@/../public/images/project7.png";
import img14 from "@/../public/images/project8.jpeg";
import img15 from "@/../public/images/project9.png";

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8,
  img9, img10, img11, img12, img13, img14, img15,
];

const Gallery = () => {
  return (
    <section className="pt-120 pb-120">
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

        <Swiper
          modules={[Autoplay, Grid]}
          spaceBetween={28}
          slidesPerView={3}
          grid={{ rows: 2, fill: "row" }}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={2500}
          allowTouchMove={true}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="gallery-card">
                <Image
                  src={img}
                  alt={`gallery-${index}`}
                  width={300}
                  height={170}
                  className="gallery-img"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
