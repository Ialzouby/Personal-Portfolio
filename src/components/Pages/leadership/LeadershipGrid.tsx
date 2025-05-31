"use client";

import Image from "next/image";
import Thumb from "@/../public/images/gallery5.jpg";

const leadership = [
  {
    title: "Community Pantry Organizer",
    desc: "Weekly drives feeding 200+ families.",
  },
  {
    title: "Tech Mentor",
    desc: "Guided high-schoolers in AI and coding.",
  },
  {
    title: "Police Dept Outreach",
    desc: "Built a youth-tech event with local police.",
  },
  {
    title: "Clinic Tech Lead",
    desc: "Managed systems for a refugee clinic.",
  },
  {
    title: "UNICEF Translator",
    desc: "Arabic ↔ English for UNICEF health campaigns.",
  },
  {
    title: "Tech Conference Volunteer",
    desc: "Coordinated logistics for national events.",
  },
];

export default function LeadershipGrid() {
  return (
<div className="container pt-4 pb-5">
<h2 className="text-center mb-10">Leadership & Outreach</h2>

      <div className="row g-4">
        {leadership.map(({ title, desc }, index) => (
          <div className="col-12 col-md-6" key={index}>
  <div className="modern-card cosmic-glass hover-effect position-relative">
    <div className="ratio ratio-16x9 rounded-top overflow-hidden">
      <Image
        src={Thumb}
        alt={title}
        fill
        className="object-fit-cover"
      />
    </div>
    <div className="p-4 position-relative z-1">
      <h5 className="fw-semibold text-white mb-2">{title}</h5>
      <p className="text-light mb-0">{desc}</p>
    </div>
  </div>
</div>




        ))}
      </div>
    </div>
  );
}
