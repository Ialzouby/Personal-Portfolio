"use client";

import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { PiStarFill, PiArrowDown, PiTrophyFill, PiPresentationChart, PiArrowRight } from "react-icons/pi";
import TypingEffect from "@/components/TypingEffect/TypingEffect";
import project21 from "@/../public/images/projects/robot.png";
import mmm272 from "@/../public/images/projects/avatar.png";
import FeaturedProjectModal from "./FeaturedProjectModal";
import ContactModal from "@/components/Shared/ContactModal";
import Counter from "./Counter";
import { presentations } from "../../../../public/data/PresentationData";

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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

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

  // Get latest presentation (assuming last in array or sort by ID)
  const latestPresentation = [...presentations].sort((a, b) => b.id - a.id)[0];

  const awards = [
    { title: "Global Nominee", event: "NASA Space Apps 2025" },
    { title: "1st Place", event: "NC State Programming Contest" }
  ];

  return (
    <>
      <style jsx>{`
        .banner-section {
          height: 100vh;
          min-height: 600px; /* Prevent being too small on short screens */
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          padding: 0;
          overflow: hidden;
        }

        /* Glassmorphism Base Class */
        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .glass-card:hover {
          border-color: rgba(var(--p1), 0.3);
        }

        /* Dark mode adjustments */
        [data-theme="dark"] .glass-card {
          background: rgba(30, 30, 40, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }

        /* Hero Text Container */
        .hero-text-container {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          height: 100%;
        }

        .hero-text-container h2 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height: 1.1;
        }

        .hero-text-container p {
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          line-height: 1.6;
          max-width: 90%;
        }

        /* Right Side Cards */
        .right-column-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          max-width: 400px; /* Increased to 400px */
          margin-left: auto;
          margin-top: 5rem; /* Moves the cards down */
        }

        .card-header-sm {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          color: rgba(var(--p1), 1);
          margin-bottom: 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Presentation Card Specifics */
        .presentation-preview-card {
          padding: 0.75rem;
        }

        .presentation-iframe-wrapper {
          width: 120px;
          flex-shrink: 0;
          aspect-ratio: 16/9;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          background: #000;
        }

        .presentation-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          background: transparent; 
        }

        /* Awards Card Specifics */
        .awards-card {
           padding: 0.75rem;
        }

        .award-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.35rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .award-item:last-child {
          border-bottom: none;
        }

        /* Featured Projects Card Specifics */
        .featured-projects-card {
           padding: 0.75rem;
        }

        .projects-row {
          display: flex;
          gap: 1rem;
        }

        .project-vertical {
            flex: 1;
            display: flex;
            flex-direction: column;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .project-vertical:hover {
            transform: translateY(-2px);
        }

        .project-img-wrapper {
            width: 85%;
            margin: 0 auto 0.5rem auto;
            aspect-ratio: 21/29; /* Original portrait ratio */
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }

        .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-bottom: 4px;
        }

        .project-tag {
             font-size: 0.6rem;
             padding: 2px 6px;
             background: rgba(var(--p1), 0.1);
             color: rgba(var(--p1), 1);
             border-radius: 4px;
             white-space: nowrap;
        }

        .project-title-sm {
            font-size: 0.75rem;
            font-weight: 600;
            color: rgba(var(--n5), 0.9);
            line-height: 1.3;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          animation: bounce 2s infinite;
          cursor: pointer;
          color: rgba(var(--n5), 0.7);
          z-index: 10;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        @media (max-width: 991px) {
          .banner-section {
            height: auto;
            padding-top: 8rem;
            padding-bottom: 4rem;
          }
          
          .right-column-stack {
            margin-right: auto;
            margin-top: 2rem;
          }

          .hero-text-container {
            padding: 1.5rem;
            text-align: center;
            align-items: center;
          }
        }
      `}</style>

      <div className="banner-section" ref={bannerRef}>
        <div className="container">
          <div className="row align-items-center g-5">
            {/* LEFT COLUMN: Main Text */}
            <div className="col-lg-7">
              <div className="glass-card hero-text-container">
                <span className="n5-color fs-four fw-medium d-inline-block mb-2">HI, I&apos;M ISSAM </span>
                <h2 className="typing-text display-one p1-color mb-4 fw-bold">
                  <TypingEffect texts={texts} speed={200} pause={2000} />
                </h2>
                <p className="fs-five n5-color opacity-75 mb-6">
                  My focus is on developing AI4Health solutions that can help improve the lives of people around the world.
                  Building the future of digital twins and motion modeling.
                </p>

                <div className="d-flex gap-4 mt-2">
                  <Link href="/portfolio" className="btn btn-primary rounded-pill px-5 py-3 fw-semibold d-flex align-items-center gap-2">
                    View Portfolio <PiArrowRight />
                  </Link>
                  <button onClick={() => setIsContactOpen(true)} className="btn btn-outline-primary rounded-pill px-5 py-3 fw-semibold border-2 d-flex align-items-center gap-2 n5-color">
                    Contact Me
                  </button>
                </div>

                <div className="mt-8 pt-6 border-top border-light-subtle w-100">
                  <Counter />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Cards Stack */}
            <div className="col-lg-5">
              <div className="right-column-stack">

                {/* 1. Latest Presentation Card */}
                {latestPresentation && (
                  <div className="glass-card presentation-preview-card">
                    <div className="card-header-sm">
                      <PiPresentationChart size={16} /> Latest Topic
                    </div>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex flex-column gap-1">
                        <h4 className="fs-eight fw-semibold n5-color mb-0 line-clamp-2">{latestPresentation.title}</h4>
                        <Link href={`/presentations/${latestPresentation.slug}`} className="fs-nine p1-color text-decoration-none fw-medium d-flex align-items-center gap-1">
                          View <PiArrowRight size={12} />
                        </Link>
                      </div>
                      {latestPresentation.slidesId && (
                        <div className="presentation-iframe-wrapper">
                          <iframe
                            src={`https://docs.google.com/presentation/d/e/${latestPresentation.slidesId}/embed?start=false&loop=false&delayms=3000&rm=minimal`}
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            allowFullScreen={true}
                            style={{ pointerEvents: "none" }}
                            title="Latest Presentation"
                          ></iframe>
                          <Link href={`/presentations/${latestPresentation.slug}`} className="presentation-overlay" aria-label="View Presentation"></Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. Recent Awards Card */}
                <div className="glass-card awards-card">
                  <div className="card-header-sm">
                    <PiTrophyFill size={16} /> Recent Awards
                  </div>
                  <div className="d-flex flex-column">
                    {awards.map((award, idx) => (
                      <div key={idx} className="award-item">
                        <div className="p-2 rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center">
                          <PiTrophyFill size={12} />
                        </div>
                        <div>
                          <div className="fs-eight fw-semibold n5-color">{award.title}</div>
                          <div className="fs-nine n4-color opacity-75">{award.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Featured Work Card */}
                <div className="glass-card featured-projects-card">
                  <div className="card-header-sm">
                    <PiStarFill size={16} /> Featured Work
                  </div>
                  <div className="projects-row">
                    {projects.map((project, idx) => (
                      <div
                        key={idx}
                        className="project-vertical"
                        onClick={() => handleProjectClick(project)}
                      >
                        <div className="project-img-wrapper">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill={true}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <div className="project-tags">
                            {project.category.map((cat, i) => (
                              <span key={i} className="project-tag">{cat}</span>
                            ))}
                          </div>
                          <h5 className="project-title-sm">{project.title}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="scroll-indicator"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span>SCROLL</span>
          <PiArrowDown size={24} />
        </div>

        <FeaturedProjectModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </>
  );
};

export default Banner;