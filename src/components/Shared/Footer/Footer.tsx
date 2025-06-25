"use client";

import Link from "next/link";
import Image from "next/image";
import {
  PiGithubLogo,
  PiLinkedinLogo,
  PiGlobe,
  PiEnvelopeSimple,
  PiFilePdf,
} from "react-icons/pi";

const Footer = () => {
  const links = [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Resume", href: "/resume" },
    { label: "Speaking", href: "/speaking" },
    { label: "Contact", href: "/contact" },
  ];

  const affiliations = [
    "Stanford",
    "stanford-hai",
    "Duke",
    "UNC-SOM",
    "UNCC",
    "DC",
    "Charlotte",
  ];

  return (
    <footer className="footer-section border-top mt-5 pt-5 pb-4">
      <div className="container text-center">
        {/* Name + tagline */}
        <h4 className="fs-four fw-semibold n5-color mb-2">Issam Alzouby</h4>
        <p className="fs-eight text-footer-content mx-auto mb-4" style={{ maxWidth: "500px" }}>
          Designing intelligent systems with precision, empathy, and bold imagination.
        </p>

        {/* Navigation Links */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
          {links.map((link, i) => (
            <Link key={i} href={link.href} className="text-footer-link fs-eight">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Icons (separate line) */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <Link href="https://github.com/Ialzouby" className="footer-icon"><PiGithubLogo /></Link>
          <Link href="https://linkedin.com/in/alzouby" className="footer-icon"><PiLinkedinLogo /></Link>
          <Link href="https://issamalzouby.com" className="footer-icon"><PiGlobe /></Link>
          <Link href="/resume.pdf" className="footer-icon"><PiFilePdf /></Link>
          <Link href="mailto:your@email.com" className="footer-icon"><PiEnvelopeSimple /></Link>
        </div>

        {/* Affiliations Logos (Grayscale) */}
        <div className="d-flex justify-content-center flex-wrap gap-4 py-3 border-top border-secondary-subtle">
          {affiliations.map((name, i) => (
            <Image
  key={i}
  src={`/logos/${name.toLowerCase().replace(/\s+/g, "-")}.png`}
  alt={name}
  width={100}
  height={100}
  style={{
    objectFit: "contain",
  }}
/>

          ))}
        </div>

        {/* Bottom line */}
{/* Footer Text Above Logos */}
<div className="fs-eight fw-medium text-footer-content text-center mb-4">
  © {new Date().getFullYear()} Issam Alzouby &nbsp;•&nbsp; AI Engineer & Researcher
</div>

      </div>
    </footer>
  );
};

export default Footer;
