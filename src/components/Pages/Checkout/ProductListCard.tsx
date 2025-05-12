"use client";
import useCounter from "@/components/Hook/useCounter";
import Image, { StaticImageData } from "next/image";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";

const ProductListCard = ({
  img,
  title,
  price,
}: {
  img: StaticImageData;
  title: string;
  price: string;
}) => {
  const { count, increment, discrement } = useCounter();
  return (
    <div className="d-flex align-items-start gap-4 mb-3 mb-md-5">
      <Image src={img} alt="..." className="add-cart-img" />
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between w-100">
        <div>
          <h5 className="fs-seven fw-medium n5-color mb-2">{title}</h5>
          <div className="d-flex gap-1 align-items-center">
            <span
              onClick={discrement}
              className="fs-eight n5-color cursor-pointer"
            >
              <PiMinusBold />
            </span>
            <span className="product-count fs-eight fw-semibold n5-color py-1 px-2 brn4 rounded">
              {count}
            </span>
            <span
              onClick={increment}
              className="fs-eight n5-color cursor-pointer"
            >
              <PiPlusBold />
            </span>
          </div>
        </div>
        <span className="fs-eight p1-color d-block">${price} USD</span>
      </div>
    </div>
  );
};

export default ProductListCard;
