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

interface TechStackItem {
  name: string;
  url: string;
  category: "Software" | "Hardware" | "Platforms";
  viewBox?: string;
  color?: string;
  path?: string;
  paths?: { fill: string; d: string }[];
  img?: string;
}

const Banner = () => {
  const texts = ["Engineer", "Researcher", "Innovator"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isFeaturedPopupOpen, setIsFeaturedPopupOpen] = useState(true);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [activeSkillCategory, setActiveSkillCategory] = useState<"Software" | "Hardware" | "Platforms">("Software");
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

  // All tech stack items with categories
  const allTechStack: TechStackItem[] = [
    // Software
    { name: 'Python', category: 'Software', url: 'https://www.python.org/', img: '/images/python_logo.png' },
    { name: 'TensorFlow', category: 'Software', url: 'https://www.tensorflow.org/', img: '/images/tensorflow.png' },
    { name: 'PyTorch', category: 'Software', url: 'https://pytorch.org/', img: '/images/pytorch.png' },
    { name: 'MATLAB', category: 'Software', url: 'https://www.mathworks.com/products/matlab.html', img: '/images/matlab.png' },
    { name: 'JavaScript', category: 'Software', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', img: '/images/javascript.png' },
    { name: 'FastAPI', category: 'Software', url: 'https://fastapi.tiangolo.com/', img: '/images/fastapi_logo.png' },
    
    // Hardware
    { name: 'Arduino', category: 'Hardware', url: 'https://www.arduino.cc/', img: '/images/arduino.png' },
    { name: 'Raspberry Pi', category: 'Hardware', url: 'https://www.raspberrypi.org/', img: '/images/raspi_logo.png' },
    { name: 'NVIDIA', category: 'Hardware', url: 'https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+S-FX-01+V1', img: '/images/nvidia.png' },
    { name: 'ROS', category: 'Hardware', url: 'https://www.ros.org/', img: '/images/ros1_logo.png' },
    { name: 'ROS2', category: 'Hardware', url: 'https://www.ros.org/', img: '/images/ros_logo.png' },
    { name: 'Intel', category: 'Hardware', url: 'https://www.intelrealsense.com/sdk-2/', img: '/images/intel_logo.png' },
    
    // Platforms
    { name: 'GitHub', category: 'Platforms', url: 'https://github.com/nhathout', img: '/images/github_logo.png' },
    { name: 'Git', category: 'Platforms', url: 'https://git-scm.com/', img: '/images/git_logo.png' },
    { name: 'Docker', category: 'Platforms', url: 'https://www.docker.com/', img: '/images/docker_logo.png' },
    { name: 'Bambu Lab', category: 'Platforms', url: 'https://bambulab.com/en-us', img: '/images/bambulablogo.png' },
    { name: 'Ubuntu', category: 'Platforms', url: 'https://ubuntu.com/', img: '/images/ubuntu_logo.png' },
    { name: 'Linux', category: 'Platforms', url: 'https://www.kernel.org/', img: '/images/linux_logo.png' }
  ];

  // Filter tech stack by active category
  const filteredTechStack = allTechStack.filter(tech => tech.category === activeSkillCategory);

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
        /* 3D Cube Styles */
        .tech-stack-container {
          position: relative;
          margin: 0.5rem 0;
        }

        .tech-stack-row {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          padding: 0.5rem 0;
          overflow-x: auto;
          scrollbar-width: none;
          perspective: 1300px;
          perspective-origin: 50% 25%;
          scroll-behavior: smooth;
        }

        .tech-stack-row::-webkit-scrollbar {
          display: none;
        }

        .skill-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          gap: 0.4rem;
          color: inherit;
          text-decoration: none;
          flex-shrink: 0;
        }

        .skill-link:focus-visible {
          outline: 2px solid #00796b;
          outline-offset: 6px;
        }

        .skill-cube {
          --skill-size: clamp(2.5rem, 3.5vw, 3rem);
          --skill-half: calc(var(--skill-size) / 2);
          width: var(--skill-size);
          height: var(--skill-size);
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s ease;
          animation: skill-breathe 8s ease-in-out infinite;
        }

        .skill-cube:nth-child(1) { animation-delay: 0s; }
        .skill-cube:nth-child(2) { animation-delay: 0.3s; }
        .skill-cube:nth-child(3) { animation-delay: 0.6s; }
        .skill-cube:nth-child(4) { animation-delay: 0.9s; }
        .skill-cube:nth-child(5) { animation-delay: 1.2s; }
        .skill-cube:nth-child(6) { animation-delay: 1.5s; }
        .skill-cube:nth-child(7) { animation-delay: 1.8s; }
        .skill-cube:nth-child(8) { animation-delay: 2.1s; }

        .skill-link:hover .skill-cube,
        .skill-link:focus-visible .skill-cube {
          animation: skill-rotate 6s linear infinite;
        }

        .skill-face {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          border: 2px solid rgba(0, 77, 64, 0.25);
          background: #ffffff;
          backface-visibility: hidden;
          overflow: hidden;
        }

        .skill-face svg,
        .skill-face img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.45rem;
        }

        .skill-face::before {
          content: '';
          position: absolute;
          inset: -120%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: translateZ(20px);
          transition: transform 0.6s ease;
        }

        .skill-face::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-link:hover .skill-face::before,
        .skill-link:focus-visible .skill-face::before {
          transform: translate(120%, 120%) translateZ(20px);
        }

        .skill-link:hover .skill-face::after,
        .skill-link:focus-visible .skill-face::after {
          opacity: 1;
        }

        .skill-face.front {
          transform: translateZ(var(--skill-half));
        }

        .skill-face.back {
          transform: rotateY(180deg) translateZ(var(--skill-half));
        }

        .skill-face.right {
          transform: rotateY(90deg) translateZ(var(--skill-half));
        }

        .skill-face.left {
          transform: rotateY(-90deg) translateZ(var(--skill-half));
        }

        .skill-face.top {
          transform: rotateX(90deg) translateZ(var(--skill-half));
        }

        .skill-face.bottom {
          transform: rotateX(-90deg) translateZ(var(--skill-half));
        }

        .skill-label {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #1f2937;
        }

        .skill-link:hover .skill-label,
        .skill-link:focus-visible .skill-label {
          color: #004d40;
        }

        /* Category Toggle Buttons */
        .category-toggle {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: -0.5rem;
        }

        .category-btn {
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.05);
          border: 2px solid transparent;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #334155;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          background: rgba(0, 121, 107, 0.15);
          color: #004d40;
        }

        .category-btn.active {
          background: #00796b;
          border-color: #00796b;
          color: #ffffff;
          box-shadow: 0 8px 18px rgba(0, 121, 107, 0.25);
        }

        @keyframes skill-rotate {
          0% { transform: scale(1.08) rotateX(0deg) rotateY(0deg); }
          25% { transform: scale(1.08) rotateX(90deg) rotateY(90deg); }
          50% { transform: scale(1.08) rotateX(180deg) rotateY(180deg); }
          75% { transform: scale(1.08) rotateX(270deg) rotateY(270deg); }
          100% { transform: scale(1.08) rotateX(360deg) rotateY(360deg); }
        }

        @keyframes skill-breathe {
          0%, 100% { transform: rotateX(-6deg) rotateY(12deg) scale(0.96); }
          50% { transform: rotateX(4deg) rotateY(-8deg) scale(1); }
        }

        @media (max-width: 768px) {
          .tech-stack-row {
            gap: 1.5rem;
          }
          
          .skill-cube {
            --skill-size: 2.25rem;
          }

          .category-toggle {
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: -0.5rem;
          }

          .category-btn {
            padding: 0.3rem 0.75rem;
            font-size: 0.6rem;
          }
        }

        /* Rest of the existing styles... */
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

        .banner-text-section {
          max-width: 700px;
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
          padding: 0.75rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          max-width: 250px;
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
          margin-bottom: 0.5rem;
        }

        .featured-popup-header h3 {
          font-size: 0.7rem !important;
        }

        .featured-popup-header svg {
          width: 12px;
          height: 12px;
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
          gap: 0.5rem;
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
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 0.25rem;
        }

        .featured-popup-info {
          flex: 1;
        }

        .featured-popup-info h4 {
          font-size: 0.55rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
          color: #1a1a1a;
          line-height: 1.1;
        }

        .featured-popup-info span {
          font-size: 0.45rem;
          padding: 1px 4px;
          background: rgba(var(--p1), 0.1);
          color: rgba(var(--p1), 1);
          border-radius: 6px;
          display: inline-block;
          margin-right: 2px;
          margin-bottom: 2px;
        }

        @media (max-width: 768px) {
          .banner-centered-layout {
            gap: 1.25rem;
            padding: 1.5rem 1rem;
          }

          .featured-popup {
            bottom: 0.5rem;
            right: 0.5rem;
            max-width: 240px;
            padding: 0.5rem;
          }

          .featured-popup-projects {
            flex-direction: row;
            gap: 0.4rem;
          }
          
          .featured-popup-img {
            aspect-ratio: 210 / 290;
          }
          
          .featured-popup-info h4 {
            font-size: 0.5rem;
          }
          
          .featured-popup-info span {
            font-size: 0.4rem;
            padding: 1px 3px;
          }
        }
      `}</style>

      <div className="banner-centered-layout" ref={bannerRef}>
        {/* Main Text Section */}
        <div className="banner-text-section">
          <span className="n5-color fs-three fw-medium">HI, I&apos;M ISSAM A</span>
          <h2 className="typing-text display-one p1-color mt-3 mb-3" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
            <TypingEffect texts={texts} speed={200} pause={2000} />
          </h2>
          <p className="fs-five n5-color">
            My focus is on developing AI4Health solutions that can help improve the lives of people around the world.
          </p>
        </div>

        {/* Divider Line */}
        <div style={{
          width: "100%",
          maxWidth: "600px",
          height: "1px",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          margin: "1rem auto"
        }}></div>

        {/* Counter Stats */}
        <div className="d-none d-sm-block">
          <Counter />
        </div>

        {/* Tech Stack */}
        <div className="tech-stack-container">
          <div className="tech-stack-row">
            {filteredTechStack.map((tech, index) => (
              <a
                key={index}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="skill-link"
                title={tech.name}
                aria-label={`Visit ${tech.name} official website`}
              >
                <div className="skill-cube">
                  {/* Front Face */}
                  <div className="skill-face front">
                    {tech.img ? (
                      <Image src={tech.img} alt={tech.name} width={100} height={100} style={{ objectFit: "contain" }} />
                    ) : (
                      <svg viewBox={tech.viewBox} xmlns="http://www.w3.org/2000/svg">
                        {tech.paths ? (
                          tech.paths.map((p, i) => (
                            <path key={i} d={p.d} fill={p.fill} />
                          ))
                        ) : (
                          <path d={tech.path} fill={tech.color} />
                        )}
                      </svg>
                    )}
                  </div>

                  {/* Back Face */}
                  <div className="skill-face back">
                    {tech.img ? (
                      <Image src={tech.img} alt={tech.name} width={100} height={100} style={{ objectFit: "contain" }} />
                    ) : (
                      <svg viewBox={tech.viewBox} xmlns="http://www.w3.org/2000/svg">
                        {tech.paths ? (
                          tech.paths.map((p, i) => (
                            <path key={i} d={p.d} fill={p.fill} />
                          ))
                        ) : (
                          <path d={tech.path} fill={tech.color} />
                        )}
                      </svg>
                    )}
                  </div>

                  {/* Right Face */}
                  <div className="skill-face right">
                    {tech.img ? (
                      <Image src={tech.img} alt={tech.name} width={100} height={100} style={{ objectFit: "contain" }} />
                    ) : (
                      <svg viewBox={tech.viewBox} xmlns="http://www.w3.org/2000/svg">
                        {tech.paths ? (
                          tech.paths.map((p, i) => (
                            <path key={i} d={p.d} fill={p.fill} />
                          ))
                        ) : (
                          <path d={tech.path} fill={tech.color} />
                        )}
                      </svg>
                    )}
                  </div>

                  {/* Left Face */}
                  <div className="skill-face left">
                    {tech.img ? (
                      <Image src={tech.img} alt={tech.name} width={100} height={100} style={{ objectFit: "contain" }} />
                    ) : (
                      <svg viewBox={tech.viewBox} xmlns="http://www.w3.org/2000/svg">
                        {tech.paths ? (
                          tech.paths.map((p, i) => (
                            <path key={i} d={p.d} fill={p.fill} />
                          ))
                        ) : (
                          <path d={tech.path} fill={tech.color} />
                        )}
                      </svg>
                    )}
                  </div>

                  {/* Top Face */}
                  <div className="skill-face top">
                    {tech.img ? (
                      <Image src={tech.img} alt={tech.name} width={100} height={100} style={{ objectFit: "contain" }} />
                    ) : (
                      <svg viewBox={tech.viewBox} xmlns="http://www.w3.org/2000/svg">
                        {tech.paths ? (
                          tech.paths.map((p, i) => (
                            <path key={i} d={p.d} fill={p.fill} />
                          ))
                        ) : (
                          <path d={tech.path} fill={tech.color} />
                        )}
                      </svg>
                    )}
                  </div>

                  {/* Bottom Face */}
                  <div className="skill-face bottom">
                    {tech.img ? (
                      <Image src={tech.img} alt={tech.name} width={100} height={100} style={{ objectFit: "contain" }} />
                    ) : (
                      <svg viewBox={tech.viewBox} xmlns="http://www.w3.org/2000/svg">
                        {tech.paths ? (
                          tech.paths.map((p, i) => (
                            <path key={i} d={p.d} fill={p.fill} />
                          ))
                        ) : (
                          <path d={tech.path} fill={tech.color} />
                        )}
                      </svg>
                    )}
                  </div>
                </div>

                <span className="skill-label">{tech.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Category Toggle Buttons */}
        <div className="category-toggle">
          <button
            className={`category-btn ${activeSkillCategory === "Software" ? "active" : ""}`}
            onClick={() => setActiveSkillCategory("Software")}
          >
            Software
          </button>
          <button
            className={`category-btn ${activeSkillCategory === "Hardware" ? "active" : ""}`}
            onClick={() => setActiveSkillCategory("Hardware")}
          >
            Hardware
          </button>
          <button
            className={`category-btn ${activeSkillCategory === "Platforms" ? "active" : ""}`}
            onClick={() => setActiveSkillCategory("Platforms")}
          >
            Platforms
          </button>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span>Scroll for More</span>
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
              <h3 className="fs-seven fw-semibold mb-0" style={{ color: "#1a1a1a" }}>
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