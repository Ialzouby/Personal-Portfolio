"use client";

import FadeDown from "@/components/motionEffect/FadeDown";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { PiArrowUpRightBold } from "react-icons/pi";

const FeaturedCard = ({
  img,
  tag1,
  tag2,
  tag3,
  title,
}: {
  img: StaticImageData;
  tag1: string;
  tag2: string;
  tag3: string;
  title: string;
}) => {
  return (
    <div className="col-12 col-md-6 mb-4">
      <FadeDown>
        <div
          className="rounded shadow-sm p-3 h-100 d-flex flex-column justify-content-between featured-card"
          style={{
            background: "rgb(245, 245, 255)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            e.currentTarget.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 .125rem .25rem rgba(0,0,0,.075)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <Link href="/portfolio_details" className="d-block mb-3">
            <div
              className="w-100 rounded overflow-hidden"
              style={{
                maxHeight: "400px",
              }}
            >
              <Image
                src={img}
                alt={title}
                className="w-100 h-auto d-block"
                style={{
                  borderRadius: "10px",
                  objectFit: "contain",
                }}
              />
            </div>
          </Link>

          <div className="mb-2">
            {[tag1, tag2, tag3].map((tag, i) => (
              <span
                key={i}
                className="badge bg-light text-dark me-2 mb-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-start">
            <Link
              href="/portfolio_details"
              className="fw-semibold text-dark text-decoration-none"
            >
              {title}
            </Link>
            <Link
              href="/portfolio_details"
              className="text-dark"
              aria-label="Open"
            >
              <PiArrowUpRightBold size={20} />
            </Link>
          </div>
        </div>
      </FadeDown>
    </div>
  );
};

export default FeaturedCard;
