import { featureds } from "@/../public/data/ProjectData";
import { PiArrowRight } from "react-icons/pi";
import Footer from "@/components/Shared/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
import FadeDown from "@/components/motionEffect/FadeDown";
import NextProject from "@/components/Pages/About/NextProject";

type Props = {
  params: { id: string };
};

const PortfolioDetails = ({ params }: Props) => {
  const project = featureds.find((item) => item.id === parseInt(params.id));

  if (!project) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold text-red-600">Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className="overflow-visible">
      <section className="pt-120 pb-120 mt-10 mt-lg-0 overflow-visible">
        <div className="pb-60">
          <FadeDown>
            <div className="page-heading">
              <h3 className="page-title fs-onefw-semibold n5-color mb-2 mb-md-3 text-center">
                {project.title}
              </h3>
              <p className="fs-seven n5-color mb-4 mb-md-8 text-center">
                {project.intro}
              </p>
            </div>
          </FadeDown>
        </div>

        <div className="container my-8 my-md-15">
          <div className="row g-6">
            {/* LEFT SIDEBAR */}
            <div className="col-12 col-xl-3">
              <div className="position-sticky top-0">
                <FadeDown>
                  <div className="d-flex flex-column gap-5 brn4 p-3 p-md-5 rounded">
                    <div>
                      <span className="n4-color fs-eight fw-medium d-block">Client:</span>
                      <span className="n5-color fs-six fw-medium">{project.client}</span>
                    </div>
                    <div>
                      <span className="n4-color fs-eight fw-medium d-block">Services</span>
                      <span className="n5-color fs-six fw-medium">{project.services}</span>
                    </div>
                    <div>
                      <span className="n4-color fs-eight fw-medium d-block">Technologies</span>
                      <span className="n5-color fs-six fw-medium">{project.technologies}</span>
                    </div>
                    <div>
                      <span className="n4-color fs-eight fw-medium d-block">Website</span>
                      <Link href={project.website || "#"} className="n5-color fs-six fw-medium d-flex align-items-center gap-2">
                        Live preview <PiArrowRight />
                      </Link>
                    </div>
                  </div>
                </FadeDown>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="col-12 col-xl-9">
              <div className="project-details-content">
                <FadeDown>
                  <div className="overflow-hidden">
                    <Image
                      src={project.img}
                      alt={project.title}
                      className="w-100 portfolio-details-img"
                    />
                  </div>

                  <div className="my-8 my-md-15">
                    <h3 className="fs-five n5-color fw-semibold mb-3">Project Requirements</h3>
                    <p className="text-seven n4-color">{project.overview}</p>
                  </div>

                  <div className="mb-8 mb-md-15">
                    <h2 className="fs-two fw-semibold n5-color mb-2 mb-md-4">
                      The Challenge
                    </h2>
                    <p className="text-seven n4-color">{project.challenge}</p>
                  </div>
                </FadeDown>

                <FadeDown>
                  <div className="mb-8 mb-md-15">
                    <h2 className="fs-two fw-semibold n5-color mb-2 mb-md-4">
                      The Approach & Solution
                    </h2>
                    <p className="text-seven n4-color mb-5 mb-md-10">{project.solution}</p>

                    <div className="row g-3 g-md-6">
                      {project.gallery?.map((img, index) => (
                        <div className="col-sm-6 overflow-hidden" key={index}>
                          <Image
                            src={img}
                            alt={`project-image-${index}`}
                            className="w-100 object-fit-cover portfolio-details-img"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeDown>

                <FadeDown>
                  <div className="mb-8 mb-md-15">
                    <h2 className="fs-two fw-semibold n5-color mb-2 mb-md-4">
                      The Results
                    </h2>
                    <div className="row g-3 g-md-5">
                      {project.results?.map(({ title, value, trend, desc }, i) => (
                        <div key={i} className="col-sm-6 col-xl-4 col-xxl-3">
                          <div className="bgn2-color brn4 p-3 p-md-5 h-100">
                            <span className="p1-color fs-six fw-medium mb-2 d-block">
                              {title}
                            </span>
                            <div className="d-flex align-items-end gap-1 mb-2 mb-md-3">
                              <h4 className="fs-three n5-color fw-semibold">{value}</h4>
                              {trend && (
                                <span className="fs-six n4-color fw-medium">
                                  {trend}
                                </span>
                              )}
                            </div>
                            <p className="fs-eight n4-color">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeDown>
              </div>
            </div>
          </div>
        </div>

        <NextProject />
      </section>
      <Footer />
    </div>
  );
};

export default PortfolioDetails;
