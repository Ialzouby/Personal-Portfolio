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

const Header = () => {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <div className="theme-divider"></div>
              <ThemeButton />
              <Link
                href="/contact"
                className="contact-btn d-flex align-items-center gap-2"
              >
                <PiPaperPlaneTilt />
                <span>Let's Talk</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="d-flex d-lg-none align-items-center gap-3">
              <ThemeButton />
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
            <nav className="d-flex flex-column gap-2 p-4">
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
              <Link
                href="/contact"
                className="contact-btn-mobile d-flex align-items-center justify-content-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PiPaperPlaneTilt size={20} />
                <span>Let's Talk</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <style jsx>{`
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
          padding: 0.5rem 1.2rem;
          border-radius: 9999px !important;
          background: rgb(82, 113, 255) !important;
          color: #ffffff !important;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
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
          width: min(85%, 380px);
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

        .nav-link-mobile {
          color: rgba(var(--n5), 0.9);
          text-decoration: none;
          padding: 1.2rem 1.5rem;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
          position: relative;
          font-weight: 600;
          font-size: 1.05rem;
          letter-spacing: 0.3px;
          opacity: 0;
          transform: translateX(30px);
          animation: slideInRight 0.4s ease forwards;
        }

        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .nav-link-mobile:hover {
          background: rgba(var(--p1), 0.12);
          color: rgba(var(--p1), 1);
          padding-left: 2rem;
          transform: translateX(-4px);
        }

        .active-mobile {
          background: linear-gradient(135deg, rgba(var(--p1), 0.2), rgba(var(--p1), 0.1));
          color: rgba(var(--p1), 1) !important;
          border-left: 4px solid rgba(var(--p1), 1);
          font-weight: 700;
        }

        .mobile-active-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(var(--p1), 1);
          box-shadow: 0 0 10px rgba(var(--p1), 0.5);
          animation: pulse 2s ease-in-out infinite;
        }

        .mobile-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(var(--p1), 0.3), transparent);
          margin: 1.5rem 0;
        }

        .social-icon-mobile {
          color: rgba(var(--p1), 1);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          border-radius: 12px;
          background: rgba(var(--p1), 0.08);
          border: 2px solid rgba(var(--p1), 0.4);
          position: relative;
          cursor: pointer;
        }

        .social-icon-mobile:hover {
          color: #fff;
          background: linear-gradient(135deg, rgba(var(--p1), 0.9), rgba(var(--p1), 1));
          border-color: rgba(var(--p1), 1);
          transform: translateY(-8px) scale(1.15) rotate(-5deg);
          box-shadow: 0 10px 25px rgba(var(--p1), 0.4);
          animation: mobileSocialBounce 0.5s ease;
        }

        @keyframes mobileSocialBounce {
          0%, 100% { transform: translateY(-8px) scale(1.15) rotate(-5deg); }
          50% { transform: translateY(-10px) scale(1.2) rotate(-5deg); }
        }

        .contact-btn-mobile {
          padding: 1rem 2rem;
          border-radius: 9999px !important;
          background: rgb(82, 113, 255) !important;
          color: #ffffff !important;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.3px;
          box-shadow: 0 4px 15px rgba(82, 113, 255, 0.4);
          transition: all 0.25s ease;
          margin-top: 1.5rem;
          border: none !important;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          overflow: hidden;
        }

        .contact-btn-mobile:hover {
          background: rgb(100, 130, 255) !important;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 25px rgba(82, 113, 255, 0.5);
        }
        
        .contact-btn-mobile:active {
          transform: translateY(0px) scale(1);
          box-shadow: 0 2px 8px rgba(82, 113, 255, 0.3);
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
        }
      `}</style>
    </>
  );
};

export default Header;
