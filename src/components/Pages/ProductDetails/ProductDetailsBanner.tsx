import Image from "next/image";

const ProductDetailsBanner = ({ product }: { product: any }) => {
  return (
    <section className="pt-60 pb-60">
      <div className="text-center">
        <h1 className="fs-one fw-bold">{product.title}</h1>
        <p className="fs-four">{product.category}</p>
        <Image src={product.img} alt={product.title} width={600} height={400} className="rounded-3 mt-4" />
      </div>
    </section>
  );
};

export default ProductDetailsBanner;
