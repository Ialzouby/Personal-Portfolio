"use client";

import { useState } from "react";
import { PiPaperPlaneTilt } from "react-icons/pi";
import ContactModal from "@/components/Shared/ContactModal";

const ResearchBanner = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <>
            <section className="banner-section-top pt-120 pb-60 mt-10 mt-lg-0">
                <div className="banner-tint-overlay"></div>
                <div className="container">
                    <div className="pb-60 br-bottom-n3">
                        <div data-aos="zoom-in" className="page-heading">
                            <h3 className="page-title n5-color fs-onefw-semibold n5-color mb-2 mb-md-3 text-center">
                                Check Out My Research
                            </h3>
                            <p className="fs-seven n5-color mb-4 mb-md-8 text-center">
                                Explore a collection of my research papers and projects.
                            </p>
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="w-max p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto border-0"
                            >
                                <PiPaperPlaneTilt /> Let's Talk
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
};

export default ResearchBanner;
