"use client";

import { FC, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { PiX, PiArrowRight } from "react-icons/pi";
import Link from "next/link";

interface FeaturedProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    image: StaticImageData;
    category: string[];
    portfolioLink: string;
  } | null;
}

const FeaturedProjectModal: FC<FeaturedProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 9998,
          backdropFilter: "blur(4px)",
          animation: "fadeIn 0.3s ease",
        }}
      />

      {/* Modal */}
      <div
        className="featured-modal"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          animation: "slideUp 0.3s ease",
        }}
      >
        <div className="featured-modal-content">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <PiX size={24} />
          </button>

          {/* Image */}
          <div className="featured-modal-image">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={500}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              className="rounded"
            />
          </div>

          {/* Content */}
          <div className="featured-modal-body">
            {/* Tags */}
            <div className="d-flex gap-2 flex-wrap mb-3">
              {project.category.map((cat, index) => (
                <span key={index} className="featured-modal-tag">
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="featured-modal-title mb-3">{project.title}</h2>

            {/* Description */}
            <p className="featured-modal-description mb-4">
              {project.description}
            </p>

            {/* CTA Button */}
            <Link
              href={project.portfolioLink}
              className="featured-modal-btn"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              View Full Project
              <PiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .featured-modal-content {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          max-width: 900px;
          width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: row;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .modal-close-btn:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: rotate(90deg);
        }

        .featured-modal-image {
          flex: 0 0 45%;
          min-height: 500px;
          position: relative;
          overflow: hidden;
        }

        .featured-modal-body {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .featured-modal-tag {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(var(--p1), 0.1);
          color: rgba(var(--p1), 1);
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .featured-modal-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.3;
        }

        .featured-modal-description {
          font-size: 1rem;
          line-height: 1.7;
          color: #4a5568;
        }

        .featured-modal-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: rgba(var(--p1), 1);
          color: white;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .featured-modal-btn:hover {
          background: rgba(var(--p1), 0.9);
          transform: translateX(4px);
          color: white;
          box-shadow: 0 8px 20px rgba(var(--p1), 0.3);
        }

        @media (max-width: 768px) {
          .featured-modal-content {
            flex-direction: column;
            max-height: 85vh;
            overflow-y: auto;
          }

          .featured-modal-image {
            flex: 0 0 auto;
            min-height: 300px;
            max-height: 400px;
          }

          .featured-modal-body {
            padding: 24px;
          }

          .featured-modal-title {
            font-size: 1.5rem;
          }

          .featured-modal-description {
            font-size: 0.95rem;
          }

          .modal-close-btn {
            top: 16px;
            right: 16px;
            width: 36px;
            height: 36px;
          }
        }

        @media (max-width: 576px) {
          .featured-modal-content {
            width: 95vw;
            border-radius: 16px;
          }

          .featured-modal-image {
            min-height: 250px;
            max-height: 300px;
          }

          .featured-modal-body {
            padding: 20px;
          }

          .featured-modal-title {
            font-size: 1.25rem;
          }

          .featured-modal-btn {
            padding: 12px 24px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default FeaturedProjectModal;

