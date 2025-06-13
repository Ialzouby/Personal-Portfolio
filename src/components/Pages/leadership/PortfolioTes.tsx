"use client";

import Image from "next/image";
import Link from "next/link";

// Replace these with real thumbnails when ready
import Thumb1 from "@/../public/images/gallery5.jpg";
import Thumb2 from "@/../public/images/gallery5.jpg";
import Thumb3 from "@/../public/images/gallery5.jpg";
import Thumb4 from "@/../public/images/gallery5.jpg";
import Thumb5 from "@/../public/images/gallery5.jpg";
import Thumb6 from "@/../public/images/gallery5.jpg";

type Item = {
  id: number;
  img: any;
  title: string;
  description: string;
  href?: string;
};

const leadership: Item[] = [
  {
    id: 1,
    img: Thumb1,
    title: "Community Pantry Organizer",
    description: "Weekly drives feeding 200+ families; coordinated volunteers & inventory.",
  },
  {
    id: 2,
    img: Thumb2,
    title: "Tech Mentor",
    description: "Guided high‑schoolers in AI, coding, and career planning.",
  },
  {
    id: 3,
    img: Thumb3,
    title: "Police Dept Outreach",
    description: "Built a youth‑tech event in partnership with local officers.",
  },
  {
    id: 4,
    img: Thumb4,
    title: "Clinic Tech Lead",
    description: "Designed & maintained systems for a refugee‑serving clinic.",
  },
  {
    id: 5,
    img: Thumb5,
    title: "UNICEF Translator",
    description: "Arabic ↔ English translation for UNICEF health campaigns.",
  },
  {
    id: 6,
    img: Thumb6,
    title: "Tech Conference Volunteer",
    description: "Co‑ordinated logistics & speakers at national tech events.",
  },
];

export default function LeadershipSection() {
  return (
    <section className="container py-5">
      <h2 className="text-center mb-5 display-5 fw-bold text-dark"> & Outreach</h2>

      <div className="row gy-4">
        {leadership.map(({ id, img, title, description, href }) => (
          <div className="col-sm-12 col-md-6" key={id}>
            <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: "#fdfbff" }}>
              <Link href={href ?? "#"} className="text-decoration-none">
                <div className="position-relative" style={{ aspectRatio: "4 / 3" }}>
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="card-img-top object-fit-cover rounded-top"
                    style={{ transition: "transform 0.3s ease" }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title text-dark fw-semibold">{title}</h5>
                  <p className="card-text text-secondary">{description}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
