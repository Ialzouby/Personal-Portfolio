import Link from "next/link";
import { PiPaperPlaneTilt } from "react-icons/pi";
import PackagesPrice from "@/components/Pages/Price/PackagesPrice";
import Faqs from "@/components/Pages/Price/Faqs";
import Footer from "@/components/Shared/Footer/Footer";
import FadeDown from "@/components/motionEffect/FadeDown";

const Price = () => {
  return (
    <div>
      <section className="pt-120 pb-120 br-bottom-n3 mt-10 mt-lg-0">
        <FadeDown>
          <div className="pb-60 br-bottom-n3">
            <div className="page-heading">
              <h3 className="page-title fs-onefw-semibold n5-color mb-2 mb-md-3 text-center">
                Services & Pricing
              </h3>
              <p className="fs-seven n5-color mb-4 mb-md-8 text-center">
                I have 10+ years of development experience building software for
                the web and mobile devices. You can take a look at my{" "}
                <Link href="/resume" className="p1-color">
                  online resume
                </Link>{" "}
                and
                <Link href="/portfolio" className="p1-color">
                  {" "}
                  project portfolio{" "}
                </Link>
                to find out more about my skills and experiences.
              </p>

              <Link
                href="/contact"
                className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto w-max"
              >
                <PiPaperPlaneTilt /> Hire Me
              </Link>
            </div>
          </div>
        </FadeDown>

        <div className="container mt-8 mt-md-15">
          <FadeDown>
            <div className="section-heading">
              <div className="d-flex align-items-center gap-2">
                <div className="title-line"></div>
                <h2 className="display-four n5-color fw-semibold">
                  Service Packages
                </h2>
              </div>
              <p className="fs-seven n4-color mt-2 mt-md-4">
                Explore the range of services I provide to help bring your
                projects to life. From initial concept to final delivery, I am
                committed to delivering high-quality results tailored to your
                needs.
              </p>
            </div>
          </FadeDown>

          <section className="mt-8 mt-md-15">
            <PackagesPrice />
          </section>

          <FadeDown>
            <div data-aos="zoom-in" className="hire-content mt-8 mt-md-15">
              <h4 className="n5-color fs-three fw-semibold text-center mb-2 mb-md-4">
                Want to hire me for custom package?
              </h4>
              <p className="fs-seven n5-color mb-4 mb-md-8 text-center">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor incididunt ut labore et dolore.
              </p>
              <Link
                href="/contact"
                className="w-max p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto"
              >
                <PiPaperPlaneTilt />
                Hire Me
              </Link>
            </div>
          </FadeDown>
        </div>
      </section>
      <Faqs />
      <Footer />
    </div>
  );
};

export default Price;
