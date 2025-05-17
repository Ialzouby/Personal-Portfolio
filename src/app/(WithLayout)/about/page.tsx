import Banner from "@/components/Pages/About/Banner";
import Counter from "@/components/Pages/About/Counter";
import Featured from "@/components/Pages/About/Featured/Featured";
import LatestBlog from "@/components/Pages/About/Blog/LatestBlog";
import NextProject from "@/components/Pages/About/NextProject";
import Testimonials from "@/components/Pages/About/Testimonials";
import WhatDo from "@/components/Pages/About/WhatDo";
import Footer from "@/components/Shared/Footer/Footer";
import Gallery from "@/components/Pages/About/Gallery";

const About = () => {
  return (
    <div className="overflow-hidden">
      <section className="pt-120 pb-60 br-bottom-n3  mt-10 mt-lg-0">
        <div className="container">
          <Banner />
          <Counter />
        </div>
      </section>
      <section className="pt-0 pb-0 mt-0 br-bottom-n3">
      <Gallery />

      </section>
      <WhatDo />
      <NextProject />
      <Featured />
      <Testimonials />
      <LatestBlog />
      <Footer />
    </div>
  );
};

export default About;
