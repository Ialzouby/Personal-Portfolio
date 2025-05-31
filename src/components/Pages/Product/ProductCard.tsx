import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { PiArrowUpRightBold } from "react-icons/pi";

const ProductCard = ({
  img,
  title,
  des,
  price,
}: {
  img: StaticImageData;
  title: string;
  des: string;
  price: string;
}) => {
  return (
    <div className="w-100 mb-1">
      <Link
        href="/products_details"
        className="text-decoration-none"
        style={{ color: "inherit" }}
      >
        <div
          className="d-flex flex-column flex-md-row align-items-start gap-4 p-3 rounded-4 transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease, transform 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.boxShadow = "0 12px 36px rgba(0, 0, 0, 0.2)";
            el.style.background = "rgba(255, 255, 255, 0.08)";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.1)";
            el.style.background = "rgba(255, 255, 255, 0.05)";
            el.style.transform = "translateY(0)";
          }}
        >
          {/* Left: Image */}
          <div
            className="flex-shrink-0"
            style={{
              width: "220px",
              height: "165px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            <Image
              src={img}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 220px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right: Text */}
          <div className="flex-grow-1">
            <h3 className="project-title fs-six fw-semibold n5-color mb-2">
              {title}
            </h3>
            <p className="fs-six n3-color mb-2">{des}</p>
            <span className="n5-color fs-seven fw-medium d-block mb-3">
              {price}
            </span>

            <div className="d-flex gap-3 align-items-center">
              <div className="p-btn bg1-color px-3 py-2 rounded n11-color">
                Read More
              </div>
              <div className="project-link d-flex align-items-center justify-content-center flex-shrink-0">
                <PiArrowUpRightBold className="fs-five n5-color" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
