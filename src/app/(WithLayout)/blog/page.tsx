import { blogs } from "../../../../public/data/AllData";
import BlogCard from "@/components/Pages/About/Blog/BlogCard";
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiPaperPlaneTilt,
} from "react-icons/pi";
import Footer from "@/components/Shared/Footer/Footer";
import FadeDown from "@/components/motionEffect/FadeDown";

const Blog = () => {
  return (
    <div>
      <section className="pt-120 pb-120 mt-10 mt-lg-0">
        <FadeDown>
          <div className="pb-60 br-bottom-n3">
            <div className="container">
              <div className="page-heading">
                <h3 className="page-title fs-onefw-semibold n5-color mb-2 mb-md-3 text-center">
                  A Blog About Software Development And Life
                </h3>
                <p className="fs-seven n5-color mb-4 mb-md-8 text-center">
                  Welcome to my blog. Subscribe and get my latest blog post in
                  your inbox.
                </p>
                <div className="d-flex flex-wrap flex-sm-nowrap gap-3 gap-md-6">
                  <input
                    placeholder="Enter your email"
                    className="brn4 px-4 px-md-8 py-2 py-md-4 rounded-pill n5-color"
                  />
                  <button className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto h-100 flex-shrink-0">
                    <PiPaperPlaneTilt />
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeDown>

        {/* <!-- blog card  --> */}
        <div className="container">
          <div className="row g-5 g-md-10 mt-5">
            {blogs.map(({ id, img, date, tag, title }) => (
              <BlogCard
                key={id}
                img={img}
                date={date}
                tag={tag}
                title={title}
              />
            ))}
          </div>

          <div
            data-aos="zoom-in-up"
            className="d-flex gap-4 gap-md-8 justify-content-center mt-8 mt-md-15"
          >
            <div className="pagination-countainer brn4 n5-color">
              <PiCaretLeftBold />
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div className="pagination-countainer brn4 n5-color pagination-active">01</div>
              <div className="pagination-countainer brn4 n5-color">02</div>
              <div className="pagination-countainer brn4 n5-color">03</div>
            </div>
            <div className="pagination-countainer brn4 n5-color">
              <PiCaretRightBold />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
