"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

export const MermaidVisual = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    });

    const renderChart = async () => {
      try {
        if (ref.current) {
          const id = `mermaid-${Math.random().toString(36).substring(7)}`;
          const { svg } = await mermaid.render(id, chart);
          if (ref.current) { // Check again after await
            ref.current.innerHTML = svg;
          }
        }
      } catch (err) {
        console.error("Mermaid rendering failed:", err);
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="card rounded-4 shadow-sm overflow-hidden mb-5 p-4 d-flex justify-content-center align-items-center bg-white">
      <div ref={ref} className="w-100 d-flex justify-content-center overflow-x-auto" />
    </div>
  );
};

export default MermaidVisual;
