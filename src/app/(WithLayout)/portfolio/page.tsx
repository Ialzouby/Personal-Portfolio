"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { featureds } from "../../../../public/data/AllData";
import FeaturedCard from "@/components/Pages/About/Featured/FeaturedCard";
import Footer from "@/components/Shared/Footer/Footer";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";

const Portfolio = () => {
  const getByCategory = (category: string) =>
    featureds.filter((item) => item.category === category);

  return (
    <div>
<section className="pt-60 pb-120 mt-0">
<FadeDown>
  <div className="pb-60 br-bottom-n3 position-relative text-center banner-wrapper2">
    <div className="heading-wrapper d-inline-block mx-auto position-relative">
      
      {/* Animated Dots Behind */}
      <div className="dot-overlay"></div>

      {/* Frosted Glass Background */}
      <div className="glass-blur-background"></div>

      {/* Content */}
      <div className="content px-4 py-3 rounded-3">
        <h3 className="page-title fs-one fw-semibold mb-2 mb-md-3">
          A collection of my best projects
        </h3>
        <p className="fs-seven mb-4 mb-md-8">
          With many years in web development, I acquired extensive
          experience working on projects across multiple industries and
          technologies. Let me show you my best creations.
        </p>

      </div>
    </div>
  </div>
</FadeDown>














        <div className="container mt-8 mt-md-15">
          <FadeDown>
            <TabGroup>
              <TabList className="d-flex flex-wrap gap-4 gap-sm-5 gap-md-7 align-items-center justify-content-center">
                {["All", "AI/ML", "Hackathons", "AI Infrastructure", "Personal Explorations"].map(
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

              <TabPanels className="mt-5 mt-md-10">
                {/* All Projects */}
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {featureds.map(({ id, img, tag1, tag2, tag3, title, award }) => (
                      <FeaturedCard
                        key={id}
                        id={id}
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
                    {getByCategory("AI/ML").map(({ id, img, tag1, tag2, tag3, title }) => (
                      <FeaturedCard
                        key={id}
                        id={id}
                        img={img}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        title={title}
                      />
                    ))}
                  </div>
                </TabPanel>

                {/* Hackathons */}
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {getByCategory("Hackathons").map(({ id, img, tag1, tag2, tag3, title, award }) => (
                      <FeaturedCard
                        key={id}
                        id={id}
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
                        id={id}
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
                      ({ id, img, tag1, tag2, tag3, title, award }) => (
                        <FeaturedCard
                          key={id}
                          id={id}
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
