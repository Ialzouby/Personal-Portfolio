const ProductDetailsDescriptiion = ({ product }: { product: any }) => {
  return (
    <section className="pt-60 pb-60">
      <div className="container">
        <h2 className="fs-three fw-bold mb-3">Project Overview</h2>
        <p className="fs-five">{product.des}</p>
        <p className="fs-five fw-semibold mt-3">{product.price}</p>
      </div>
    </section>
  );
};

export default ProductDetailsDescriptiion;
