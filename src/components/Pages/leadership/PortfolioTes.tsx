"use client";

import Image from "next/image";
import Link from "next/link";

// ⬇  replace these with real thumbnails (one‑per‑card) when ready
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
    description:
      "Weekly drives feeding 200+ families; coordinated volunteers & inventory.",
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

// ————————————————————————————————————————————————————————————
// Component – modern, minimalist, two‑column card grid
// ————————————————————————————————————————————————————————————
export default function LeadershipSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        Leadership & Outreach
      </h2>

      {/* Two‑column grid (1 column on very small screens) */}
      <ul className="grid gap-8 sm:grid-cols-2">
        {leadership.map(({ id, img, title, description, href }) => (
          <li
            key={id}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
          >
            {/* THUMBNAIL */}
            <Link href={href ?? "#"} className="block overflow-hidden rounded-t-xl bg-gray-100">
              {/* Aspect ratio wrapper keeps every image the same height */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={img}
                  alt={title}
                  fill
                  sizes="(max-width:640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={id === 1}
                />
              </div>
            </Link>

            {/* COPY */}
            <div className="flex flex-1 flex-col p-6">
              <Link href={href ?? "#"} className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 group-hover:underline">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {description}
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
