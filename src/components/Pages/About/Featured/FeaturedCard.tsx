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
      <div className="position-relative h-100" style={{ overflow: "visible" }}>
        {badgeSrc && (
          <div
            className="position-absolute"
            style={{
              top: "-10px",
              right: "-10px",
              transform: "rotate(15deg)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <Image
              src={badgeSrc}
              alt={`${award} place badge`}
              width={80}
              height={80}
              style={{
                filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.2))",
              }}
            />
          </div>
        )}

        <FadeDown>
          <Link
            href={`/portfolio_details/${id}`}
            className="p-4 d-flex flex-column h-100 text-decoration-none"
            style={{
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(240, 245, 255, 0.3) 100%)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              boxShadow: "0 15px 40px rgba(0, 50, 100, 0.1)",
              transition: "all 0.3s ease",
              position: "relative",
              zIndex: 2,
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.borderColor = "rgba(var(--p1), 0.5)";
              e.currentTarget.style.boxShadow = "0 20px 50px rgba(0, 50, 100, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.9)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 50, 100, 0.1)";
            }}
          >
            <div className="d-block mb-4" style={{ flex: "0 0 auto" }}>
              <div
                className="w-100 rounded-3 overflow-hidden"
                style={{
                  height: "clamp(180px, 35vw, 280px)",
                }}
              >
                <Image
                  src={img}
                  alt={title}
                  className="w-100 h-100 d-block"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
              </div>
            </div>

            <div className="mb-3" style={{ flex: "0 0 auto" }}>
              <div className="d-flex flex-wrap gap-2">
                {[tag1, tag2, tag3].map((tag, i) => (
                  <span key={i} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-start mb-2" style={{ flex: "0 0 auto" }}>
              <h5
                className="fs-five fw-bold n5-color mb-0"
                style={{ whiteSpace: "pre-line" }}
              >
                {title}
              </h5>
              <div
                className="p1-color"
              >
                <PiArrowUpRightBold size={24} />
              </div>
            </div>

            {description && (
              <p
                className="n4-color opacity-75 mb-0 mt-auto"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  flex: "0 0 auto"
                }}
              >
                {description}
              </p>
            )}
          </Link>
        </FadeDown>
      </div>
    </div >
  );
};

export default FeaturedCard;
