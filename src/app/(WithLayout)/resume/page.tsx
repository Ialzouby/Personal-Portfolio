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
  PiPhone,
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
              <a
                href="#"
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
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 br-bottom-n3 pb-3 pb-md-6">
                <div>
                  <h2 className="display-three p1-color fw-semibold">
                    Issam Alzouby
                  </h2>
                  <span className="n4-color fs-six fw-medium">
                    Medical AI Researcher | Digital Twin Systems | Infra & Motion Modeling
                  </span>
                </div>
                <div className="ps-5 br-left-n3">
                  <ul className="d-flex flex-column gap-3">
                    <li>
                      <Link href="tel:+17045551234" className="d-flex gap-2 align-items-center n4-color">
                        <PiPhone /> +1 (704) 555-1234
                      </Link>
                    </li>
                    <li>
                      <Link href="mailto:ialzouby@gmail.com" className="d-flex gap-2 align-items-center n4-color">
                        <PiEnvelopeSimple /> ialzouby@gmail.com
                      </Link>
                    </li>
                    <li className="d-flex gap-2 align-items-center n4-color">
                      <PiGlobe /> issamalzouby.com
                    </li>
                    <li className="d-flex gap-2 align-items-center n4-color">
                      <PiMapPin /> Charlotte, NC
                    </li>
                  </ul>
                </div>
              </div>

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
                  I'm a Medical AI Engineer focused on building real-time digital twin systems through advanced motion modeling, GPU-accelerated pipelines, and AI optimization. My research bridges applied machine learning, biomedical systems, and human movement simulation. I’ve led award-winning work at Duke, UNC Chapel Hill, while mentoring students and deploying scalable models using PyTorch, FastAPI, and CoreML.
                </p>
              </div>

              <div className="resume-section row pt-60 pb-60 br-bottom-n3">
                <div className="col-md-8 col-lg-12 col-xl-8 col-xxl-9">
                  <div className="d-flex align-items-center gap-2 mb-5 mb-md-10">
                    <div className="title-line2"></div>
                    <h2 className="fs-three p1-color fw-semibold">Experience</h2>
                  </div>

                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">
                        AI Research Assistant
                      </span>
                      <span className="n4-color fs-eight">UNC Charlotte | 2023 – Present</span>
                    </div>
                    <p className="n42-color fs-seven my-2 my-md-5">
                    </p>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">Led model deployment, optimizing pipelines to achieve a 70%+ reduction in processing and inference time</li>
                      <li className="n42-color fs-seven">Built a scalable CUDA-based pipeline deploying BAMM and TADA on an A6000 GPU cluster for rapid motion generation</li>
                      <li className="n42-color fs-seven">Trained transformer-based text-to-motion models for generating realistic human movement from language</li>
                    </ul>
                  </div>

                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">
                        Medical AI Research Collaborator
                      </span>
                      <span className="n4-color fs-eight">Duke Heart Center | 2024 – Present</span>
                    </div>
                    <p className="n42-color fs-seven my-2 my-md-5">
                    </p>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">Awarded ‘Best Oral Presentation in Cardiac Surgery’ at the 62nd Eastern Cardiothoracic Surgical Society conference</li>
                      <li className="n42-color fs-seven">Designed an algorithm that improved projected organ donation success by 94% and reduced ICU staff workload</li>
                      <li className="n42-color fs-seven">Co-authored 4 medical AI papers on clinical decision making, currently in final review for submission to Nature Medicine</li>
                    </ul>
                  </div>

                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">
                        IT Manager
                      </span>
                      <span className="n4-color fs-eight">Data Connectors CyberSecurity | Jan 2024 – Jan 2025</span>
                    </div>
                    <p className="n42-color fs-seven my-2 my-md-5">
                    </p>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">Administered and secured the Office 365 suite, including IAM and Defender, mitigating risks and ensuring compliance</li>
                      <li className="n42-color fs-seven">Traveled across the US and Canada to manage conferences and engaged with industry leaders, fostering collaboration</li>
                      <li className="n42-color fs-seven">Trained cross-departmental teams on system tools and processes, driving efficiency and consistent workflow adoption</li>
                      <li className="n42-color fs-seven">Refined HubSpot pipelines for over 900,000 leads, applying Power Query, Power BI & OSINT to boost data fidelity</li>
                    </ul>
                  </div>

                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="n5-color fs-six fw-medium">
                        GPU Infrastructure Support Engineer
                      </span>
                      <span className="n4-color fs-eight">iRepairCLT | 2020 – 2023</span>
                    </div>
                    <p className="n42-color fs-seven my-2 my-md-5">
                    </p>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">Reverse Engineered proprietary ASIC hashing boards and Nvidia Graphics Cards (Primarily RTX 30/40 Series)</li>
                      <li className="n42-color fs-seven">Maintained GPU clusters across high humidity and high heat mining farms, implementing solutions to maximize uptime </li>
                    </ul>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-5 mb-md-10">
                    <div className="title-line2"></div>
                    <h2 className="fs-three p1-color fw-semibold">Projects</h2>
                  </div>

                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center mb-2 mb-md-4">
                      <span className="n5-color fs-six fw-medium">
                      T2M & A2M Multi-modal Motion Generation
                      </span>
                      <span className="n42-color fs-eight">OpenSource AI / FastAPI / Motion Generation</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">

                    <li className="n42-color fs-seven">Led a team of 5 master’s students under faculty supervision to deploy BAMM and SMPL-X models on a university GPU cluster</li>
                      <li className="n42-color fs-seven">Reduced T2M inference time from 90s to 7s and audio preprocessing from 4min to 30s using CUDA optimization</li>
                      <li className="n42-color fs-seven">Built custom FastAPI endpoints and a responsive Next.js frontend for real-time motion generation from text and audio</li>
                      <li className="n42-color fs-seven">Implemented motion retargeting to TADA avatars, enabling expressive in-browser 3D animation</li>
                    </ul>
                  </div>

                  <div className="mb-4 mb-md-6">
                    <div className="d-flex justify-content-between align-items-center mb-2 mb-md-4">
                      <span className="n5-color fs-six fw-medium">6 Time Hackathon Winner </span>
                      <span className="n42-color fs-eight">Node.js / OpenAI API / Innovation</span>
                    </div>
                    <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                      <li className="n42-color fs-seven">NC NASA Hackathon, UNC Chapel Hill’s HackNC, NC State Hackathon, and the Truist Immersive Experience</li>
                      <li className="n42-color fs-seven">Secured 1st place in the 2024 NC State Competitive Programming Competition demonstrating problem solving skills</li>
                      <li className="n42-color fs-seven">Developed AI-powered voice translation and bias-reducing applications, securing 1st place in 4 major hackathons</li>
                      <li className="n42-color fs-seven">Leveraged CoreML, PyTorch, OpenAI API, AWS Amplify, and Firebase, demonstrating practical impact and innovation</li>
                    </ul>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-md-4 col-lg-12 col-xl-4 col-xxl-3">
                  <div className="ps-4 ps-xxl-7 br-left-n3 mt-5 mt-md-0">
                    <div className="mb-8 mb-md-15">
                      <div className="d-flex align-items-center gap-2 mb-5 mb-md-10">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">Skills</h2>
                      </div>
                      <ul className="d-flex flex-column gap-3 ms-6 ms-lg-10">
                        <li className="n4-color fs-seven">Motion Modeling (SMPL, MoMask, BAMM)</li>
                        <li className="n4-color fs-seven">GPU Infrastructure (CUDA, RTX6000 Cluster)</li>
                        <li className="n4-color fs-seven">CoreML, ONNX, PyTorch, FastAPI</li>
                        <li className="n4-color fs-seven">Three.js, React, Tailwind, Next.js</li>
                        <li className="n4-color fs-seven">OpenAI APIs (ChatGPT, Whisper, DALL·E)</li>
                      </ul>
                    </div>

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
                            B.S. Computer Science – UNC Charlotte (R1)
                          </span>
                          <span className="n4-color fs-eleven">Expected 2025</span>
                        </div>

                      </div>
                      <div className="d-flex gap-2 mb-3 mb-md-5">
                        <i className="fs-six p1-color">
                          <PiGraduationCap />
                        </i>
                      <div>
                          <span className="n4-color fs-seven">
                            M.S. Artificial Intelligence – UNC Charlotte (R1)
                          </span>
                          <span className="n4-color fs-eleven">Expected 2026</span>
                        </div>
                    </div>
                    </div>

                    <div className="mb-8 mb-md-15">
                      <div className="d-flex align-items-center gap-2 mb-3 mb-md-6">
                        <div className="title-line2"></div>
                        <h2 className="fs-three p1-color fw-semibold">Awards</h2>
                      </div>
                      <div className="d-flex gap-2 mb-3 mb-md-5">
                        <i className=" fs-six p1-color">
                          <PiTrophy />
                        </i>
                        <div>
                          <span className="n4-color fs-seven">
                            1st Place – Eastern Cardiothoracic Surgical Society Conference
                          </span>
                          <span className="n4-color fs-eleven">2024</span>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <i className=" fs-six p1-color">
                          <PiTrophy />
                        </i>
                        <div>
                          <span className="n4-color fs-seven">
                            Truist Immersive Team Leader
                          </span>
                          <span className="n4-color fs-eleven">2023</span>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <i className=" fs-six p1-color">
                          <PiTrophy />
                        </i>
                        <div>
                          <span className="n4-color fs-seven">
                            AI Research Travel Grant
                          </span>
                          <span className="n4-color fs-eleven">2023</span>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <i className=" fs-six p1-color">
                          <PiTrophy />
                        </i>
                        <div>
                          <span className="n4-color fs-seven">
                            UNC-Charlotte Career Panelist
                          </span>
                          <span className="n4-color fs-eleven">2023</span>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <i className=" fs-six p1-color">
                          <PiTrophy />
                        </i>
                        <div>
                          <span className="n4-color fs-seven">
                            UNC-Charlotte Chancellor's List
                          </span>
                          <span className="n4-color fs-eleven">2023</span>
                        </div>
                      </div>
                    </div>

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
                        <li className="n4-color fs-seven">AI for Healthcare Equity</li>
                        <li className="n4-color fs-seven">Motion Simulation</li>
                        <li className="n4-color fs-seven">Mentoring & Community Outreach</li>
                        <li className="n4-color fs-seven">Tinkering with Hardware</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 gap-md-3 gap-md-5 align-items-center justify-content-center mt-4 mt-md-8">
                <Link href="https://github.com/ialzouby" className="d-flex gap-1 align-items-center resume-icon">
                  <div className="social-icon">
                    <i className="p1-color">
                      <PiGithubLogo />
                    </i>
                  </div>
                  <span className="fs-eight n4-color">github.com/ialzouby</span>
                </Link>
                <Link href="https://linkedin.com/in/alzouby" className="d-flex gap-1 align-items-center resume-icon">
                  <div className="social-icon">
                    <i className="p1-color">
                      <PiLinkedinLogo />
                    </i>
                  </div>
                  <span className="fs-eight n4-color">linkedin.com/in/alzouby</span>
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
