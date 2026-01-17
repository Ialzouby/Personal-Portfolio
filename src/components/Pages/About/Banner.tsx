"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import resumeIcon from "@/../public/images/resume-icon.png";
import { PiArrowRight, PiStarFill } from "react-icons/pi";
import Link from "next/link";
import TypingEffect from "@/components/TypingEffect/TypingEffect";
import project21 from "@/../public/images/projects/robot.png";
import product3 from "@/../public/images/projects/avatar.png";
import mmm272 from "@/../public/images/projects/avatar.png";
import FeaturedProjectModal from "./FeaturedProjectModal";

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

  const projects: ProjectData[] = [
    {
      title: "MMM-272: Text-to-Motion",
      description: "State-of-the-art text-to-motion generation with 272-dimensional representation achieving FID 10.4567. Features direct SMPL rotation recovery, eliminating IK artifacts for production-ready BVH output in Unity, Unreal, and Blender.",
      image: mmm272,
      category: ["Text-to-Motion", "AI/ML"],
      portfolioLink: "/portfolio-details/21",
    },
    {
      title: "Humanoid Robot",
      description: "Advanced humanoid robotics system integrating AI-powered motion control, computer vision, and real-time sensor fusion. Features autonomous navigation, human interaction capabilities, and adaptive learning algorithms for dynamic environments.",
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
<div className="banner-wrapper position-relative overflow-hidden rounded">
<div className="floating-dots"></div>

    <div className="banner-layout d-flex gap-9 gap-md-12 align-items-start justify-content-between">
      <div className="banner-content">
        <span className="n5-color fs-five">HI, I&apos;M An AI Engineer</span>
        <h2 className="typing-text display-one p1-color mt-2 mb-3">
          <TypingEffect texts={texts} speed={200} pause={2000} />
        </h2>
        <p className="fs-seven n5-color">
          My focus is on developing AI4Health solutions that can help improve the lives of people around the world
          {/* <Link href="/blog" className="p1-color">
            {" "}
            blog
          </Link>
          ,
          <Link href="/portfolio" className="p1-color">
            {" "}
            project portfolio{" "}
          </Link>
          and{" "}
          <Link href="/resume" className="p1-color">
            online resume
          </Link> */}
          .
        </p>
        <div className="d-flex flex-wrap align-itmes-center gap-3 gap-md-6 mt-4 mt-md-8">
          <Link
            href="/portfolio"
            className="p-btn n11-color bg1-color fw-medium n1-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2"
          >
            <PiArrowRight />
            View Portfolio
          </Link>
          <Link
            href="/"
            className="p-btn n11-color bgn51-color fw-medium n1-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2"
          >
            <Image src={resumeIcon} width={20} height={20} alt="icon" />
            View Resume
          </Link>
        </div>
      </div>

      <div className="featured-projects-banner">
        <div className="d-flex align-items-center gap-2 mb-4">
          <PiStarFill className="p1-color" size={18} />
          <h3 className="fs-six fw-semibold mb-0" style={{ color: '#1a1a1a' }}>Featured Work</h3>
        </div>
        <div className="featured-projects-grid">
          <div 
            className="featured-project-card" 
            onClick={() => handleProjectClick(projects[0])}
            style={{ cursor: 'pointer' }}
          >
            <div className="featured-project-img">
              <Image 
                src={projects[0].image} 
                alt={projects[0].title} 
                width={210} 
                height={290}
                className="rounded"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="featured-project-info mt-3">
              {projects[0].category.map((cat, idx) => (
                <span key={idx}>{cat}</span>
              ))}
              <h4 className="fs-seven fw-medium mt-2">{projects[0].title}</h4>
            </div>
          </div>
          <div 
            className="featured-project-card"
            onClick={() => handleProjectClick(projects[1])}
            style={{ cursor: 'pointer' }}
          >
            <div className="featured-project-img">
              <Image 
                src={projects[1].image} 
                alt={projects[1].title} 
                width={210} 
                height={290}
                className="rounded"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="featured-project-info mt-3">
              {projects[1].category.map((cat, idx) => (
                <span key={idx}>{cat}</span>
              ))}
              <h4 className="fs-seven fw-medium mt-2">{projects[1].title}</h4>
            </div>
          </div>
        </div>
      </div>

      <FeaturedProjectModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
      </div>
      </div>
  );
};

export default Banner;

