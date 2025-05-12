import FadeDown from "@/components/motionEffect/FadeDown";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const BlogCard = ({
  img,
  date,
  tag,
  title,
}: {
  img: StaticImageData;
  date: string;
  tag: string;
  title: string;
}) => {
  return (
    <div className="col-sm-6 col-xxl-4">
      <FadeDown>
        <Link href="/blog_details" className="blog-card">
          <div className="blog-img rounded-3 overflow-hidden">
            <Image src={img} alt="blog" className="rounded-3 w-100" />
          </div>
          <div className="pt-4 pt-md-8 px-3 px-md-5">
            <div className="d-flex align-items-center gap-3 mb-2 mb-md-3">
              <span className="n4-color fs-eight">{date}</span>
              <span className="p1-color fs-eight">/</span>
              <span className="n4-color fs-eight">{tag}</span>
            </div>
            <h4 className="blog-title fs-five n5-color fw-semibold">{title}</h4>
          </div>
        </Link>
      </FadeDown>
    </div>
  );
};

export default BlogCard;
