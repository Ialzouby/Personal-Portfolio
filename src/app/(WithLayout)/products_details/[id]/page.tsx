import { notFound } from "next/navigation";
import { productsData } from "@/../public/data/AllData";
import ProductDetailsBanner from "@/components/Pages/ProductDetails/ProductDetailsBanner";
import ProductDetailsDescriptiion from "@/components/Pages/ProductDetails/ProductDetailsDescription";
import ProductCard from "@/components/Pages/Product/ProductCard";
import CartModal from "@/components/Shared/Modal/CartModal";
import Footer from "@/components/Shared/Footer/Footer";

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = productsData.find((p) => p.id === Number(params.id));

  if (!product) return notFound();

  const cardsData = [
    { id: 1, heading: "Hands-On Creativity Challenges" },
    { id: 2, heading: "Personal Project Guidance" },
    { id: 3, heading: "Interactive Exercises and Coding Playground" },
    { id: 4, heading: "Inspiration Hub - Stories and Interviews" },
  ];

  return (
    <div className="container">
      <ProductDetailsBanner product={product} />

      <section className="pt-60">
        <div className="row g-3 g-md-6">
          {cardsData.map(({ id, heading }) => (
            <div key={id} className="col-sm-6 col-xl-4 col-xxl-3">
              <div className="bgn2-color brn4 p-3 p-md-5 rounded">
                <span className="fs-five p1-color d-block">✓</span>
                <span className="fs-five fw-medium n5-color mt-1 mt-md-2">
                  {heading}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProductDetailsDescriptiion product={product} />

      <section className="pb-120">
        <h3 className="fs-two n5-color mb-5 mb-md-10">Check out similar products</h3>
        <div className="d-flex flex-column gap-4">
          {productsData.slice(3, 6).map(({ id, img, title, des, price }) => (
            <ProductCard key={id} id={id} img={img} title={title} des={des} price={price} />
          ))}
        </div>
      </section>

      <Footer />
      <CartModal />
    </div>
  );
}
