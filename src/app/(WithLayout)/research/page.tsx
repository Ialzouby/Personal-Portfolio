export const metadata = {
  title: "Research | Issam Alzouby - AI for Healthcare & Human Modeling",
  description:
    "Explore research papers and projects by Issam Alzouby, focused on medical AI, real-time motion modeling, organ donation prediction, and digital twin systems.",
  keywords: [
    "Issam Alzouby Research",
    "Medical AI",
    "AI Research",
    "Digital Twin",
    "Organ Donation AI",
    "AI for Health",
    "Human Modeling",
    "Clinical AI",
    "AI Publications",
  ],
  openGraph: {
    title: "Research | Issam Alzouby - AI for Healthcare & Human Modeling",
    description:
      "Discover cutting-edge AI research by Issam Alzouby in medical AI, clinical workflows, motion modeling, and infrastructure.",
    url: "https://issamalzouby.com/research",
    type: "article",
    images: [
      {
        url: "https://issamalzouby.com/p13.jpg", // replace with your image
        width: 1200,
        height: 630,
        alt: "Issam Alzouby AI Research Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research | Issam Alzouby - AI for Health & Modeling",
    description:
      "Explore Issam’s AI research portfolio including digital twins, organ donation prediction, and medical AI pipelines.",
    creator: "@issamalzouby", // replace with your actual Twitter handle
    images: ["https://issamalzouby.com/p13.jpg"], // match OG image
  },
};

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
