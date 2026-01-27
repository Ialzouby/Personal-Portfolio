"use client";

import { useState, useMemo } from "react";
import { presentations } from "@/../public/data/PresentationData";
import PresentationCard from "./PresentationCard";
import { PiMagnifyingGlass, PiFaders } from "react-icons/pi"; // Ensure icons are available or use similar

const tags = [
    "All Topics",
    "Generative Models",
    "NLP & Transformers",
    "Computer Vision",
    "Deep Learning Fundamentals"
];

const PresentationList = () => {
    const [activeTag, setActiveTag] = useState("All Topics");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPresentations = useMemo(() => {
        return presentations.filter((item) => {
            // 1. Tag Filtering
            const matchesTag = activeTag === "All Topics" || item.tags.includes(activeTag);

            // 2. Search Filtering
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.tags.some(tag => tag.toLowerCase().includes(query));

            return matchesTag && matchesSearch;
        });
    }, [activeTag, searchQuery]);

    return (
        <div className="pb-120">
            <div className="container">
                {/* Filter & Search Section */}
                <div className="row justify-content-center mb-10">
                    <div className="col-12 col-lg-10">
                        <div className="p-4 p-md-5 rounded-4 bg-glass border border-white-10 shadow-sm">
                            {/* Search Bar */}
                            <div className="position-relative mb-6 rounded-3 overflow-hidden"
                                style={{
                                    background: "rgba(var(--p1), 0.05)",
                                    border: "1px solid rgba(var(--p1), 0.2)",
                                    backdropFilter: "blur(5px)"
                                }}
                            >
                                <div className="position-absolute top-50 start-0 translate-middle-y ps-4 n4-color">
                                    <PiMagnifyingGlass size={20} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search presentations by topic or keyword..."
                                    className="form-control py-3 shadow-none n5-color placeholder-n4 bg-transparent border-0"
                                    style={{ fontSize: "1rem", paddingLeft: "5rem" }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Tags */}
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                                {tags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setActiveTag(tag)}
                                        className={`btn rounded-pill px-4 py-2 fw-medium fs-seven transition-all ${activeTag === tag
                                            ? "bg-primary text-white shadow-sm"
                                            : "bg-light text-dark border hover-bg-light-dark"
                                            }`}
                                        style={{
                                            transition: "all 0.2s ease",
                                            border: activeTag === tag ? "none" : "1px solid rgba(0,0,0,0.1)"
                                        }}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="row g-4">
                    {filteredPresentations.length > 0 ? (
                        filteredPresentations
                            .sort((a, b) => b.id - a.id) // Show newest first
                            .map((item) => (
                                <PresentationCard
                                    key={item.id}
                                    {...item}
                                />
                            ))
                    ) : (
                        <div className="col-12 text-center py-10">
                            <div className="mb-4 text-muted opacity-50">
                                <PiFaders size={64} />
                            </div>
                            <h4 className="fs-5 n5-color">No presentations found</h4>
                            <p className="n4-color">Try adjusting your search or filters.</p>
                            <button
                                className="btn btn-link text-primary mt-2"
                                onClick={() => { setActiveTag("All Topics"); setSearchQuery(""); }}
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PresentationList;
