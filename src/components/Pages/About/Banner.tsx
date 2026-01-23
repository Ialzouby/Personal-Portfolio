"use client";

import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { PiStarFill, PiArrowDown } from "react-icons/pi";
import TypingEffect from "@/components/TypingEffect/TypingEffect";
import project21 from "@/../public/images/projects/robot.png";
import mmm272 from "@/../public/images/projects/avatar.png";
import FeaturedProjectModal from "./FeaturedProjectModal";
import Counter from "./Counter";

interface ProjectData {
  title: string;
  description: string;
  image: StaticImageData;
  category: string[];
  portfolioLink: string;
}

const Banner = () => {
  const texts = ["Engineer", "Researcher", "Innovator"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isFeaturedPopupOpen, setIsFeaturedPopupOpen] = useState(true);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Detect when banner is in view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBannerVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  const projects: ProjectData[] = [
    {
      title: "MMM-272: Text-to-Motion",
      description:
        "State-of-the-art text-to-motion generation with 272-dimensional representation achieving FID 10.4567. Features direct SMPL rotation recovery, eliminating IK artifacts for production-ready BVH output in Unity, Unreal, and Blender.",
      image: mmm272,
      category: ["Text-to-Motion", "AI/ML"],
      portfolioLink: "/portfolio-details/21",
    },
    {
      title: "Humanoid Robot",
      description:
        "Advanced humanoid robotics system integrating AI-powered motion control, computer vision, and real-time sensor fusion. Features autonomous navigation, human interaction capabilities, and adaptive learning algorithms for dynamic environments.",
      image: project21,
      category: ["AI/ML", "Robotics"],
      portfolioLink: "/portfolio-details/20",
    },
  ];


  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <style jsx>{`
        .banner-centered-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          min-height: 100%;
          padding: 2rem 1rem;
          gap: 1.5rem;
        }

        /* Glassmorphism Container */
        .glass-container {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 24px;
          padding: 3.5rem 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
          max-width: 800px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Subtle gradient overlay for depth */
        .glass-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.05) 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* Dark mode glass effect */
        [data-theme="dark"] .glass-container {
          background: rgba(30, 30, 40, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }

        [data-theme="dark"] .glass-container::before {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.02) 100%);
        }

        .banner-text-section {
          max-width: 700px;
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .banner-text-section h2 {
          font-size: clamp(2rem, 5vw, 3.5rem);
        }

        .banner-text-section p {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          max-width: 600px;
          margin: 0 auto;
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-top: auto;
          animation: bounce 2s infinite;
          cursor: pointer;
          color: rgba(var(--n5), 0.7);
          transition: color 0.3s ease;
        }

        .scroll-indicator:hover {
          color: rgba(var(--p1), 1);
        }

        .scroll-indicator span {
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        /* Featured Work Popup Card */
        .featured-popup {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          max-width: 320px;
          z-index: 1000;
          animation: slideIn 0.5s ease-out;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .featured-popup.hidden {
          opacity: 0;
          transform: translateX(300px);
          pointer-events: none;
        }

        .featured-popup.closed {
          animation: slideOut 0.3s ease-out forwards;
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        .featured-popup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.6rem;
        }

        .featured-popup-header h3 {
          font-size: 0.85rem !important;
        }

        .featured-popup-header svg {
          width: 14px;
          height: 14px;
        }

        .featured-popup-close {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.5);
          transition: color 0.2s;
          padding: 0;
          line-height: 1;
        }

        .featured-popup-close:hover {
          color: rgba(0, 0, 0, 0.8);
        }

        .featured-popup-projects {
          display: flex;
          flex-direction: row;
          gap: 0.6rem;
        }

        .featured-popup-card {
          display: flex;
          flex-direction: column;
          flex: 1;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .featured-popup-card:hover {
          transform: translateY(-2px);
        }

        .featured-popup-img {
          width: 100%;
          aspect-ratio: 210 / 290;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 0.3rem;
        }

        .featured-popup-info {
          flex: 1;
        }

        .featured-popup-info h4 {
          font-size: 0.65rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: #1a1a1a;
          line-height: 1.2;
        }

        .featured-popup-info span {
          font-size: 0.5rem;
          padding: 2px 6px;
          background: rgba(var(--p1), 0.1);
          color: rgba(var(--p1), 1);
          border-radius: 6px;
          display: inline-block;
          margin-right: 3px;
          margin-bottom: 3px;
        }

        @media (max-width: 768px) {
          .banner-centered-layout {
            gap: 1.5rem;
            padding: 2rem 1rem;
          }

          .glass-container {
            padding: 2.5rem 1.5rem;
            border-radius: 20px;
          }

          .banner-text-section {
            text-align: center;
          }

          .banner-text-section span {
            font-size: clamp(0.9rem, 3vw, 1rem);
          }

          .typing-text {
            font-size: clamp(2rem, 8vw, 3rem) !important;
          }

          .banner-text-section p {
            font-size: clamp(0.95rem, 4vw, 1.1rem);
            line-height: 1.6;
          }

          .featured-popup {
            bottom: 0.5rem;
            right: 0.5rem;
            max-width: 280px;
            padding: 0.75rem;
          }

          .featured-popup-projects {
            flex-direction: row;
            gap: 0.5rem;
          }
          
          .featured-popup-img {
            aspect-ratio: 210 / 290;
          }
          
          .featured-popup-info h4 {
            font-size: 0.6rem;
          }
          
          .featured-popup-info span {
            font-size: 0.45rem;
            padding: 1px 4px;
          }

          .scroll-indicator {
            bottom: 1rem;
          }
        }

        @media (max-width: 480px) {
          .banner-centered-layout {
            gap: 1.2rem;
            padding: 1.5rem 0.75rem;
          }

          .glass-container {
            padding: 2rem 1rem;
            border-radius: 16px;
          }

          .banner-text-section span {
            font-size: 0.85rem;
          }

          .typing-text {
            font-size: clamp(1.8rem, 9vw, 2.5rem) !important;
          }

          .banner-text-section p {
            font-size: 0.9rem;
            line-height: 1.5;
          }

          .featured-popup {
            max-width: 240px;
            padding: 0.6rem;
          }
        }
      `}</style>

      <div className="banner-centered-layout" ref={bannerRef}>
        {/* Main Text Section with Glassmorphism */}
        <div className="glass-container">
          <div className="banner-text-section">
            <span className="n5-color fs-three fw-medium">HI, I&apos;M ISSAM A</span>
            <h2 className="typing-text display-one p1-color mt-3 mb-3" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
              <TypingEffect texts={texts} speed={200} pause={2000} />
            </h2>
            <p className="fs-five n5-color">
              My focus is on developing AI4Health solutions that can help improve the lives of people around the world.
            </p>
          </div>
        </div>

        {/* Divider Line */}
        <div 
          className="banner-divider"
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "1px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            margin: "1rem auto"
          }}
        ></div>

        {/* Counter Stats */}
        <div className="d-none d-sm-block">
          <Counter />
        </div>

        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span></span>
          <PiArrowDown size={28} />
        </div>

        <FeaturedProjectModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
      </div>

      {/* Featured Work Popup */}
      {isFeaturedPopupOpen && (
        <div className={`featured-popup ${!isBannerVisible ? 'hidden' : ''}`}>
          <div className="featured-popup-header">
            <div className="d-flex align-items-center gap-2">
              <PiStarFill className="p1-color" size={16} />
              <h3 className="fs-seven fw-semibold mb-0 banner-featured-text">
                Featured Work
              </h3>
            </div>
            <button
              className="featured-popup-close"
              onClick={() => setIsFeaturedPopupOpen(false)}
              aria-label="Close featured work"
            >
              ×
            </button>
          </div>

          <div className="featured-popup-projects">
            <div
              className="featured-popup-card"
              onClick={() => handleProjectClick(projects[0])}
            >
              <div className="featured-popup-img">
                <Image
                  src={projects[0].image}
                  alt={projects[0].title}
                  width={210}
                  height={290}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="featured-popup-info">
                <div>
                  {projects[0].category.map((cat, idx) => (
                    <span key={idx}>{cat}</span>
                  ))}
                </div>
                <h4>{projects[0].title}</h4>
              </div>
            </div>

            <div
              className="featured-popup-card"
              onClick={() => handleProjectClick(projects[1])}
            >
              <div className="featured-popup-img">
                <Image
                  src={projects[1].image}
                  alt={projects[1].title}
                  width={210}
                  height={290}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="featured-popup-info">
                <div>
                  {projects[1].category.map((cat, idx) => (
                    <span key={idx}>{cat}</span>
                  ))}
                </div>
                <h4>{projects[1].title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;