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
          <div className="p-5 d-flex flex-column" style={{ flex: "1 1 auto" }}>
            <div className="d-flex align-items-center justify-content-between mb-3" style={{ flex: "0 0 auto" }}>
              <span className="px-3 py-1 border rounded-pill n4-color fs-nine fw-medium">{tag}</span>
              <span className="n4-color fs-eight">{date}</span>
            </div>

            <h4
              className="blog-title fs-five n5-color fw-semibold mb-2"
              style={{
                flex: "0 0 auto",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.4",
              }}
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
