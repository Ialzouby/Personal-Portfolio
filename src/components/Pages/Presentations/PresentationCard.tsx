"use client";

import FadeDown from "@/components/motionEffect/FadeDown";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { PiClock, PiPresentationChart } from "react-icons/pi";

interface PresentationCardProps {
    img: StaticImageData;
    date: string;
    time: string;
    tags: string[];
    title: string;
    description: string;
    slug: string;
    fileId?: string;
    slidesId?: string;
}

const PresentationCard = ({
    img,
    date,
    time,
    tags, // Expecting an array of strings
    title,
    description,
    slug,
    fileId,
    slidesId,
}: PresentationCardProps) => {
    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4">
            <FadeDown>
                <Link
                    href={`/presentations/${slug}`}
                    className="presentation-card d-flex flex-column h-100 text-decoration-none"
                    style={{
                        background: "var(--bg-glass)",
                        borderRadius: "16px", // Modern rounded corners
                        overflow: "hidden",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        border: "1px solid rgba(var(--n5), 0.1)",
                        height: "100%",
                        display: "block",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
                        e.currentTarget.style.borderColor = "rgba(var(--p1), 0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "rgba(var(--n5), 0.1)";
                    }}
                >
                    {/* Thumbnail / Slides Preview */}
                    <div
                        className="presentation-img overflow-hidden position-relative"
                        style={{
                            aspectRatio: "16/9",
                            width: "100%",
                        }}
                    >
                        {slidesId ? (
                            <div className="w-100 h-100 bg-secondary-subtle">
                                <iframe
                                    src={`https://docs.google.com/presentation/d/e/${slidesId}/embed?start=false&loop=false&delayms=3000&rm=minimal`}
                                    frameBorder="0"
                                    width="100%"
                                    height="100%"
                                    allowFullScreen={true}
                                    style={{
                                        objectFit: "cover",
                                        pointerEvents: "none", // Prevent interaction
                                    }}
                                    title="Slide Preview"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        ) : (
                            <Image
                                src={fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w800` : img}
                                alt={title}
                                fill={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="w-100 h-100"
                                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                            />
                        )}

                        {/* Overlay to capture clicks and provide gradient */}
                        <div
                            className="position-absolute w-100 h-100 top-0 start-0"
                            style={{
                                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                                zIndex: 10, // Ensure this sits on top of the iframe
                            }}
                        ></div>

                        {/* Type Badge */}
                        <div className="position-absolute top-0 end-0 m-3" style={{ zIndex: 11 }}>
                            <span className="badge rounded-pill bg-primary px-3 py-2 d-flex align-items-center gap-2">
                                <PiPresentationChart size={16} />
                                <span className="fw-medium">Slides</span>
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 d-flex flex-column flex-grow-1">
                        {/* Metadata Row */}
                        <div className="d-flex align-items-center justify-content-between mb-3 fs-nine n4-color">
                            <span className="d-flex align-items-center gap-1">
                                <i className="bi bi-calendar"></i> {date}
                            </span>
                            <span className="d-flex align-items-center gap-1">
                                <PiClock /> {time}
                            </span>
                        </div>

                        {/* Title */}
                        <h4
                            className="n5-color fw-semibold mb-3"
                            style={{
                                fontSize: "1.25rem",
                                lineHeight: "1.4",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {title}
                        </h4>

                        {/* Description */}
                        <p className="n4-color fs-seven mb-4" style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            opacity: 0.9
                        }}>
                            {description}
                        </p>

                        {/* Tags & Action - Pushed to bottom */}
                        <div className="mt-auto pt-3 border-top border-light-subtle">
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {tags.slice(0, 2).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 rounded-2 bg-light-subtle fs-nine fw-medium n5-color border"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {tags.length > 2 && (
                                    <span className="px-2 py-1 rounded-2 bg-light-subtle fs-nine fw-medium n5-color border">+{tags.length - 2}</span>
                                )}
                            </div>

                            <div className="d-flex align-items-center text-primary fw-semibold gap-2 fs-seven">
                                View Presentation
                                <span className="d-inline-block transition-transform" style={{ transition: "transform 0.2s" }}>→</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </FadeDown>
        </div>
    );
};

export default PresentationCard;
