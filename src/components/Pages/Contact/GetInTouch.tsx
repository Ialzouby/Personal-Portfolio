"use client";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FadeDown from "@/components/motionEffect/FadeDown";

const MySwal = withReactContent(Swal);

const GetInTouch = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // emailjs
    //   .sendForm(
    //     "your service id",
    //     "your template id ",
    //     //@ts-ignore
    //     form.current,
    //     "Your public key"
    //   )
    //   .then(
    //     (result) => {
    //       MySwal.fire("Message Send Successfully!");
    //     },
    //     (error) => {
    //       MySwal.fire("Message Not Send!");
    //     }
    //   );
  };
  return (
    <section className="pb-120">
      <div className="container">
        <FadeDown>
          <div className="section-heading">
            <div className="d-flex align-items-center gap-2">
              <div className="title-line"></div>
              <h2 className="display-four n5-color fw-semibold">
                Get In Touch
              </h2>
            </div>
            <p className="fs-seven n4-color mt-2 mt-md-4">
              Always happy to chat!
            </p>
          </div>
        </FadeDown>
        <FadeDown>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="mt-8 mt-md-15 p-3 p-sm-5 p-md-10 rounded-5 brn4"
          >
            <div className="d-flex flex-wrap flex-md-nowrap gap-3 gap-md-6 mb-3 mb-md-6">
              <div className="d-flex align-items-center gap-2  py-2 py-md-4 rounded-2 brn4 w-100">
                <i className="ph ph-octagon p1-color fs-six mb-1"></i>
                <input
                  className="n5-color border-0"
                  placeholder="Your Name*"
                  type="text"
                  id="name"
                  required
                />
              </div>
              <div className="d-flex align-items-center gap-2  py-2 py-md-4 rounded-2 brn4 w-100">
                <i className="ph ph-envelope p1-color fs-six mb-1"></i>
                <input
                  className="n5-color border-0"
                  placeholder="Email address*"
                  type="email"
                  id="email"
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-wrap flex-md-nowrap gap-3 gap-md-6">
              <div className="d-flex align-items-center gap-2 py-2 py-md-4 rounded-2 brn4 w-100">
                <i className="ph ph-device-mobile-camera p1-color fs-six mb-1"></i>
                <input
                  className="n5-color border-0"
                  placeholder="Phone*"
                  type="number"
                  id="phone"
                  required
                />
              </div>
              <div className="d-flex align-items-center gap-2 py-2 py-md-4 rounded-2 brn4 w-100">
                <i className="ph ph-map-pin p1-color fs-six mb-1"></i>
                <input
                  className="n5-color border-0"
                  placeholder="Location*"
                  type="text"
                  id="location"
                  required
                />
              </div>
            </div>
            <div className="mt-3 mt-md-6">
              <textarea
                className="n5-color px-2 px-md-3 py-2 py-md-4 rounded-2 brn4 w-100 h-120"
                placeholder="Your Message:"
                id="message"
              ></textarea>
            </div>

            <div className="d-flex gap-2 align-items-center mt-3 mt-md-5">
              <input id="check" type="checkbox" className="cursor-pointer" />
              <label
                htmlFor="check"
                className="n4-color fs-nine cursor-pointer"
              >
                Save my name, email, and website in this browser for the next
                time.
              </label>
            </div>
            <button className="p-btn bg1-color fw-medium n11-color px-3 px-md-6 py-2 py-md-4 rounded-pill mt-5 mt-md-10">
              Send Message
            </button>
          </form>
        </FadeDown>
      </div>
    </section>
  );
};

export default GetInTouch;
