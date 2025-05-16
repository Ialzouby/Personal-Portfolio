import Product from "@/components/Pages/Research";
import Footer from "@/components/Shared/Footer/Footer";
import Link from "next/link";
import { PiPaperPlaneTilt } from "react-icons/pi";

const Research = () => {
  return (
    <div>
      <section className="pt-120 pb-120 mt-10 mt-lg-0">
        <div className="pb-60 br-bottom-n3">
          <div data-aos="zoom-in" className="page-heading">
            <h3 className="page-title n5-color fs-onefw-semibold n5-color mb-2 mb-md-3 text-center">
              Check Out My Research
            </h3>
            <p className="fs-seven n5-color mb-4 mb-md-8 text-center">
              Explore a collection of my research papers and projects.
            </p>
            <Link
              href="/contact"
              className="w-max p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto"
            >
              <PiPaperPlaneTilt /> Hire Me
            </Link>
          </div>
        </div>
        <Product />
      </section>
      <Footer />
    </div>
  );
};

export default Research;
