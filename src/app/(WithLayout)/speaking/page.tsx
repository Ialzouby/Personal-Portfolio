"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { featureds2 } from "../../../../public/data/AllData";
import FeaturedCard from "@/components/Pages/About/Featured/FeaturedCard";
import Footer from "@/components/Shared/Footer/Footer";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";

const Portfolio = () => {
  const getByCategory = (category: string) =>
    featureds2.filter((item) => item.category === category);

  return (
    <div>
      <section className="banner-section-top pt-120 pb-60 mt-10 mt-lg-0">
        <div className="banner-tint-overlay"></div>
        <div className="container">
          <FadeDown>
            <div className="pb-60 br-bottom-n3">
              <div className="page-heading">
                <h3 className="page-title fs-one fw-semibold n5-color mb-2 mb-md-3 text-center">
                  Public Speaking & Education
                </h3>
                <p className="fs-seven n5-color mb-4 mb-md-8 text-center">
                  Sharing knowledge through talks, workshops, and educational content on AI, robotics, and software engineering.
                </p>
                <Link
                  href="/contact"
                  className="w-max p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto"
                >
                  <PiPaperPlaneTilt /> Let's Talk
                </Link>
              </div>
            </div>
          </FadeDown>
        </div>
      </section>

      <section className="pt-10 pb-10">
        <div className="container mt-8 mt-md-5">
          <FadeDown>
            <TabGroup>
              <TabList className="d-flex flex-wrap gap-4 gap-sm-5 gap-md-7 align-items-center justify-content-center">
                {["All", "Public Speaking", "Education"].map(
                  (label) => (
                    <Tab key={label} as={Fragment}>
                      {({ hover, selected }) => (
                        <button
                          className={clsx(
                            hover && "p1-color",
                            selected && "tab-active",
                            "fs-seven fw-medium n3-color"
                          )}
                        >
                          {label}
                        </button>
                      )}
                    </Tab>
                  )
                )}
              </TabList>

              <TabPanels className="mt-2">
                {/* All Projects */}
                <TabPanel>
<div className="row g-4 mt-10">
                    {featureds2.map(({ id, img, tag1, tag2, tag3, title, award }) => (
                      <FeaturedCard
                        key={id}
                        img={img}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        title={title}
                        award={award}
                      />
                    ))}
                  </div>
                </TabPanel>

                {/* AI/ML */}
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {getByCategory("Public Speaking").map(({ id, img, tag1, tag2, tag3, title, award }) => (
                      <FeaturedCard
                        key={id}
                        img={img}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        title={title}
                        award={award}
                      />
                    ))}
                  </div>
                </TabPanel>

                {/* Education */}
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {getByCategory("Education").map(({ id, img, tag1, tag2, tag3, title, award }) => (
                      <FeaturedCard
                        key={id}
                        img={img}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        title={title}
                        award={award}
                      />
                    ))}
                  </div>
                </TabPanel>

                {/* AI Infrastructure */}
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {getByCategory("AI Infrastructure").map(({ id, img, tag1, tag2, tag3, title, award }) => (
                      <FeaturedCard
                        key={id}
                        img={img}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        title={title}
                        award={award}
                      />
                    ))}
                  </div>
                </TabPanel>

                {/* Personal Explorations */}
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {getByCategory("Personal Explorations").map(
                      ({ id, img, tag1, tag2, tag3, title }) => (
                        <FeaturedCard
                          key={id}
                          img={img}
                          tag1={tag1}
                          tag2={tag2}
                          tag3={tag3}
                          title={title}
                          award={award}
                        />
                      )
                    )}
                  </div>
                </TabPanel> 
              </TabPanels>
            </TabGroup>
          </FadeDown>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Portfolio;
