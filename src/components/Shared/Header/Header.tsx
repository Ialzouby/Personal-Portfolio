"use client";
import Image from "next/image";
import Link from "next/link";
import profile from "@/../public/images/profile.png";
import { usePathname } from "next/navigation";
import {
  PiLinkedinLogo,
  PiGithubLogo,
  PiPaperPlaneTilt,
  PiList,
  PiX,
} from "react-icons/pi";
import ThemeButton from "@/components/DarkMode/ThemeButton/ThemeButton";
import { sidebarsData } from "../../../../public/data/Sidebar";
import { useState } from "react";
import ContactModal from "@/components/Shared/ContactModal";

const Header = () => {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <header className={`header-nav ${path === "/" ? "home-header" : ""}`} style={{ zIndex: 1000 }}>
        <div className="header-gradient-border"></div>
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between py-3 px-4">
            {/* Logo/Profile Section */}
            <Link href="/" className="profile-link d-flex align-items-center gap-3 text-decoration-none">
              <div className="header-profile-wrapper">
                <div className="profile-ring"></div>
                <Image
                  src={profile}
                  alt="Issam Alzouby"
                  width={50}
                  height={50}
                  className="profile-image"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="d-none d-md-block profile-text">
                <h5 className="mb-0 fw-bold gradient-text">Issam Alzouby</h5>
                <span className="fs-nine subtitle-text">PhD Student · AI Researcher</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="d-none d-lg-flex align-items-center gap-2">
              {sidebarsData.map(({ id, name, url }) => (
                <Link
                  key={id}
                  href={url}
                  className={`nav-link px-4 py-2 fw-medium ${path === url ? "active-nav" : ""
                    }`}
                >
                  <span className="nav-text">{name}</span>
                  <span className="nav-underline"></span>
                </Link>
              ))}
            </nav>

            {/* Right Section - Desktop */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              <div className="social-icons-group">
                <Link
                  href="https://www.linkedin.com/in/alzouby/"
                  className="social-icon-header"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiLinkedinLogo size={22} />
                </Link>
                <Link
                  href="https://github.com/Ialzouby"
                  className="social-icon-header"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiGithubLogo size={22} />
                </Link>
              </div>
              {/* <div className="theme-divider"></div> */}
              {/* <ThemeButton /> */}
              <button
                onClick={() => setIsContactOpen(true)}
                className="contact-btn d-flex align-items-center gap-2"
              >
                <PiPaperPlaneTilt />
                <span>Let's Talk</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="d-flex d-lg-none align-items-center gap-3">
              {/* <ThemeButton /> */}
              <button
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <PiX size={28} /> : <PiList size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu d-lg-none ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="mobile-menu-content">
            <nav className="d-flex flex-column align-items-center p-4">
              {sidebarsData.map(({ id, name, url }, index) => (
                <Link
                  key={id}
                  href={url}
                  className={`nav-link-mobile ${path === url ? "active-mobile" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="mobile-nav-text">{name}</span>
                  {path === url && <span className="mobile-active-indicator"></span>}
                </Link>
              ))}
              <div className="mobile-divider"></div>
              <div className="d-flex gap-4 justify-content-center py-3">
                <Link
                  href="https://www.linkedin.com/in/alzouby/"
                  className="social-icon-mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiLinkedinLogo size={28} />
                </Link>
                <Link
                  href="https://github.com/Ialzouby"
                  className="social-icon-mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiGithubLogo size={28} />
                </Link>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="contact-btn-mobile d-flex align-items-center justify-content-center gap-2"
              >
                <PiPaperPlaneTilt size={20} />
                <span>Let's Talk</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <style jsx global>{`
        .header-nav {
          background: rgba(var(--n2), 1);
          border-bottom: 1px solid rgba(143, 143, 143, 0.1);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .home-header {
          position: fixed !important;
          background: rgba(var(--n2), 0.7) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          box-shadow: none !important;
          width: 100%;
        }

        .header-gradient-border {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(var(--p1), 0.8) 25%, 
            rgba(var(--p1), 1) 50%, 
            rgba(var(--p1), 0.8) 75%, 
            transparent 100%);
          opacity: 0.6;
        }

        /* Profile Section */
        .profile-link {
          transition: transform 0.3s ease;
        }

        .profile-link:hover {
          transform: translateY(-2px);
        }

        .header-profile-wrapper {
          position: relative;
          width: 50px;
          height: 50px;
        }

        .profile-image {
          border-radius: 50%;
          border: 3px solid rgba(var(--p1), 0.3);
          transition: all 0.4s ease;
          position: relative;
          z-index: 2;
        }

        .profile-link:hover .profile-image {
          border-color: rgba(var(--p1), 1);
          transform: scale(1.05);
        }

        .profile-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(var(--p1), 0.4), rgba(var(--p1), 0.1));
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: pulse 2s ease-in-out infinite;
          z-index: 1;
        }

        .profile-link:hover .profile-ring {
          opacity: 1;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .gradient-text {
          background: linear-gradient(135deg, rgba(var(--p1), 1), rgba(var(--p1), 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 1.1rem;
        }

        .subtitle-text {
          color: rgba(var(--n5), 0.7);
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        /* Navigation Links */
        .nav-link {
          color: rgba(var(--n5), 0.85);
          text-decoration: none;
          position: relative;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.3px;
          cursor: pointer;
        }

        .nav-text {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .nav-underline {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%;
          height: 2px;
          background: linear-gradient(90deg, rgba(var(--p1), 0.5), rgba(var(--p1), 1), rgba(var(--p1), 0.5));
          border-radius: 2px;
          transition: transform 0.3s ease;
        }

        .nav-link:hover {
          color: rgba(var(--p1), 1) !important;
          background: linear-gradient(135deg, rgba(var(--p1), 0.15), rgba(var(--p1), 0.08)) !important;
          transform: translateY(-4px) scale(1.05) !important;
          box-shadow: 0 8px 20px rgba(var(--p1), 0.25) !important;
          animation: navLinkFloat 0.6s ease !important;
        }

        @keyframes navLinkFloat {
          0%, 100% { transform: translateY(-4px) scale(1.05); }
          50% { transform: translateY(-6px) scale(1.06); }
        }

        .nav-link:hover .nav-text {
          transform: scale(1.05) !important;
          text-shadow: 0 2px 8px rgba(var(--p1), 0.3) !important;
        }

        .nav-link:hover .nav-underline {
          transform: translateX(-50%) scaleX(1);
          animation: underlineGlow 1s ease infinite;
          box-shadow: 0 0 10px rgba(var(--p1), 0.6);
        }

        @keyframes underlineGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .active-nav {
          background: linear-gradient(135deg, rgba(var(--p1), 1), rgba(var(--p1), 0.85));
          color: #fff !important;
          box-shadow: 0 4px 15px rgba(var(--p1), 0.3);
          transform: translateY(-1px);
        }

        .active-nav .nav-underline {
          display: none;
        }

        /* Social Icons Group */
        .social-icons-group {
          display: flex;
          gap: 0.75rem;
          padding: 0.5rem;
          background: rgba(var(--p1), 0.05);
          border-radius: 12px;
        }

        .social-icon-header {
          color: rgba(var(--p1), 1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.4rem;
          border-radius: 8px;
          background: transparent;
          border: 2px solid rgba(var(--p1), 0.4);
          position: relative;
          cursor: pointer;
        }

        .social-icon-header:hover {
          color: #fff !important;
          background: linear-gradient(135deg, rgba(var(--p1), 0.9), rgba(var(--p1), 1)) !important;
          border-color: rgba(var(--p1), 1) !important;
          transform: translateY(-6px) scale(1.15) rotate(8deg) !important;
          box-shadow: 0 12px 30px rgba(var(--p1), 0.5) !important;
          animation: socialIconBounce 0.6s ease !important;
        }

        @keyframes socialIconBounce {
          0% { transform: translateY(-6px) scale(1.15) rotate(8deg); }
          25% { transform: translateY(-8px) scale(1.2) rotate(5deg); }
          50% { transform: translateY(-6px) scale(1.15) rotate(10deg); }
          75% { transform: translateY(-8px) scale(1.2) rotate(6deg); }
          100% { transform: translateY(-6px) scale(1.15) rotate(8deg); }
        }

        .theme-divider {
          width: 1px;
          height: 24px;
          background: rgba(var(--n5), 0.1);
        }

        /* Contact Button */
        .contact-btn {
          padding: 0.5rem clamp(0.8rem, 2vw, 1.2rem);
          border-radius: 9999px !important;
          background: rgb(82, 113, 255) !important;
          color: #ffffff !important;
          text-decoration: none;
          font-weight: 600;
          font-size: clamp(0.7rem, 1.5vw, 0.875rem);
          letter-spacing: 0.3px;
          box-shadow: 0 2px 8px rgba(82, 113, 255, 0.25);
          transition: all 0.25s ease;
          border: none !important;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          overflow: hidden;
        }



        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
          background: rgba(var(--p1), 0.08);
          border: 1px solid rgba(var(--p1), 0.15);
          color: rgba(var(--p1), 1);
          cursor: pointer;
          padding: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .mobile-menu-toggle:hover {
          background: linear-gradient(135deg, rgba(var(--p1), 0.3), rgba(var(--p1), 0.4)) !important;
          border-color: rgba(var(--p1), 0.8) !important;
          transform: rotate(180deg) scale(1.15) !important;
          box-shadow: 0 6px 20px rgba(var(--p1), 0.4) !important;
          animation: menuToggleSpin 0.8s ease !important;
        }

        @keyframes menuToggleSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(180deg) scale(1.15); }
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 999;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mobile-menu.open {
          pointer-events: all;
          opacity: 1;
        }

        .mobile-menu-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mobile-menu.open .mobile-menu-backdrop {
          opacity: 1;
        }

        .mobile-menu-content {
          position: absolute;
          top: 0;
          right: 0;
          width: min(85%, 400px);
          height: 100vh;
          background: rgba(var(--n2), 0.98);
          backdrop-filter: blur(20px);
          border-radius: 0;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.3);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          padding-top: 80px;
        }

        .mobile-menu.open .mobile-menu-content {
          transform: translateX(0);
        }

        /* Styled Navigation Buttons - Centered & Larger */
        .nav-link-mobile {
          color: rgba(var(--n5), 0.95) !important;
          text-decoration: none !important;
          padding: 0.75rem 1.5rem !important;
          margin-bottom: 0.75rem !important;
          border-radius: 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative;
          font-weight: 600 !important;
          font-size: 1rem !important;
          letter-spacing: 1px !important;
          text-transform: uppercase !important;
          opacity: 0;
          transform: translateY(30px);
          animation: slideInUp 0.4s ease forwards !important;
          background: linear-gradient(135deg, 
            rgba(var(--n5), 0.12), 
            rgba(var(--n5), 0.06)
          ) !important;
          border: 3px solid rgba(var(--n5), 0.25) !important;
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.12),
            inset 0 2px 0 rgba(255, 255, 255, 0.15),
            inset 0 -2px 0 rgba(0, 0, 0, 0.05) !important;
          overflow: hidden !important;
          width: 100% !important;
          max-width: 300px !important;
        }

        /* Shine effect on buttons */
        .nav-link-mobile::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(var(--p1), 0.15), 
            transparent
          );
          transition: left 0.6s ease;
        }

        .nav-link-mobile:hover::before {
          left: 100%;
        }

        /* Ripple effect on click */
        .nav-link-mobile::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(var(--p1), 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
          opacity: 0;
        }

        .nav-link-mobile:active::after {
          width: 300px;
          height: 300px;
          opacity: 1;
          transition: width 0s, height 0s, opacity 0s;
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-link-mobile:hover {
          background: linear-gradient(135deg, 
            rgba(var(--p1), 0.25), 
            rgba(var(--p1), 0.15)
          );
          color: rgba(var(--p1), 1);
          border-color: rgba(var(--p1), 0.6);
          transform: translateY(-6px) scale(1.04);
          box-shadow: 
            0 10px 30px rgba(var(--p1), 0.3),
            0 0 0 8px rgba(var(--p1), 0.1),
            inset 0 3px 0 rgba(255, 255, 255, 0.2),
            inset 0 -3px 0 rgba(0, 0, 0, 0.08);
        }

        .nav-link-mobile:active {
          transform: translateY(-3px) scale(0.98);
          box-shadow: 
            0 5px 20px rgba(var(--p1), 0.25),
            0 0 0 6px rgba(var(--p1), 0.08),
            inset 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: all 0.1s ease;
        }

        /* Active state styled as a filled button */
        .active-mobile {
          background: linear-gradient(135deg, 
            rgba(var(--p1), 1), 
            rgba(var(--p1), 0.9)
          ) !important;
          color: #ffffff !important;
          border: 3px solid rgba(var(--p1), 1) !important;
          font-weight: 800;
          box-shadow: 
            0 12px 40px rgba(var(--p1), 0.5),
            0 0 0 8px rgba(var(--p1), 0.2),
            inset 0 3px 0 rgba(255, 255, 255, 0.3),
            inset 0 -3px 0 rgba(0, 0, 0, 0.15);
          transform: translateY(0) scale(1.03);
        }

        .active-mobile:hover {
          background: linear-gradient(135deg, 
            rgba(var(--p1), 0.95), 
            rgba(var(--p1), 0.85)
          ) !important;
          transform: translateY(-6px) scale(1.06) !important;
          box-shadow: 
            0 14px 45px rgba(var(--p1), 0.55),
            0 0 0 10px rgba(var(--p1), 0.25),
            inset 0 3px 0 rgba(255, 255, 255, 0.35),
            inset 0 -3px 0 rgba(0, 0, 0, 0.15) !important;
        }

        .active-mobile:active {
          transform: translateY(-3px) scale(1.01) !important;
          box-shadow: 
            0 8px 30px rgba(var(--p1), 0.45),
            0 0 0 8px rgba(var(--p1), 0.2),
            inset 0 3px 8px rgba(0, 0, 0, 0.2) !important;
        }

        /* Text styling for mobile nav */
        .mobile-nav-text {
          position: relative;
          z-index: 2;
          font-weight: inherit;
          letter-spacing: inherit;
        }

        /* Glowing active indicator */
        .mobile-active-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 
            0 0 15px rgba(255, 255, 255, 0.8),
            0 0 25px rgba(255, 255, 255, 0.4);
          animation: pulseGlow 2s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
            box-shadow: 
              0 0 15px rgba(255, 255, 255, 0.8),
              0 0 25px rgba(255, 255, 255, 0.4);
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.8;
            box-shadow: 
              0 0 20px rgba(255, 255, 255, 1),
              0 0 35px rgba(255, 255, 255, 0.6);
          }
        }

        .mobile-divider {
          height: 2px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(var(--p1), 0.4), 
            transparent
          );
          margin: 1.5rem 0 1rem 0;
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(var(--p1), 0.2);
        }

        /* Enhanced Social Icons for Mobile */
        .social-icon-mobile {
          color: rgba(var(--p1), 1);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem;
          border-radius: 14px;
          background: linear-gradient(135deg, 
            rgba(var(--p1), 0.08), 
            rgba(var(--p1), 0.04)
          );
          border: 2px solid rgba(var(--p1), 0.3);
          position: relative;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(var(--p1), 0.15);
        }

        .social-icon-mobile::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          padding: 2px;
          background: linear-gradient(135deg, 
            rgba(var(--p1), 0.6), 
            rgba(var(--p1), 0.2)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-icon-mobile:hover::before {
          opacity: 1;
        }

        .social-icon-mobile:hover {
          color: #fff;
          background: linear-gradient(135deg, 
            rgba(var(--p1), 1), 
            rgba(var(--p1), 0.85)
          );
          border-color: rgba(var(--p1), 1);
          transform: translateY(-8px) scale(1.15) rotate(-8deg);
          box-shadow: 
            0 12px 30px rgba(var(--p1), 0.4),
            0 0 0 6px rgba(var(--p1), 0.1);
          animation: mobileSocialBounce 0.5s ease;
        }

        .social-icon-mobile:active {
          transform: translateY(-4px) scale(1.05) rotate(-5deg);
          box-shadow: 0 6px 20px rgba(var(--p1), 0.3);
        }

        @keyframes mobileSocialBounce {
          0%, 100% { transform: translateY(-8px) scale(1.15) rotate(-8deg); }
          50% { transform: translateY(-12px) scale(1.2) rotate(-5deg); }
        }

        /* Enhanced Contact Button for Mobile */
        .contact-btn-mobile {
          padding: 0.75rem 1.5rem;
          border-radius: 99px !important;
          background: linear-gradient(135deg, 
            rgb(82, 113, 255), 
            rgb(65, 95, 235)
          ) !important;
          color: #ffffff !important;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.5px;
          box-shadow: 
            0 6px 20px rgba(82, 113, 255, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: 1rem;
          border: none !important;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          overflow: hidden;
          position: relative;
        }

        .contact-btn-mobile::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent
          );
          transition: left 0.6s ease;
        }

        .contact-btn-mobile:hover::before {
          left: 100%;
        }

        .contact-btn-mobile:hover {
          background: linear-gradient(135deg, 
            rgb(100, 130, 255), 
            rgb(82, 113, 255)
          ) !important;
          transform: translateY(-4px) scale(1.03);
          box-shadow: 
            0 10px 30px rgba(82, 113, 255, 0.5),
            0 0 0 6px rgba(82, 113, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        .contact-btn-mobile:active {
          transform: translateY(-2px) scale(1);
          box-shadow: 0 4px 15px rgba(82, 113, 255, 0.35);
        }

        .contact-btn-mobile svg {
          transition: transform 0.3s ease;
        }

        .contact-btn-mobile:hover svg {
          transform: translateX(4px) rotate(15deg);
        }

        @media (max-width: 991px) {
          .header-nav {
            padding: 0;
          }
        }

        @media (max-width: 768px) {
          .gradient-text {
            font-size: 1rem;
          }

          .mobile-menu-content {
            width: min(90%, 360px);
          }

          .nav-link-mobile {
            padding: 1.3rem 2.25rem;
            font-size: 1.1rem;
            margin-bottom: 1.3rem;
            border-radius: 18px;
            max-width: 280px;
          }

          .nav-link-mobile:hover {
            transform: translateY(-5px) scale(1.03);
          }

          .active-mobile {
            transform: translateY(0) scale(1.02);
          }

          .active-mobile:hover {
            transform: translateY(-5px) scale(1.05) !important;
          }

          .mobile-active-indicator {
            width: 10px;
            height: 10px;
          }

          .social-icon-mobile {
            padding: 0.75rem;
          }

          .contact-btn-mobile {
            padding: 0.95rem 1.75rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .mobile-menu-content {
            width: 100%;
            border-radius: 0;
          }

          .nav-link-mobile {
            padding: 1.2rem 2rem;
            font-size: 1rem;
            margin-bottom: 1.2rem;
            border-radius: 16px;
            max-width: 260px;
            letter-spacing: 0.8px;
          }

          .nav-link-mobile:hover {
            transform: translateY(-4px) scale(1.02);
          }

          .active-mobile {
            transform: translateY(0) scale(1.01);
          }

          .active-mobile:hover {
            transform: translateY(-4px) scale(1.04) !important;
          }

          .social-icon-mobile {
            padding: 0.7rem;
          }

          .social-icon-mobile svg {
            width: 24px;
            height: 24px;
          }

          .contact-btn-mobile {
            padding: 0.85rem 1.5rem;
            font-size: 0.9rem;
          }

          .contact-btn-mobile svg {
            width: 18px;
            height: 18px;
          }

          .mobile-divider {
            margin: 1.5rem 0 1rem 0;
          }
        }
      `}</style>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Header;
