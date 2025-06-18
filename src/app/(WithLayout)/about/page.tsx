import Banner from "@/components/Pages/About/Banner";
import Counter from "@/components/Pages/About/Counter";
import Featured from "@/components/Pages/About/Featured/Featured";
import LatestBlog from "@/components/Pages/About/Blog/LatestBlog";
import NextProject from "@/components/Pages/About/NextProject";
import Testimonials from "@/components/Pages/About/Testimonials";
import WhatDo from "@/components/Pages/About/WhatDo";
import Footer from "@/components/Shared/Footer/Footer";
import Gallery from "@/components/Pages/About/Gallery";
import Websites from "@/components/Pages/About/Websites";

export const metadata = {
  title: "Issam Alzouby | AI Engineer & Medical AI Researcher",
  description:
    "Issam Alzouby is an AI engineer focused on medical AI, motion modeling, and real-time digital twins. Explore his research, publications, and portfolio.",
  keywords: [
    "Issam Alzouby",
    "AI Engineer",
    "Medical AI",
    "Digital Twin",
    "Healthcare AI",
    "AI Research",
    "FastAPI Developer",
    "React Developer",
    "Organ Donation AI",
  ],
  openGraph: {
    title: "Issam Alzouby | AI Engineer & Medical AI Researcher",
    description:
      "Discover AI research and medical innovation by Issam Alzouby. Real-time digital twins, organ donation prediction, and more.",
    url: "https://issamalzouby.com/about",
    type: "website",
    images: [
      {
        url: "https://issamalzouby.com/p13.jpg",
        width: 1200,
        height: 630,
        alt: "Issam Alzouby AI Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Issam Alzouby | AI Engineer & Medical AI Researcher",
    description:
      "Explore Issam’s portfolio, publications, and medical AI work across Stanford, Duke, UNC and beyond.",
    creator: "@issamalzouby",
    images: ["https://issamalzouby.com/p13.jpg"],
  },
};



const About = () => {
  return (
    <div className="overflow-hidden">
      <section className="pt-60 pb-110 br-bottom-n3  mt-0 mt-lg-0">
        <div className="container">
          <Banner />
          <div className="d-none d-sm-block">
  <Counter />
</div>

        </div>
      </section>
      <section className="pt-0 pb-0 mt-0 br-bottom-n3">
      <Gallery />
      <Websites />

      </section>
      <WhatDo />
      <NextProject />
      <Featured />
      <LatestBlog />
      <Footer />
    </div>
  );
};



export default About;
