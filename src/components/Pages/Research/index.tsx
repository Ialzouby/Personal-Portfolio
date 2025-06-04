"use client";

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


import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import { productsData } from "../../../../public/data/AllData";
import ProductCard from "../Product/ProductCard";
import CartModal from "@/components/Shared/Modal/CartModal";

  const Research = () => {
  return (
    <div className="container mt-8 mt-md-15">
      <TabGroup>
        <TabList className="d-flex gap-3 gap-md-7 align-items-center justify-content-center">
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  hover && "p1-color",
                  selected && "tab-active",
                  "fs-seven  fw-medium n3-color"
                )}
              >
                All
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  hover && "p1-color",
                  selected && "tab-active",
                  "fs-seven  fw-medium n3-color"
                )}
              >
                Duke Heart Center & UNC Chapel Hill School of Medicine
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  hover && "p1-color",
                  selected && "tab-active",
                  "fs-seven  fw-medium n3-color"
                )}
              >
                UNC-Charlotte AI4Health Center
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  hover && "p1-color",
                  selected && "tab-active",
                  "fs-seven  fw-medium n3-color"
                )}
              >
                --
              </button>
            )}
          </Tab>
        </TabList>
        <TabPanels className="mt-5 mt-md-10">
  <TabPanel>
  <div className="row g-2 g-md-6">
  {productsData.map(({ id, img, title, des, price }) => (
        <ProductCard
          key={id}
          id={id}
          img={img}
          title={title}
          des={des}
          price={price}
        />
      ))}
    </div>
  </TabPanel>

  <TabPanel>
    <div className="row g-5 g-md-10">
      {productsData
        .filter((item) => item.category === "Duke & UNC")
        .map(({ id, img, title, des, price }) => (
          <ProductCard
            key={id}
            id={id}
            img={img}
            title={title}
            des={des}
            price={price}
          />
        ))}
    </div>
  </TabPanel>

  <TabPanel>
    <div className="row g-5 g-md-10">
      {productsData
        .filter((item) => item.category === "UNCC")
        .map(({ id, img, title, des, price }) => (
          <ProductCard
            key={id}
            id={id}
            img={img}
            title={title}
            des={des}
            price={price}
          />
        ))}
    </div>
  </TabPanel>

  <TabPanel>
    <div className="row g-5 g-md-10">
      {productsData
        .filter((item) => item.category === "Assets")
        .map(({ id, img, title, des, price }) => (
          <ProductCard
            key={id}
            id={id}
            img={img}
            title={title}
            des={des}
            price={price}
          />
        ))}
    </div>
  </TabPanel>
</TabPanels>

      </TabGroup>

      {/* Modal start  */}
      <CartModal />
    </div>
  );
};

export default Research;
