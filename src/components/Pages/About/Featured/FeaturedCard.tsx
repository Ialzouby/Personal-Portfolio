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
    <div className="col-xl-6">
      <FadeDown>
        <div className="project-card">
          <Link href="/portfolio_details" className="thumb d-block">
            <div className="post-thumb">
              <div className="post-thumb-inner">
                <Image src={img} alt="..." className="w-100 p-2" />
              </div>
            </div>
            <div className="post-thumb">
              <div className="post-thumb-inner">
                <Image src={img} alt="..." className="w-100 p-2" />
              </div>
            </div>
          </Link>

          <div className="d-flex justify-content-between gap-2 align-items-center pt-4 pt-md-8 px-3 px-md-6">
            <div>
              <div className="d-flex flex-wrap gap-1 gap-sm-2 align-items-center">
                <Link
                  href="#"
                  className="n5-color fs-nine px-2 px-md-4 py-1 py-md-2 brn3 rounded-pill fw-medium"
                >
                  {tag1}
                </Link>
                <Link
                  href="#"
                  className="n5-color fs-nine px-2 px-md-4 py-1 py-md-2 brn3 rounded-pill fw-medium"
                >
                  {tag2}
                </Link>
                <Link
                  href="#"
                  className="n5-color fs-nine px-2 px-md-4 py-1 py-md-2 brn3 rounded-pill fw-medium"
                >
                  {tag3}
                </Link>
              </div>
              <Link
                href="/portfolio_details"
                className="project-title fs-five fw-semibold n5-color mt-3 mt-md-5 d-block"
              >
                {title}
              </Link>
            </div>
            <Link
              href="/portfolio_details"
              className="project-link d-flex align-items-center justify-content-center flex-shrink-0"
            >
              <i className="n5-color">
                <PiArrowUpRightBold />
              </i>
            </Link>
          </div>
        </div>
      </FadeDown>
    </div>
  );
};

export default FeaturedCard;
