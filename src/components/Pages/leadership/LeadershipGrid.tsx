"use client";

import Image from "next/image";
import Leadership1 from "@/../public/images/leadership/leadership1.jpg";
import Leadership2 from "@/../public/images/leadership/leadership3.png";
import Leadership3 from "@/../public/images/leadership/leadership2.png";
import Leadership6 from "@/../public/images/leadership/leadership6.png";
import Leadership7 from "@/../public/images/leadership/leadership7.png";
import Leadership8 from "@/../public/images/leadership/leadership8.png";
import Leadership9 from "@/../public/images/leadership/leadership9.png";
import Leadership10 from "@/../public/images/leadership/leadership10.png";
const leadership = [
  {
    title: "Stanford HAI AI4ALL - Graduate AI Mentor",
    desc: "Mentored students through the medical AI track.",
    img: Leadership7,
  },
  {
    title: "UNC Charlotte - AEOP - Graduate AI Mentor",
    desc: "Mentored students through UNC-Charlotte's STEM internship program.",
    img: Leadership8,
  },
  {
    title: "Community Pantry Organizer",
    desc: "Led and organized bi-weekly drives feeding 50+ families each time.",
    img: Leadership1,
  },
  {
    title: "Tech Mentor",
    desc: "Mentored students through hands-on projects, including FPV drones and coding.",
    img: Leadership2,
  },
  {
    title: "Police Dept Outreach",
    desc: "Organized quarterly outreach initiatives to Charlotte’s PD and FD.",
    img: Leadership3,
  },  {
    title: "Tech Conference Volunteer",
    desc: "Volunteered at major Southeast tech conferences — led to a full-time role.",
    img: Leadership9,
  },
  {
    title: "UNICEF Translator",
    desc: "Assisted with translations and documentation in Jordanian refugee camps.",
    img: Leadership6,
  },
{
    title: "Free Healthcare Clinic",
    desc: "Developed website and scheduling system for a refugee-focused free clinic.",
    img: Leadership10,
  },
];

export default function LeadershipGrid() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 display-6 fw-bold text-dark">Leadership & Outreach</h2>

      <div className="row g-4">
        {leadership.map(({ title, desc, img }, index) => (
          <div className="col-12 col-md-6" key={index}>
            <div
              className="rounded shadow-sm h-100"
              style={{
                background: "#f9f5ff", // soft purple tint
                border: "1px solid #e0d7f5",
                transition: "transform 0.3s ease",
              }}
            >
              <div className="ratio ratio-16x9 rounded-top overflow-hidden">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-fit-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <h5 className="fw-semibold text-dark mb-2">{title}</h5>
                <p className="text-secondary mb-0">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
