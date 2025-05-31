"use client";

import Link from "next/link";
import {
  PiGithubLogo,
  PiLinkedinLogo,
  PiGlobe,
  PiEnvelopeSimple,
  PiGraduationCap,
  PiFilePdf,
  PiTrophy,
  PiPhone,
} from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="footer-section w-100 mt-5 px-4 py-5">
      <div className="container text-center text-footer-content">
        {/* Mission Statement */}
        <p className="mb-3 fw-medium fs-eight mx-auto footer-mission">
          My mission is to push boundaries and build meaningful technology —
          guided by a personal standard of precision, empathy, and innovation
          that’s reflected in everything I create.
        </p>

        {/* Icon Links */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mb-3">
          <Link href="https://github.com/Ialzouby" className="footer-icon">
            <PiGithubLogo />
          </Link>
          <Link href="https://linkedin.com/in/alzouby" className="footer-icon">
            <PiLinkedinLogo />
          </Link>
          <Link href="https://issamalzouby.com" className="footer-icon">
            <PiGlobe />
          </Link>
          <Link href="/resume.pdf" className="footer-icon">
            <PiFilePdf />
          </Link>
          <Link href="mailto:your@email.com" className="footer-icon">
            <PiEnvelopeSimple />
          </Link>
        </div>

        {/* Footer Note */}
        <p className="fs-eight fw-medium mb-0">
          © {new Date().getFullYear()} Issam Alzouby. Built with ❤️ & caffeine.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
