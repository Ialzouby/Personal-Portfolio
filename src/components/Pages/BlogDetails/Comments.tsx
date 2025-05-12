"use client";
import Image, { StaticImageData } from "next/image";
import buyer4 from "@/../public/images/buyer4.png";
import { useState } from "react";
import { commentsData } from "../../../../public/data/AllData";
import AnimateHeight from "react-animate-height";
import { PiPaperPlaneTilt } from "react-icons/pi";

const Comments = () => {
  const [toggle, setToggle] = useState<null | number>(0);

  const handleToggle = (id: number) => {
    if (toggle === id) {
      setToggle(null);
    } else {
      setToggle(id);
    }
  };

  return (
    <section className="mt-8 mt-md-15 comment-section">
      <h3 className="n5-color fs-three fw-semibold mb-4 mb-md-8">3 Comments</h3>

      <div className="py-120">
        {commentsData.map(
          ({
            id,
            img,
            name,
            date,
            des,
          }: {
            id: number;
            img: StaticImageData;
            name: string;
            date: string;
            des: string;
          }) => (
            <div key={id} className=" overflow-hidden  mb-3 mb-md-6">
              <div className="d-flex flex-wrap flex-md-nowrap gap-4 gap-md-8 px-4 px-md-8 py-3 py-md-6 rounded-3 w-100 brn4 ">
                <div className="flex-shrink-0">
                  <Image
                    src={img}
                    alt="..."
                    className="cmnt-img flex-shrink-0"
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex gap-3 justify-content-between align-items-center w-100">
                    <div className="w-100">
                      <h6 className="n5-color fs-six fw-medium">{name}</h6>
                      <span className="n5-color fs-nine fw-medium">{date}</span>
                    </div>
                    <button
                      onClick={() => handleToggle(id)}
                      className={`px-3 px-md-5 py-2 p1-color br1 rounded-pill`}
                    >
                      Reply
                    </button>
                  </div>
                  <p className="n4-color fs-eight mt-2 mt-md-4">{des}</p>
                </div>
              </div>
              <AnimateHeight duration={500} height={toggle === id ? "auto" : 0}>
                <div className="reply-answer mt-3 mt-md-6 ms-5 ms-md-10">
                  <form>
                    <div className="d-flex align-items-center gap-3 gap-md-5">
                      <input
                        type="text"
                        placeholder="Enter Your comments"
                        className="px-3 px-md-6 py-2 py-md-4 w-100 brn4 rounded-3 n5-color"
                      />
                      <button className="fs-six n11-color bg1-color px-3 px-md-5 py-2 rounded-pill">
                        <PiPaperPlaneTilt />
                      </button>
                    </div>
                  </form>
                </div>
              </AnimateHeight>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Comments;
