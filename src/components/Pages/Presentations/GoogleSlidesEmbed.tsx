"use client";

import { useState } from "react";

const GoogleSlidesEmbed = ({ slidesId }: { slidesId: string }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="slides-container position-relative rounded-4 overflow-hidden border shadow-sm" style={{ background: "#000" }}>
            {/* Loading Indicator */}
            {isLoading && (
                <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center text-white z-1" style={{ top: 0, left: 0 }}>
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {/* 
        Aspect Ratio Box used to maintain 16:9 
        padding-bottom calculation: 9 / 16 * 100 = 56.25%
      */}
            <div style={{ position: "relative", width: "100%", height: 0, paddingBottom: "56.25%" }}>
                <iframe
                    src={`https://docs.google.com/presentation/d/e/${slidesId}/embed?start=false&loop=false&delayms=3000`}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowFullScreen={true}
                    // mozallowfullscreen="true"
                    // webkitallowfullscreen="true"
                    onLoad={() => setIsLoading(false)}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    title="Google Slides Presentation"
                ></iframe>
            </div>
        </div>
    );
};

export default GoogleSlidesEmbed;
