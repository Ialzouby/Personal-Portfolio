"use client";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { testimonials } from "../../../../public/data/AllData";

const PortfolioTes = () => {
  return (
    <div className="mt-8 mt-md-15">
      <Swiper
        spaceBetween={30}
        speed={2500}
        loop={true}
        pagination={{
          el: ".swiper-pagination",
          type: "bullets",
          bulletClass: "swiper-custom-bullet",
          bulletActiveClass: "swiper-custom-bullet-active",
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
        }}
        modules={[Autoplay]}
      >
        {testimonials.map(
          ({
            id,
            img,
            name,
            des,
          }: {
            id: number;
            img: StaticImageData;
            name: string;
            des: string;
          }) => (
            <SwiperSlide key={id}>
              <div
  className="p-4 p-md-5 rounded-4"
  style={{
    background: "rgb(245, 245, 255)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
  }}

  onMouseEnter={(e) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.boxShadow = "0 12px 36px rgba(0, 0, 0, 0.2)";
    el.style.background = "rgb(250, 250, 255)";
  }}
  onMouseLeave={(e) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
    el.style.background = "rgb(245, 245, 255)";
  }}
  
>

                <div className="d-flex gap-1 mb-2 mb-md-3">
                  <i className="ph-fill ph-star y1-color fs-six"></i>
                  <i className="ph-fill ph-star y1-color fs-six"></i>
                  <i className="ph-fill ph-star y1-color fs-six"></i>
                  <i className="ph-fill ph-star y1-color fs-six"></i>
                  <i className="ph-fill ph-star y1-color fs-six"></i>
                </div>
                <p className="n4-color fs-six">{des}</p>
                <div className="d-flex gap-3 align-items-center mt-4 mt-md-7">
                  <Image
                    src={img}
                    alt="testimonial"
                    className="testimonial_img"
                  />

                  <span className="fs-eight d-block n5-color">{name}</span>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
        <div className="relative mt-15">
          <div className="swiper-pagination d-flex allign-items-center justify-content-center gap-2"></div>
        </div>
        <div className="relative mt-15">
          <div className="swiper-pagination d-flex allign-items-center justify-content-center gap-2"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default PortfolioTes;
