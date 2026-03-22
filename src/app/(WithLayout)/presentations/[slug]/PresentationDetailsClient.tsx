"use client";

import { Presentation } from "@/../public/data/PresentationData";
import GoogleSlidesEmbed from "@/components/Pages/Presentations/GoogleSlidesEmbed";
import PresentationCard from "@/components/Pages/Presentations/PresentationCard";
import Footer from "@/components/Shared/Footer/Footer";
import Link from "next/link";
import {
    PiCalendarBlank,
    PiClock,
    PiTag,
    PiShareNetwork,
    PiDownloadSimple,
    PiCheckCircle,
    PiBookOpenText,
    PiListNumbers,
    PiLinkedinLogo,
    PiTwitterLogo,
    PiEnvelopeSimple,
    PiLinkSimple,
    PiPresentationChart
} from "react-icons/pi";
import { presentations } from "@/../public/data/PresentationData";

const PresentationDetailsClient = ({ presentation }: { presentation: Presentation }) => {
    const related = presentations
        .filter(p => p.id !== presentation.id)
        .slice(0, 2);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="pt-120">
            {/* Header Section */}
            <section className="pb-60">
                <div className="container">
                    {/* Breadcrumbs */}
                    <nav aria-label="breadcrumb" className="mb-6">
                        <ol className="breadcrumb fs-seven">
                            <li className="breadcrumb-item"><Link href="/" className="text-decoration-none n4-color">Home</Link></li>
                            <li className="breadcrumb-item"><Link href="/presentations" className="text-decoration-none n4-color">Presentations</Link></li>
                            <li className="breadcrumb-item active n5-color" aria-current="page">{presentation.title}</li>
                        </ol>
                    </nav>

                    {/* Title & Meta */}
                    <div className="row g-4 justify-content-between align-items-end mb-8">
                        <div className="col-lg-8">
                            <h1 className="display-5 fw-bold n5-color mb-4">{presentation.title}</h1>
                            <div className="d-flex flex-wrap gap-4 fs-seven n4-color">
                                <div className="d-flex align-items-center gap-2">
                                    <PiCalendarBlank className="fs-5 p1-color" />
                                    <span>{presentation.date}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <PiClock className="fs-5 p1-color" />
                                    <span>{presentation.time}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <PiTag className="fs-5 p1-color" />
                                    <span>{presentation.tags.join(", ")}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-lg-end gap-2">
                            <button className="btn btn-outline-light d-flex align-items-center gap-2 rounded-pill px-3 py-2 n5-color border-secondary-subtle" onClick={handleCopyLink}>
                                <PiLinkSimple /> Copy
                            </button>
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(presentation.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light rounded-circle p-2 n5-color border-secondary-subtle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                <PiTwitterLogo />
                            </a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light rounded-circle p-2 n5-color border-secondary-subtle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                <PiLinkedinLogo />
                            </a>
                        </div>
                    </div>

                    {/* Layout: Main Content + Sidebar */}
                    <div className="row g-5">
                        <div className="col-lg-8">
                            {/* Slides Embed */}
                            <div className="mb-8" id="presentation">
                                <GoogleSlidesEmbed slidesId={presentation.slidesId} />
                                <div className="mt-3 fs-eight text-muted text-center d-flex align-items-center justify-content-center gap-2">
                                    <span>Use arrow keys or click to navigate slides. Press 'F' or Fullscreen icon for best experience.</span>
                                </div>
                            </div>

                            {/* Overview */}
                            {presentation.overview && (
                                <div className="mb-8">
                                    <h3 className="fw-semibold n5-color mb-4 d-flex align-items-center gap-2">
                                        <PiCheckCircle className="p1-color" /> What You'll Learn
                                    </h3>
                                    <div className="bg-light-subtle p-5 rounded-4 border border-light-subtle">
                                        <ul className="d-flex flex-column gap-3 mb-0">
                                            {presentation.overview.map((item, idx) => (
                                                <li key={idx} className="d-flex gap-3 n4-color">
                                                    <span className="p1-color mt-1">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Key Concepts */}
                            {presentation.keyConcepts && (
                                <div className="mb-8">
                                    <h3 className="fw-semibold n5-color mb-4 d-flex align-items-center gap-2">
                                        <PiBookOpenText className="p1-color" /> Key Concepts Covered
                                    </h3>
                                    <div className="accordion" id="conceptsAccordion">
                                        {presentation.keyConcepts.map((concept, idx) => (
                                            <div className="accordion-item border-0 mb-3 rounded-4 overflow-hidden bg-white shadow-sm" key={idx}>
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed bg-transparent shadow-none fw-medium n5-color" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`}>
                                                        {concept.term}
                                                    </button>
                                                </h2>
                                                <div id={`collapse${idx}`} className="accordion-collapse collapse" data-bs-parent="#conceptsAccordion">
                                                    <div className="accordion-body n4-color pt-0">
                                                        {concept.definition}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="position-sticky" style={{ top: "100px" }}>

                                {/* Download / Actions */}
                                <div className="p-5 rounded-4 bg-glass border border-white-10 shadow-sm mb-6">
                                    <h4 className="fw-semibold n5-color mb-4 fs-six">Resources</h4>
                                    <div className="d-flex flex-column gap-3">
                                        <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100 py-3 rounded-pill fw-medium">
                                            <PiDownloadSimple size={20} /> Download PDF
                                        </button>
                                        <a
                                            href={`https://docs.google.com/presentation/d/e/${presentation.slidesId}/pub?start=false&loop=false&delayms=3000`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 w-100 py-3 rounded-pill fw-medium n5-color border-secondary-subtle"
                                        >
                                            <PiPresentationChart size={20} /> Open in Google Slides
                                        </a>
                                    </div>
                                </div>

                                {/* TOC */}
                                {presentation.toc && (
                                    <div className="p-5 rounded-4 bg-light-subtle border border-light-subtle mb-6">
                                        <h4 className="fw-semibold n5-color mb-4 fs-six d-flex align-items-center gap-2">
                                            <PiListNumbers className="p1-color" /> Slide Overview
                                        </h4>
                                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0 fs-seven n4-color">
                                            {presentation.toc.map((item, idx) => (
                                                <li key={idx} className="pb-2 border-bottom border-light-subtle last-border-0">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Additional Resources */}
                                {presentation.additionalResources && (
                                    <div className="p-5 rounded-4 bg-light-subtle border border-light-subtle">
                                        <h4 className="fw-semibold n5-color mb-4 fs-six d-flex align-items-center gap-2">
                                            <PiLinkSimple className="p1-color" /> Further Reading
                                        </h4>
                                        <ul className="d-flex flex-column gap-3 mb-0 list-unstyled">
                                            {presentation.additionalResources.map((res, idx) => (
                                                <li key={idx}>
                                                    <a href={res.url} target="_blank" rel="noreferrer" className="text-decoration-none p1-color hover-underline d-flex align-items-start gap-2">
                                                        <span>→</span>
                                                        <span>{res.text}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>

                    {/* Related Presentations */}
                    <div className="mt-15 border-top border-light-subtle pt-10">
                        <h3 className="fw-semibold n5-color mb-8">Related Presentations</h3>
                        <div className="row g-4">
                            {related.map(p => (
                                <PresentationCard key={p.id} {...p} />
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link href="/presentations" className="btn btn-outline-primary rounded-pill px-6 py-3 fw-medium">
                                View All Presentations
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PresentationDetailsClient;
