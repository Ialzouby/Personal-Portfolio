import Image from "next/image";
import aiOrganImg from "@/../public/images/organ.png"; // replace with your actual image

const ProductDetailsBanner = () => {
  return (
    <section className="pt-120 mt-10 mt-lg-0">
      <div className="row g-6 g-sm-12 g-xl-20 align-items-center justify-content-between">
        <div className="col-xl-6">
          <h2 className="fs-two n4-color">
            Computer Algorithm to Rescue Donation After Circulatory Death (DCD) Organs
          </h2>
          <p className="n3-color fs-six mt-3 mt-xl-6">
            Only 6–7% of patients who qualified to donate organs were approached for donation at this quaternary care center. 
            Potentially contributory are inefficiencies in occupied intensive care unit staff making phone calls to the OPO to 
            initiate donor approach. Our findings endorse an algorithm for automated donor evaluation and referral as a feasible solution.
            Future studies will implement and clinically validate the algorithm design described.
          </p>
          <div className="d-flex align-items-center gap-3 gap-md-4 mt-5 mt-xl-10">
            <span className="fs-five fw-semibold n5-color">Best Oral Presentation</span>
            <span className="fs-five fw-semibold n5-color">62nd ECTSS Conference</span>
          </div>
        </div>
        <div className="col-xl-6 d-flex align-items-center justify-content-center">
          <div className="overflow-hidden">
            <Image
              src={aiOrganImg}
              alt="Organ AI System"
              className="product-details-img"
              width={700}
              height={320}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsBanner;
