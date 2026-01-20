"use client";
import CountUp from "react-countup";

const Counter = () => {
  return (
<div className="banner-counter d-flex flex-wrap justify-content-center align-items-center gap-3 gap-md-6 mt-3 mb-2">
      <div className="d-flex align-items-center gap-2 gap-xl-4">
        <h2 className="display-two fw-semibold p1-color">
          <CountUp start={0} end={5} duration={3} enableScrollSpy scrollSpyOnce>
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        </h2>
        <div className="line"></div>
        <span className="n5-color text-start" style={{ lineHeight: "1.2" }}>
          Years<br />of<br />Experience
        </span>
      </div>
      <div className="d-flex align-items-center gap-2 gap-xl-4">
        <h2 className="display-two fw-semibold p1-color">
          <CountUp
            start={0}
            end={8}
            duration={2}
            enableScrollSpy
            scrollSpyOnce
          >
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        </h2>
        <div className="line"></div>
        <span className="n5-color text-start" style={{ lineHeight: "1.2" }}>
          Hackathon<br />Wins
        </span>
      </div>
      <div className="d-flex align-items-center gap-2 gap-xl-4">
        <h2 className="display-two fw-semibold p1-color d-flex gap-1">
          <CountUp start={0} end={5} duration={2} enableScrollSpy scrollSpyOnce>
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        </h2>
        <div className="line"></div>
        <span className="n5-color text-start" style={{ lineHeight: "1.2" }}>
          Publications
        </span>
      </div>
      <div className="d-flex align-items-center gap-2 gap-xl-4">
        <h2 className="display-two fw-semibold p1-color d-flex gap-1">
          <CountUp start={0} end={448} duration={2} enableScrollSpy scrollSpyOnce>
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        </h2>
        <div className="line"></div>
        <span className="n5-color text-start" style={{ lineHeight: "1.2" }}>
          2025<br />Github<br />Contributions
        </span>
      </div>
    </div>
  );
};

export default Counter;