import FadeDown from "@/components/motionEffect/FadeDown";
import GetInTouch from "@/components/Pages/Contact/GetInTouch";
import Footer from "@/components/Shared/Footer/Footer";
import Link from "next/link";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiStackOverflowLogo,
  PiXLogo,
  PiYoutubeLogo,
} from "react-icons/pi";

const Contact = () => {
  return (
    <div>
      <section className="pt-120 pb-120 mt-10 mt-lg-0">
        <FadeDown>
          <div className="pb-60 br-bottom-n3">
            <div className="page-heading">
              <h3 className="page-title fs-onefw-semibold n5-color mb-2 mb-md-3 text-center">
                Contact
              </h3>
              <p className="fs-seven n5-color mb-4 mb-md-8 text-center">
              Building something interesting? Have feedback or just want to chat?
              I’m always open to new ideas and conversations.
                <Link href="#" className="p1-color">
                  {" "}
                  
                </Link>{" "}
                
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-2 align-items-center mt-4">
                <Link href="#" className="social-icon">
                  <i className="p1-color">
                    <PiFacebookLogo />
                  </i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="p1-color">
                    <PiInstagramLogo />
                  </i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="p1-color">
                    <PiXLogo />
                  </i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="p1-color">
                    <PiLinkedinLogo />
                  </i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="p1-color">
                    <PiStackOverflowLogo />
                  </i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="p1-color">
                    <PiYoutubeLogo />
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </FadeDown>
      </section>

      {/* Contact Form */}
      <GetInTouch />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
