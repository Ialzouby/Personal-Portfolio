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
    <div className="w-100 mb-3">
      <div
        className="d-flex flex-column flex-md-row align-items-start gap-4 border rounded p-3 shadow-sm"
        style={{
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = "#606060"; // softer gray
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
        }}
      >
        {/* Image on the left */}
        <Link href="/products_details" className="flex-shrink-0">
          <Image
            src={img}
            alt={title}
            width={220}
            height={220}
            className="rounded"
          />
        </Link>

        {/* Content on the right */}
        <div className="flex-grow-1">
          <Link
            href="/products_details"
            className="project-title fs-six fw-semibold n5-color mb-2 d-block"
          >
            {title}
          </Link>
          <p className="fs-six n3-color mb-2">{des}</p>

          <span className="n5-color fs-seven fw-medium d-block mb-3">
            {price}
          </span>

          <div className="d-flex gap-3 align-items-center">
            <button
              type="button"
              className="p-btn bg1-color px-3 py-2 rounded n11-color"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Read More
            </button>
            <Link
              href="/products_details"
              className="project-link d-flex align-items-center justify-content-center flex-shrink-0"
            >
              <PiArrowUpRightBold className="fs-five n5-color" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
