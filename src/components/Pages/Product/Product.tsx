"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import { productsData } from "../../../../public/data/AllData";
import ProductCard from "./ProductCard";
import CartModal from "@/components/Shared/Modal/CartModal";

const Product = () => {
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
                Assets
              </button>
            )}
          </Tab>
        </TabList>
        <TabPanels className="mt-5 mt-md-10">
          <TabPanel>
            <div className="row g-5 g-md-10">
              {productsData.map(({ id, img, title, des, price }) => (
                <ProductCard
                  key={id}
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
                .slice(2, 6)
                .map(({ id, img, title, des, price }) => (
                  <ProductCard
                    key={id}
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
                .slice(1, 5)
                .map(({ id, img, title, des, price }) => (
                  <ProductCard
                    key={id}
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
                .slice(3, 6)
                .map(({ id, img, title, des, price }) => (
                  <ProductCard
                    key={id}
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

export default Product;
