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
import ResearchBanner from "@/components/Pages/Research/ResearchBanner";
import Footer from "@/components/Shared/Footer/Footer";

const Research = () => {
  return (
    <div>
      <ResearchBanner />
      <section className="pb-120">
        <Product />
      </section>
      <Footer />
    </div>
  );
};

export default Research;
