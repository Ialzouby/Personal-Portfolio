const ProductDetailsDescriptiion = () => {
  return (
    <section className="details-description pt-60 pb-60 d-flex flex-column gap-4 gap-md-8">
      <div>
        <h3 className="n5-color fs-three mb-2 mb-md-4">Background</h3>
        <p className="n3-color fs-seven">
          Organ transplantation is an impactful use-case for advances in artificial intelligence and computer algorithms 
          as a single successful organ donation is an entire life saved. We hypothesize that organs are being missed 
          by donation after circulatory death (DCD) workflows due to process inefficiencies and underutilization of 
          relatively novel ex-vivo organ perfusion systems.
        </p>
        <p className="n3-color fs-seven mt-2">
          This study quantifies how many potential thoracic organ donors are being missed at a large academic medical center, 
          identifies barriers to donor referral, and describes the feasibility of a novel computer algorithm design to rescue 
          organs missed by current DCD workflows.
        </p>
      </div>

      <div>
        <h3 className="n5-color fs-three mb-2 mb-md-4">Methods</h3>
        <p className="n3-color fs-seven">
          This study analyzed all deaths at a central medical center between June 2020 and June 2022 (n=2233). Specific exclusion 
          criteria were used to calculate potential heart and/or lung donors. Data from the local organ procurement organization 
          was cross-referenced to calculate the number of missed donor organ evaluations during the study period.
        </p>
        <p className="n3-color fs-seven mt-2">
          Then a qualitative analysis using structured interviews with intensive care unit nursing teams identified barriers 
          to donor referral. Findings informed the design of an algorithm software to automate and streamline the organ donor 
          evaluation and referral process.
        </p>
      </div>

      <div>
        <h3 className="n5-color fs-three mb-2 mb-md-4">Results</h3>
        <p className="n3-color fs-seven">
          The procurement outcomes analysis identified 265 qualified cardiac and 280 qualified lung donors, though only 18 
          patients were approached for thoracic organ transplantation. The workflow analysis revealed that donor approaches 
          were often missed or delayed due to other critical care priorities, human error, lack of awareness, and frustration 
          with procurement organization follow-up.
        </p>
      </div>

      <div>
        <h3 className="n5-color fs-three mb-2 mb-md-4">Conclusion</h3>
        <p className="n3-color fs-seven">
          Optimizing organ referral workflow could exponentially increase lives saved by transplantation. Our findings endorse 
          an algorithm for automated donor evaluation and referral as a feasible solution. Future studies will implement and 
          clinically validate the algorithm design described.
        </p>
      </div>
    </section>
  );
};

export default ProductDetailsDescriptiion;
