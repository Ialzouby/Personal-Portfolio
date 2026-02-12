"use client";
import CountUp from "react-countup";

const Counter = () => {
  return (
    <>
      <div className="banner-counter d-flex flex-wrap justify-content-center align-items-center gap-2 gap-md-4 mt-3 mb-2">
        <div className="counter-item d-flex align-items-center gap-2 gap-xl-3">
          <h2 className="counter-number fs-two fw-semibold p1-color">
            <CountUp start={0} end={5} duration={3} enableScrollSpy scrollSpyOnce>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </h2>
          <div className="counter-line line"></div>
          <span className="counter-label n5-color text-start fs-nine">
            Years of<br />Experience
          </span>
        </div>
        <div className="counter-item d-flex align-items-center gap-2 gap-xl-3">
          <h2 className="counter-number fs-two fw-semibold p1-color">
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
          <div className="counter-line line"></div>
          <span className="counter-label n5-color text-start fs-nine">
            Hackathon<br />Wins
          </span>
        </div>
        <div className="counter-item d-flex align-items-center gap-2 gap-xl-3">
          <h2 className="counter-number fs-two fw-semibold p1-color d-flex gap-1">
            <CountUp start={0} end={5} duration={2} enableScrollSpy scrollSpyOnce>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </h2>
          <div className="counter-line line"></div>
          <span className="counter-label n5-color text-start fs-nine">
            Publications
          </span>
        </div>
        <div className="counter-item d-flex align-items-center gap-2 gap-xl-3">
          <h2 className="counter-number fs-two fw-semibold p1-color d-flex gap-1">
            <CountUp start={0} end={448} duration={2} enableScrollSpy scrollSpyOnce>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </h2>
          <div className="counter-line line"></div>
          <span className="counter-label n5-color text-start fs-nine">
            2025<br />Github<br />Contributions
          </span>
        </div>
      </div>

      <style jsx>{`
        .banner-counter {
          width: 100%;
        }

        .counter-item {
          flex: 0 1 auto;
        }

        .counter-line {
          height: 28px;
        }

        .counter-label {
          line-height: 1.2;
          font-size: 0.75rem;
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .banner-counter {
            gap: 1rem !important;
            justify-content: space-between !important;
          }

          .counter-item {
            flex: 0 1 calc(50% - 0.5rem);
            min-width: 0;
          }

          .counter-number {
            font-size: 1.5rem !important;
          }

          .counter-line {
            height: 20px !important;
          }

          .counter-label {
            font-size: 0.65rem !important;
          }
        }

        @media (max-width: 480px) {
          .banner-counter {
            gap: 0.75rem !important;
          }

          .counter-item {
            gap: 0.5rem !important;
          }

          .counter-number {
            font-size: 1.25rem !important;
          }

          .counter-line {
            height: 18px !important;
          }

          .counter-label {
            font-size: 0.6rem !important;
            line-height: 1.1;
          }
        }

        /* Landscape Mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .counter-item {
            flex: 0 1 auto;
          }

          .counter-number {
            font-size: 1.25rem !important;
          }

          .counter-label {
            font-size: 0.6rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Counter;