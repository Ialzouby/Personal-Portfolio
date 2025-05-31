"use client";

import Image from "next/image";
import Leadership1 from "@/../public/images/leadership1.jpg";
import Leadership2 from "@/../public/images/leadership3.png";
import Leadership3 from "@/../public/images/leadership2.png";
import Leadership6 from "@/../public/images/leadership6.png";



const leadership = [
  {
    title: "Community Pantry Organizer",
    desc: "Led and Organized Bi-Weekly drives feeding 50+ families each time.",
    img: Leadership1,
  },
  {
    title: "Tech Mentor",
    desc: "Mentored and Guided Students through projects including FPV Drones and Coding",
    img: Leadership2,
  },
  {
    title: "Police Dept Outreach",
    desc: "Led and Organized quarterly outreach initiatives to Charlotte's PD and FD.",
    img: Leadership3,
  },
  {
    title: "Free HealthCare Clinic",
    desc: "Managed and developed website and scheduling system for a free health care clinic.",
    img: Leadership2,
  },
  {
    title: "UNICEF Translator",
    desc: "Traveled to refugee camps in Jordan to provide translations and assist with applications.",
    img: Leadership6,
  },
  {
    title: "Tech Conference Volunteer",
    desc: "Volunteered at tech conferences across the south-east, one of which led to a full time position.",
    img: Leadership2,
  },
];

export default function LeadershipGrid() {
  return (
<div className="container pt-4 pb-5">
<h2 className="text-center mb-10">Leadership & Outreach</h2>

      <div className="row g-4">
        {leadership.map(({ title, desc, img }, index) => (
          <div className="col-12 col-md-6" key={index}>
  <div className="modern-card cosmic-glass hover-effect position-relative">
    <div className="ratio ratio-16x9 rounded-top overflow-hidden">
    <Image src={img} alt={title} fill className="object-fit-cover" />

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
