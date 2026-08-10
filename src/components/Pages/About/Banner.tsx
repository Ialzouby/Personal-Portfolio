"use client";

import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      portfolioLink: "/portfolio-details/22",
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
          height: auto;
          margin: 0 1rem;
        }

        .hero-text-container h2 {
          font-size: clamp(2rem, 6vw, 4.5rem);
          line-height: 1.1;
        }

        .hero-text-container p {
          font-size: clamp(0.9rem, 1.5vw, 1.2rem);
          line-height: 1.6;
          max-width: 90%;
        }

        /* Right Side Cards */
        .right-column-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          max-width: clamp(280px, 40vw, 400px); /* Dynamic width scaling */
          margin-left: auto;
          padding: 0 1rem;
          padding-top: 0;
          /* Removed margin-top to allow true centering via align-items-center */
        }

        .card-header-sm {
          font-size: clamp(0.6rem, 1vw, 0.7rem);
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
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .presentation-preview-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .presentation-iframe-wrapper {
          width: 35%; /* Responsive width instead of fixed 120px */
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
           transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .awards-card:hover {
           transform: translateY(-5px);
           box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
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
             font-size: clamp(0.5rem, 0.8vw, 0.6rem);
             padding: 2px 6px;
             background: rgba(var(--p1), 0.1);
             color: rgba(var(--p1), 1);
             border-radius: 4px;
             white-space: nowrap;
        }

        .project-title-sm {
            font-size: clamp(0.65rem, 1vw, 0.75rem);
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

        /* Tablet/Small Desktop & Mobile Optimization */
        /* Tablet & Mobile Optimization (Up to 991px) */
        @media (max-width: 991px) {
          .banner-section .container {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          
          .banner-section {
            height: auto;
            min-height: auto;
            padding-top: 6.5rem;
            padding-bottom: 5rem;
          }

          .mobile-contents {
            display: contents !important;
          }

          .order-1-mobile { order: 1 !important; }
          .order-2-mobile { order: 2 !important; }
          .order-3-mobile { order: 3 !important; }

          .banner-section .container .row.g-5 {
            margin-left: 0 !important;
            margin-right: 0 !important;
            row-gap: 1.25rem !important;
            display: flex;
            flex-direction: column;
          }

          /* Left column (Issam) and Right column adjustments */
          .banner-section .col-lg-8, .banner-section .col-lg-4 {
            padding-top: 0 !important;
            margin-top: 0 !important;
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }

          .hero-text-container {
            padding: 1.25rem !important;
            text-align: center;
            align-items: center;
            margin: 0 !important;
            width: 100% !important;
          }

          .glass-card {
            width: 100% !important;
            border-radius: 18px; /* Slightly softer for mobile */
          }

          .hero-text-container h2 {
            font-size: clamp(1.75rem, 8vw, 2.75rem);
            margin-bottom: 1rem !important;
            line-height: 1.2;
          }

          .hero-text-container p {
            font-size: clamp(0.875rem, 3.5vw, 1rem);
            margin-bottom: 1.5rem !important;
            max-width: 100%;
          }

          .hero-text-container .fs-four {
            font-size: 1.5rem !important;
          }

          /* Button adjustments for mobile */
          .hero-text-container .d-flex.gap-4 {
            flex-direction: row;
            gap: 0.75rem !important;
            width: 100%;
            justify-content: center;
          }

          .hero-text-container .btn {
            width: auto;
            flex: 0 1 auto;
            padding: 0.7rem 1.25rem !important;
            font-size: 0.875rem !important;
            white-space: nowrap;
          }

          /* Counter section - hidden on mobile for better flow */
          .hero-text-container .mt-8 {
            display: none !important;
          }

          /* Cards Stack adjustments */
          .right-column-stack {
            max-width: 100% !important;
            width: 100% !important;
            gap: 1.25rem !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .featured-projects-card, .presentation-preview-card, .awards-card {
            padding: 1.25rem !important;
            margin: 0 !important;
          }

          .card-header-sm {
            font-size: 0.65rem;
            margin-bottom: 0.5rem;
          }

          /* Components adjustments */
          .presentation-preview-card h4 { font-size: 0.875rem !important; }
          .presentation-iframe-wrapper { width: 30%; min-width: 80px; }
          .award-item { gap: 0.5rem; padding: 0.5rem 0; }
          .award-item .fw-semibold { font-size: 0.875rem !important; }
          .award-item .fs-nine { font-size: 0.7rem !important; }
          .project-img-wrapper { width: 100%; margin-bottom: 0.75rem; }
          .project-tag { font-size: 0.6rem; padding: 3px 6px; }
          .project-title-sm { font-size: 0.75rem; }

          /* Scroll indicator */
          .scroll-indicator {
            bottom: 1.5rem;
            font-size: 0.75rem;
          }
          .scroll-indicator svg { width: 22px; height: 22px; }
        }

        /* Small Mobile Devices */
        @media (max-width: 480px) {
          .banner-section {
            padding-top: 5rem;
            padding-bottom: 4rem;
          }

          .hero-text-container {
            padding: 1.25rem !important;
            border-radius: 16px;
          }

          .hero-text-container h2 {
            font-size: clamp(1.5rem, 9vw, 2rem);
            margin-bottom: 0.75rem !important;
          }

          .hero-text-container p {
            font-size: 0.875rem;
            line-height: 1.5;
            margin-bottom: 1.25rem !important;
          }

          .hero-text-container .fs-four {
            font-size: 1.25rem !important;
            margin-bottom: 0.5rem !important;
          }

          .hero-text-container .btn {
            padding: 0.65rem 1rem !important;
            font-size: 0.875rem !important;
          }

          /* Uniform spacing on small screens */
          .banner-section .container .row.g-5 {
            --bs-gutter-y: 1.25rem !important;
            row-gap: 1.25rem !important;
          }

          .glass-card {
            border-radius: 16px;
          }

          .right-column-stack {
            gap: 1.25rem !important;
          }

          .presentation-preview-card,
          .awards-card,
          .featured-projects-card {
            padding: 1.25rem;
          }

          .card-header-sm {
            font-size: 0.6rem;
          }

          .presentation-preview-card h4 {
            font-size: 0.8rem !important;
          }

          .award-item .fw-semibold {
            font-size: 0.8rem !important;
          }

          .award-item .fs-nine {
            font-size: 0.65rem !important;
          }

          .project-img-wrapper {
            aspect-ratio: 1 / 1;
          }

          .project-title-sm {
            font-size: 0.7rem;
          }

          .project-tag {
            font-size: 0.55rem;
            padding: 2px 5px;
          }
        }

        /* Landscape Mobile Devices */
        @media (max-width: 768px) and (orientation: landscape) {
          .banner-section {
            height: auto;
            min-height: auto;
            padding-top: 4rem;
            padding-bottom: 2rem;
          }

          .hero-text-container h2 {
            font-size: 1.75rem;
            margin-bottom: 0.5rem !important;
          }

          .hero-text-container p {
            font-size: 0.875rem;
            margin-bottom: 1rem !important;
          }

          .hero-text-container .d-flex.gap-4 {
            flex-direction: row;
            gap: 1rem !important;
          }

          .hero-text-container .btn {
            width: auto;
            padding: 0.5rem 1rem !important;
            font-size: 0.875rem !important;
          }

          .right-column-stack {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }

          .banner-section .col-lg-4 {
            padding-top: 0 !important;
            margin-top: -1rem !important;
          }
        }

      `}</style>

      <div className="banner-section" ref={bannerRef}>
        <div className="container">
          <div className="row align-items-center g-5">
            {/* LEFT COLUMN: Main Text */}
            <div className="col-lg-8 order-2 order-lg-1 mobile-contents">
              <div className="glass-card hero-text-container order-1-mobile">
                <span className="n5-color fs-four fw-medium d-inline-block mb-2">HI, I&apos;M ISSAM </span>
                <h2 className="typing-text display-one p1-color mb-4 fw-bold">
                  <TypingEffect texts={texts} speed={200} pause={2000} />
                </h2>
                <p className="fs-five n5-color opacity-75 mb-6">
                  I am a PhD student at UNC Charlotte. My research focuses on generative models for human motion synthesis and perception. I develop AI systems for controllable, physically plausible motion generation. Currently exploring how language-guided learning can enable natural movement in humanoid robotics, and real-time digital twins across physical and virtual environments.
                </p>

                <div className="d-flex gap-4 mt-2">
                  <Link href="/portfolio" className="btn btn-primary rounded-pill px-5 py-3 fw-semibold d-flex align-items-center gap-2">
                    Portfolio <PiArrowRight />
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
            <div className="col-lg-4 order-1 order-lg-2 mobile-contents">
              <div className="right-column-stack mobile-contents">

                {/* 1. Featured Work Card - PLACED AT TOP ON MOBILE */}
                <div className="glass-card featured-projects-card order-2-mobile">
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

                {/* 2. Latest Presentation Card */}
                {latestPresentation && (
                  <div
                    className="glass-card presentation-preview-card order-3-mobile"
                    onClick={() => router.push(`/presentations/${latestPresentation.slug}`)}
                  >
                    <div className="card-header-sm">
                      <PiPresentationChart size={16} /> Latest Topic
                    </div>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex flex-column gap-1">
                        <h4 className="fw-semibold n5-color mb-0 line-clamp-2" style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}>{latestPresentation.title}</h4>
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

                {/* 3. Recent Awards Card */}
                <div
                  className="glass-card awards-card order-3-mobile"
                  onClick={() => router.push('/portfolio')}
                  style={{ cursor: "pointer" }}
                >
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
                          <div className="fw-semibold n5-color" style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}>{award.title}</div>
                          <div className="fs-nine n4-color opacity-75">{award.event}</div>
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