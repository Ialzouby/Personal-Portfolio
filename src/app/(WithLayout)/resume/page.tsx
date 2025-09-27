import Image from "next/image";
import Link from "next/link";
import {
  PiEnvelopeSimple,
  PiFilePdf,
  PiGithubLogo,
  PiGlobe,
  PiGraduationCap,
  PiLinkedinLogo,
  PiMapPin,
  PiTrophy,
  PiXLogo,
} from "react-icons/pi";
import profile from "@/../public/images/profile.png";
import FadeDown from "@/components/motionEffect/FadeDown";
import Footer from "@/components/Shared/Footer/Footer";

const Resume = () => {
  return (
    <div>
      <section className="pt-120 pb-120 mt-10 mt-lg-0">
        <FadeDown>
          <div className="pb-60 br-bottom-n3">
            <div data-aos="zoom-in" className="page-heading">
              <h3 className="page-title fs-onefw-semibold n5-color mb-2 mb-md-3 text-center">
                Online Resume
              </h3>

              {/* Update this href to where you host the PDF in /public, e.g. /IssamAlzouby-Resume.pdf */}
              <a
                href="/IssamAlzouby-Resume.pdf"
                className="w-max p-btn bg1-color fw-medium n1-color px-3 px-md-6 py-2 py-md-4 rounded-pill d-flex align-items-center gap-2 mx-auto"
                download
              >
                <PiFilePdf /> Download PDF Version
              </a>
            </div>
          </div>
        </FadeDown>

        <div className="container mt-8 mt-md-15">
          <FadeDown>
            <div className="bgn2-color p-4 p-sm-8 p-md-15 rounded-5 brn4">
              {/* Header */}
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 br-bottom-n3 pb-3 pb-md-6">
                <div>
                  <h2 className="display-three p1-color fw-semibold">Issam Alzouby</h2>
                  <span className="n4-color fs-six fw-medium">
                    Medical AI • Digital Twins • Motion Modeling
                  </span>
                </div>

                <div className="ps-5 br-left-n3">
                  <ul className="d-flex flex-column gap-3">
                    <li className="d-flex gap-2 align-items-center n4-color">
                      <PiMapPin /> Charlotte, NC
                    </li>
                    <li>
                      <Link
                        href="mailto:ialzouby@gmail.com"
                        className="d-flex gap-2 align-items-center n4-color"
                      >
                        <PiEnvelopeSimple /> ialzouby@gmail.com
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://linkedin.com/in/Alzouby"
                        className="d-flex gap-2 align-items-center n4-color"
                      >
                        <PiLinkedinLogo /> linkedin.com/in/Alzouby
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://github.com/ialzouby"
                        className="d-flex gap-2 align-items-center n4-color"
                      >
                        <PiGithubLogo /> github.com/ialzouby
                      </Link>
                    </li>
                    <li className="d-flex gap-2 align-items-center n4-color">
                      <PiGlobe /> issamalzouby.com
                    </li>
                  </ul>
                </div>
              </div>

              {/* Summary */}
              <div className="d-flex flex-wrap flex-md-nowrap align-items-center gap-5 gap-md-10 pb-4 pb-md-8 br-bottom-n3 pt-60">
                <div className="resume-profile flex-shrink-0">
                  <Image
                    src={profile}
                    alt="profile"
                    className="object-fit-cover"
                    width="127"
                    height="159"
                  />
                </div>
                <p className="n42-color fs-seven">
                  Medical AI engineer focused on real-time digital twins, motion modeling, and
                  GPU-accelerated systems. I deploy scalable PyTorch/CUDA pipelines with FastAPI
                  backends and modern web frontends, and mentor students on applied ML and
                  Medical-AI workflows.
                </p>
              </div>

              <div className="resume-section row pt-60 pb-60 br-bottom-n3">
                {/* Main column */}
                <div className="col-md-8 col-lg-12 col-xl-8 col-xxl-9">
                  {/* Experience */}
                  <div className="d-flex align-items-center gap-2 mb-5 mb-md-10">
                    <div className="title-line2"></div>
                    <h2 className="fs-three p1-color fw-semibold">Experience</h2>
                  </div>

                  {/* UNCC AI4Health Center */}
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">AI Research Assistant</span>
                      <span className="n4-color fs-eight">UNCC AI4Health Center | Jun 2023 – Present</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10 mt-3">
                      <li className="n42-color fs-seven">
                        Led deployment & optimization of motion-modeling AI pipelines, cutting inference time by 60%+
                      </li>
                      <li className="n42-color fs-seven">
                        Built a scalable CUDA system with custom endpoints for commercial web app integration
                      </li>
                      <li className="n42-color fs-seven">
                        Trained transformer-based text-to-motion models for realistic human movement generation
                      </li>
                    </ul>
                  </div>

                  {/* Stanford HAI AI4ALL */}
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">Graduate AI Research Mentor</span>
                      <span className="n4-color fs-eight">Stanford University | May 2025 – Jul 2025</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10 mt-3">
                      <li className="n42-color fs-seven">
                        Mentored a cohort of 10 high-school students in Medical AI (Stanford HAI AI4ALL)
                      </li>
                      <li className="n42-color fs-seven">
                        Taught advanced linear algebra, ML fundamentals, and deployment of Medical-AI systems
                      </li>
                      <li className="n42-color fs-seven">
                        Guided zero-shot medical image classifiers using BiomedCLIP & SmolVLM
                      </li>
                    </ul>
                  </div>

                  {/* Duke Heart Center & UNC */}
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">AI Research Engineer</span>
                      <span className="n4-color fs-eight">Duke Heart Center & UNC | May 2024 – May 2025</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10 mt-3">
                      <li className="n42-color fs-seven">
                        Best Oral Presentation in Cardiac Surgery (62nd Eastern Cardiothoracic Surgical Society)
                      </li>
                      <li className="n42-color fs-seven">
                        Designed an algorithm projecting +94% organ-donation success and reduced ICU workload
                      </li>
                      <li className="n42-color fs-seven">
                        Co-authored 4 papers on AI-driven clinical decision-making with custom software & models
                      </li>
                    </ul>
                  </div>

                  {/* iRepairCLT */}
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">GPU Infrastructure Support Tech</span>
                      <span className="n4-color fs-eight">iRepairCLT | Jan 2020 – Dec 2022</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10 mt-3">
                      <li className="n42-color fs-seven">
                        Repaired ASIC hashing boards and NVIDIA GPUs (RTX 30/40 series)
                      </li>
                      <li className="n42-color fs-seven">
                        Maintained GPU clusters in harsh environments to maximize uptime
                      </li>
                    </ul>
                  </div>

                  {/* Projects */}
                  <div className="d-flex align-items-center gap-2 mb-5 mb-md-10">
                    <div className="title-line2"></div>
                    <h2 className="fs-three p1-color fw-semibold">Projects</h2>
                  </div>

                  {/* 7 Time Hackathon Winner */}
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center mb-2 mb-md-4">
                      <span className="n5-color fs-six fw-medium">7 Time Hackathon Winner</span>
                      <span className="n42-color fs-eight">Aug 2022 – Present</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">
                        NC NASA Hackathon, HackNC, NC State Hackathon, Truist Immersive Experience, UNCC AIR
                      </li>
                      <li className="n42-color fs-seven">
                        1st place, 2024 NC State Competitive Programming Competition
                      </li>
                      <li className="n42-color fs-seven">
                        Built AI voice-translation & bias-reduction apps; 1st place in 5 major events
                      </li>
                    </ul>
                  </div>

                  {/* Home Lab */}
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center mb-2 mb-md-4">
                      <span className="n5-color fs-six fw-medium">Home Lab — AI Fine-Tuning Server</span>
                      <span className="n42-color fs-eight">Jan 2024 – Present</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">
                        Deployed Dell PowerEdge servers & 40TB NAS over 10GbE for low-latency workflows
                      </li>
                      <li className="n42-color fs-seven">
                        Experimented with quantization & fine-tuning for model compression
                      </li>
                      <li className="n42-color fs-seven">
                        Fine-tuned ResNet50 on chest X-rays for pneumonia detection (90% accuracy)
                      </li>
                    </ul>
                  </div>

                  {/* T2M/A2M Deployment */}
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center mb-2 mb-md-4">
                      <span className="n5-color fs-six fw-medium">Text & Audio → Motion Model Deployment</span>
                      <span className="n42-color fs-eight">Jan 2025 – May 2025</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">
                        Reduced T2M inference from 90s → 7s; audio preproc 4min → 30s via CUDA optimizations
                      </li>
                      <li className="n42-color fs-seven">
                        Built FastAPI endpoints + Next.js UI for real-time T2M/A2M generation
                      </li>
                      <li className="n42-color fs-seven">
                        Motion retargeting to TADA avatars with Three.js for in-browser 3D animation
                      </li>
                    </ul>
                  </div>

                  {/* Motion Encoder Research */}
                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center mb-2 mb-md-4">
                      <span className="n5-color fs-six fw-medium">Motion Encoder Research</span>
                      <span className="n42-color fs-eight">May 2025 – Jul 2025</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">
                        Implemented a VQ-VAE for discrete motion embeddings for transformer-based generation
                      </li>
                      <li className="n42-color fs-seven">
                        Trained an autoencoder with low reconstruction errors (L2: 0.0159, L1: 0.0640)
                      </li>
                      <li className="n42-color fs-seven">
                        Boosted performance with codebook resets & EMA stabilization
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="col-md-4 col-lg-12 col-xl-4 col-xxl-3">
                  <div className="ps-4 ps-xxl-7 br-left-n3 mt-5 mt-md-0">
                    {/* Skills */}
                    <div className="mb-8 mb-md-15">
                      <div className="d-flex align-items-center gap-2 mb-5 mb-md-10">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">Technical Skills</h2>
                      </div>

                      <div className="ms-6 ms-lg-10 d-flex flex-column gap-3">
                        <div>
                          <h6 className="n5-color fs-seven fw-semibold mb-1">Languages</h6>
                          <p className="n4-color fs-seven">
                            Python (Adv), HTML/CSS (Adv), JavaScript (Int), SQL (Int), C++ (Beginner)
                          </p>
                        </div>
                        <div>
                          <h6 className="n5-color fs-seven fw-semibold mb-1">AI & ML</h6>
                          <p className="n4-color fs-seven">
                            PyTorch, Transformers, Fine-Tuning, Model Architecture, CUDA Optimization, Data Processing, API Deployment
                          </p>
                        </div>
                        <div>
                          <h6 className="n5-color fs-seven fw-semibold mb-1">Cloud & Deployment</h6>
                          <p className="n4-color fs-seven">
                            AWS (SAA-C03), GCP, OpenAI API, FastAPI, Next.js, Git, Hugging Face
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="mb-8 mb-md-15">
                      <div className="d-flex align-items-center gap-2 mb-3 mb-md-6">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">Education</h2>
                      </div>

                      <div className="d-flex gap-2 mb-3 mb-md-5">
                        <i className="fs-six p1-color">
                          <PiGraduationCap />
                        </i>
                        <div>
                          <span className="n4-color fs-seven">
                            M.S. Artificial Intelligence — UNC Charlotte
                          </span>
                          <span className="d-block n4-color fs-eleven">Expected May 2027</span>
                        </div>
                      </div>

                      <div className="d-flex gap-2 mb-3 mb-md-5">
                        <i className="fs-six p1-color">
                          <PiGraduationCap />
                        </i>
                        <div>
                          <span className="n4-color fs-seven">
                            B.S. Computer Science — UNC Charlotte
                          </span>
                          <span className="d-block n4-color fs-eleven">May 2025</span>
                        </div>
                      </div>
                    </div>

                    {/* Awards */}
                    <div className="mb-8 mb-md-15">
                      <div className="d-flex align-items-center gap-2 mb-3 mb-md-6">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">Awards</h2>
                      </div>

                      {[
                        ["AI Travel Grant"],
                        ["Undergraduate Research Assistant"],
                        ["2025 Truist Student Leader"],
                        ["AEOP Summer Leader"],
                      ].map(([label], idx) => (
                        <div className="d-flex gap-2 mb-2" key={idx}>
                          <i className="fs-six p1-color">
                            <PiTrophy />
                          </i>
                          <div>
                            <span className="n4-color fs-seven">{label}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Languages & Interests (optional retain) */}
                    <div className="mb-8 mb-md-15">
                      <div className="d-flex align-items-center gap-2 mb-3 mb-md-6">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">Languages</h2>
                      </div>
                      <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                        <li className="n4-color fs-seven">English (Native)</li>
                        <li className="n4-color fs-seven">Arabic (Native)</li>
                      </ul>
                    </div>

                    <div>
                      <div className="d-flex align-items-center gap-2 mb-3 mb-md-6">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">Interests</h2>
                      </div>
                      <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                        <li className="n4-color fs-seven">AI for Healthcare</li>
                        <li className="n4-color fs-seven">Motion Simulation</li>
                        <li className="n4-color fs-seven">Mentorship & Outreach</li>
                        <li className="n4-color fs-seven">Hardware Tinkering</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social footer row */}
              <div className="d-flex flex-wrap gap-2 gap-md-3 gap-md-5 align-items-center justify-content-center mt-4 mt-md-8">
                <Link href="https://github.com/ialzouby" className="d-flex gap-1 align-items-center resume-icon">
                  <div className="social-icon">
                    <i className="p1-color">
                      <PiGithubLogo />
                    </i>
                  </div>
                  <span className="fs-eight n4-color">github.com/ialzouby</span>
                </Link>
                <Link href="https://linkedin.com/in/Alzouby" className="d-flex gap-1 align-items-center resume-icon">
                  <div className="social-icon">
                    <i className="p1-color">
                      <PiLinkedinLogo />
                    </i>
                  </div>
                  <span className="fs-eight n4-color">linkedin.com/in/Alzouby</span>
                </Link>
                <Link href="https://x.com/ialzouby" className="d-flex gap-1 align-items-center resume-icon">
                  <div className="social-icon">
                    <i className="p1-color">
                      <PiXLogo />
                    </i>
                  </div>
                  <span className="fs-eight n4-color">@ialzouby</span>
                </Link>
              </div>
            </div>
          </FadeDown>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Resume;
