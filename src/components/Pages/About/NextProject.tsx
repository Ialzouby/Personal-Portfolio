"use client";

import FadeDown from "@/components/motionEffect/FadeDown";
import Link from "next/link";
import React, { useState } from "react";
import { PiArrowRight } from "react-icons/pi";
import Image from "next/image";

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

import ContactModal from "@/components/Shared/ContactModal";

const NextProject = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<"Software" | "Hardware" | "Platforms">("Software");
  const [isContactOpen, setIsContactOpen] = useState(false);

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

  return (
    <>
      <style jsx>{`
        /* 3D Cube Styles */
        .tech-stack-section {
          background: transparent;
          border-radius: 20px;
          padding: 1.25rem 0;
        }

        .tech-stack-container {
          position: relative;
          margin: 0.5rem 0;
        }

        .tech-stack-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 0.5rem 0;
          perspective: 1300px;
          perspective-origin: 50% 25%;
        }
        
        .skill-link {
          flex: 0 0 auto;
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
          gap: 0.35rem;
          color: inherit;
          text-decoration: none;
          flex-shrink: 0;
        }

        .skill-link:focus-visible {
          outline: 2px solid rgba(var(--p1), 1);
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
          border: 2px solid rgba(var(--p1), 0.25);
          background: #ffffff;
          backface-visibility: hidden;
          overflow: hidden;
        }

        :global([data-theme="dark"]) .skill-face {
          background: rgba(30, 30, 40, 0.95);
          border: 2px solid rgba(var(--p1), 0.3);
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
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #ffffff;
        }

        .skill-link:hover .skill-label,
        .skill-link:focus-visible .skill-label {
          color: rgba(var(--p1), 1);
        }

        /* Category Toggle Buttons */
        .category-toggle {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .category-btn {
          padding: 0.4rem 1rem;
          border-radius: 999px;
          background: rgba(var(--p1), 0.08);
          border: 1px solid rgba(var(--p1), 0.15);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .category-btn:hover {
          background: rgba(var(--p1), 0.12);
          color: #ffffff;
          border-color: rgba(var(--p1), 0.3);
          transform: translateY(-1px);
        }

        .category-btn.active {
          background: rgba(var(--p1), 1);
          border-color: rgba(var(--p1), 1);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(var(--p1), 0.3);
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

        @media (max-width: 991px) {
          .shoutout-note {
            text-align: center !important;
            margin-top: 2rem !important;
          }

          .tech-stack-row {
            justify-content: center;
            gap: 0.75rem;
          }

          .category-toggle {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .tech-stack-section {
            padding: 1rem 0;
          }

          .tech-stack-row {
            gap: 0.6rem;
            padding: 0.5rem 0;
          }
          
          .skill-cube {
            --skill-size: 2.25rem;
          }

          .category-toggle {
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .category-btn {
            padding: 0.35rem 0.85rem;
            font-size: 0.65rem;
          }
        }

        @media (max-width: 480px) {
          .tech-stack-section {
            padding: 0.75rem 0;
          }

          .tech-stack-row {
            gap: 0.5rem;
          }

          .skill-cube {
            --skill-size: 2rem;
          }

          .category-btn {
            padding: 0.3rem 0.7rem;
            font-size: 0.6rem;
          }
        }
      `}</style>

      <section className="next-project pt-120 pb-120">
        <div className="container">
          <FadeDown>
            <div className="row g-4 align-items-center">
              {/* Left side - Text content */}
              <div className="col-12 col-lg-5">
                <div className="next-project-content">
                  <h3 className="display-four n11-color fw-semibold mb-2 mb-md-4">
                    Let's Build Something That Matters
                  </h3>
                  <p className="fs-seven n11-color">
                    I'm currently open to research opportunities, internships, and roles focused on medical AI, human modeling, or systems engineering. Let's connect if you're looking for someone driven to make an impact through real-world AI.
                  </p>
                </div>
              </div>

              {/* Right side - Button and Skills */}
              <div className="col-12 col-lg-7">
                <div className="d-flex flex-column align-items-end">
                  {/* Button at top */}
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="p-btn bg1-color fw-medium n11-color px-4 px-md-7 py-2 py-md-4 rounded-pill d-inline-flex align-items-center gap-2 mb-3 border-0"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                  >
                    <PiArrowRight size={20} />
                    Reach out
                  </button>

                  {/* Skills section */}
                  <div className="tech-stack-section w-100">
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

                    {/* Category Toggle Buttons - Now below skills */}
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

                    {/* Shoutout Note */}
                    <div className="shoutout-note mt-4 text-end">
                      <p className="fs-nine n11-color opacity-50 mb-0">
                        shoutout to <Link href="https://noahhathout.com/" target="_blank" className="p1-color text-decoration-none fw-medium">Noah Hattout</Link> for designing the skills animation cube.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeDown>
        </div>
      </section>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default NextProject;
