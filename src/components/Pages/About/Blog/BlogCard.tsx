"use client";

import FadeDown from "@/components/motionEffect/FadeDown";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const BlogCard = ({
  img,
  date,
  tag,
  title,
  slug,
}: {
  img: StaticImageData;
  date: string;
  tag: string;
  title: string;
  slug: string;
}) => {
  return (
    <div className="col-12 col-md-4 mb-4">
      <FadeDown>
        <Link 
          href={`/blog_details/${slug}`} 
          className="blog-card d-flex flex-column h-100 text-decoration-none"
          style={{
            background: "rgb(245, 245, 255)",
            borderRadius: "0.75rem",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            minHeight: "450px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            e.currentTarget.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div 
            className="blog-img overflow-hidden" 
            style={{
              height: "280px",
              flex: "0 0 auto",
            }}
          >
            <Image 
              src={img} 
              alt="blog" 
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-3 d-flex flex-column" style={{ flex: "1 1 auto" }}>
            <div className="d-flex align-items-center gap-3 mb-2 mb-md-3" style={{ flex: "0 0 auto" }}>
              <span className="n4-color fs-eight">{date}</span>
              <span className="p1-color fs-eight">/</span>
              <span className="n4-color fs-eight">{tag}</span>
            </div>
            <h4 
              className="blog-title fs-five n5-color fw-semibold mt-auto" 
              style={{ flex: "0 0 auto" }}
            >
              {title}
            </h4>
          </div>
        </Link>
      </FadeDown>
    </div>
  );
};

export default BlogCard;
