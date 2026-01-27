import { div } from "framer-motion/client";
import FadeDown from "@/components/motionEffect/FadeDown";
import PresentationList from "@/components/Pages/Presentations/PresentationList";
import Footer from "@/components/Shared/Footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ML & AI Presentations | Issam Alzouby - Educational Resources",
    description: "Comprehensive machine learning and AI presentation collection covering VAEs, transformers, neural networks, deep learning, computer vision, and NLP.",
    keywords: ["machine learning presentations", "AI tutorials", "deep learning slides", "VAE tutorial", "transformer architecture", "Issam Alzouby"],
    openGraph: {
        title: "ML & AI Presentations | Issam Alzouby",
        description: "Free comprehensive machine learning presentations covering generative models, transformers, and deep learning fundamentals",
        type: "website",
        url: "https://your-site.web.app/presentations", // Update with real URL if known
    }
};

const PresentationsPage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="banner-section-top pt-120 pb-60 mt-10 mt-lg-0 justify-content-center">
                <div className="banner-tint-overlay"></div>
                <FadeDown>
                    <div className="br-bottom-n3 w-100">
                        <div className="container">
                            <div className="page-heading text-center">
                                <h3 className="page-title fs-one fw-semibold n5-color mb-2 mb-md-3">
                                    Machine Learning & AI Presentations
                                </h3>
                                <p className="fs-six n5-color mb-4 mb-md-6 opacity-75" style={{ maxWidth: "700px", margin: "0 auto" }}>
                                    Educational resources covering deep learning, generative models, NLP, and computer vision.
                                    Designed for students, practitioners, and enthusiasts.
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2">
                                        Deep Learning
                                    </span>
                                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2">
                                        Computer Vision
                                    </span>
                                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2">
                                        NLP
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeDown>
            </section>



            {/* List Section (Search + Grid) */}
            <section className="pt-10">
                <PresentationList />
            </section>

            <Footer />
        </div>
    );
};

export default PresentationsPage;
