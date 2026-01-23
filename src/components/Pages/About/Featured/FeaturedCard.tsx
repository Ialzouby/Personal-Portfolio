"use client";

import FadeDown from "@/components/motionEffect/FadeDown";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { PiArrowUpRightBold } from "react-icons/pi";

const FeaturedCard = ({
  id,
  img,
  tag1,
  tag2,
  tag3,
  title,
  award,
  description,
}: {
  id: number;
  img: StaticImageData;
  tag1: string;
  tag2: string;
  tag3: string;
  title: string;
  award?: "1st" | "2nd" | "3rd";
  description?: string;
}) => {
  // Map award to badge image path
  const badgeSrc =
    award === "1st"
      ? "/images/2.png"
      : award === "2nd"
      ? "/images/3.png"
      : award === "3rd"
      ? "/images/4.png"
      : null;

  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="position-relative">
        {badgeSrc && (
          <div
            className="position-absolute"
            style={{
              top: "-20px",
              right: "-20px",
              transform: "rotateX(20deg) rotateY(-20deg) scale(1.2)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <Image
              src={badgeSrc}
              alt={`${award} place badge`}
              width={100}
              height={100}
              style={{
                filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.3))",
              }}
            />
          </div>
        )}

        <FadeDown>
          <div
            className="rounded shadow-sm p-3 d-flex flex-column featured-card"
            style={{
              background: "rgb(245, 245, 255)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              height: "100%",
              minHeight: "450px",
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
            <Link href={`/portfolio_details/${id}`} className="d-block mb-3" style={{ flex: "0 0 auto" }}>
              <div
                className="w-100 rounded overflow-hidden"
                style={{
                  height: "280px",
                }}
              >
                <Image
                  src={img}
                  alt={title}
                  className="w-100 h-100 d-block"
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Link>

            <div className="mb-2" style={{ flex: "0 0 auto" }}>
              {[tag1, tag2, tag3].map((tag, i) => (
                <span key={i} className="badge bg-light text-dark me-2 mb-1">
                  {tag}
                </span>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-start mb-2" style={{ flex: "0 0 auto" }}>
              <Link
                href={`/portfolio_details/${id}`}
                className="fw-semibold text-dark text-decoration-none"
                style={{ whiteSpace: "pre-line" }}
              >
                {title}
              </Link>
              <Link
                href={`/portfolio_details/${id}`}
                className="text-dark"
                aria-label="Open"
                style={{ flex: "0 0 auto" }}
              >
                <PiArrowUpRightBold size={20} />
              </Link>
            </div>

            {description && (
              <p 
                className="text-muted mb-0 mt-auto" 
                style={{ 
                  fontSize: "0.875rem", 
                  lineHeight: "1.5",
                  flex: "0 0 auto"
                }}
              >
                {description}
              </p>
            )}
          </div>
        </FadeDown>
      </div>
    </div>
  );
};

export default FeaturedCard;
