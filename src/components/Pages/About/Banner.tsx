import Image from "next/image";
import resumeIcon from "@/../public/images/resume-icon.png";
import user from "@/../public/images/user.png";
import { PiArrowRight } from "react-icons/pi";
import Link from "next/link";
import TypingEffect from "@/components/TypingEffect/TypingEffect";

const Banner = () => {
  const texts = ["Engineer", "Researcher", "Innovator"];
  return (
    <div className="d-flex flex-wrap gap-9 gap-md-12 align-items-center justify-content-between">
      <div className="banner-content">
        <span className="n5-color fs-five">HI, I&apos;M An AI Engineer</span>
        <h2 className="typing-text display-one p1-color mt-2 mb-3">
          <TypingEffect texts={texts} speed={200} pause={2000} />
        </h2>
        <p className="fs-seven n5-color">
          My focus is on developing AI4Health solutions that can help improve the lives of people around the world
          {/* <Link href="/blog" className="p1-color">
            {" "}
            blog
          </Link>
          ,
          <Link href="/portfolio" className="p1-color">
            {" "}
            project portfolio{" "}
          </Link>
          and{" "}
          <Link href="/resume" className="p1-color">
            online resume
          </Link> */}
          .
        </p>
        <div className="d-flex flex-wrap align-itmes-center gap-3 gap-md-6 mt-4 mt-md-8">
          <Link
            //href="/portfolio"
            href="#"
            className="p-btn n11-color bg1-color fw-medium n1-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2"
          >
            <PiArrowRight />
            View Portfolio
          </Link>
          <Link
            //href="/resume"
            href="#"
            className="p-btn n11-color bgn51-color fw-medium n1-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2"
          >
            <Image src={resumeIcon} width={20} height={20} alt="icon" />
            View Resume
          </Link>
        </div>
      </div>

      <div className="position-relative profile-img">
        <div className="user-bg"></div>
        <div className="bg-white">
          <Image src={user} alt="user" width={200} height={200} className="user-img" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

