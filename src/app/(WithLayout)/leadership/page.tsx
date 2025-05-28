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
      <section className="pt-10 pb-10 mt-10 mt-lg-0">


        <div className="container mt-8 mt-md-15">
          <FadeDown>
            <TabGroup>
              <TabList className="d-flex flex-wrap gap-4 gap-sm-5 gap-md-7 align-items-center justify-content-center">
                {["All", "Public Speaking", "Teaching"].map(
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
                    {featureds2.map(({ id, img, tag1, tag2, tag3, title }) => (
                      <FeaturedCard
                        key={id}
                        img={img}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        title={title}
                      />
                    ))}
                  </div>
                </TabPanel>

                {/* AI/ML */}
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {getByCategory("Public Speaking").map(({ id, img, tag1, tag2, tag3, title }) => (
                      <FeaturedCard
                        key={id}
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
                    {getByCategory("Teaching").map(({ id, img, tag1, tag2, tag3, title }) => (
                      <FeaturedCard
                        key={id}
                        img={img}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        title={title}
                      />
                    ))}
                  </div>
                </TabPanel>

                {/* AI Infrastructure */}
                <TabPanel>
                  <div className="row g-5 g-md-10 mt-8 mt-md-15">
                    {getByCategory("AI Infrastructure").map(({ id, img, tag1, tag2, tag3, title }) => (
                      <FeaturedCard
                        key={id}
                        img={img}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        title={title}
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
