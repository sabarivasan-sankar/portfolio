import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { experience, experienceStats, experienceFocus } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".section-heading-wrap",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      gsap.fromTo(
        ".exp-sidebar",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-sidebar", start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".exp-stat",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".exp-sidebar", start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".timeline-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".timeline-track",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        },
      );

      const cards = gsap.utils.toArray(".exp-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%" },
          },
        );
        gsap.fromTo(
          card.querySelector(".dot"),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(3)",
            scrollTrigger: { trigger: card, start: "top 82%" },
          },
        );
        const points = card.querySelectorAll(".exp-point");
        gsap.fromTo(
          points,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 75%" },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="px-6 md:px-16 py-12 md:py-20 scroll-mt-24"
    >
      <SectionHeading index="02" label="Experience" title="Where I've worked" />

      <div className="mt-16 md:mt-20 grid lg:grid-cols-[1fr_300px] gap-x-12">
        <div className="relative pl-10 md:pl-14 max-w-3xl">
          <div className="timeline-track absolute left-1 md:left-1.5 top-2 bottom-2 w-px bg-outline-variant/30" />
          <div className="timeline-fill absolute left-1 md:left-1.5 top-2 bottom-2 w-px bg-secondary" />

          {experience.map((job) => (
            <div key={job.role} className="exp-card relative pb-16 last:pb-0">
              <span className="dot absolute -left-9 md:-left-13 top-1.5 w-3 h-3 rounded-full bg-secondary ring-4 ring-surface" />

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
                <h3 className="font-serif4 font-bold text-2xl text-on-surface">{job.role}</h3>
                <span className="font-jet text-xs text-outline tracking-wide">{job.period}</span>
              </div>
              <div className="font-inter text-secondary mb-4 flex items-center gap-2">
                {job.company}
                {job.current && (
                  <span className="font-jet text-[10px] uppercase tracking-widest bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-2">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="exp-point font-inter text-sm text-on-surface-variant leading-relaxed pl-5 relative before:content-['▸'] before:absolute before:left-0 before:text-secondary"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="exp-sidebar hidden lg:block lg:sticky lg:top-32 self-start h-fit">
          <div className="border-t-2 border-secondary pt-6">
            <div className="font-jet text-xs text-outline tracking-widest uppercase mb-5">
              At a glance
            </div>
            <div className="flex flex-col gap-5">
              {experienceStats.map((stat) => (
                <div key={stat.label} className="exp-stat">
                  <div className="font-serif4 font-bold text-3xl text-secondary leading-none">
                    {stat.value}
                  </div>
                  <div className="font-inter text-sm text-on-surface-variant mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-px bg-outline-variant/30 my-6" />
            <div className="font-jet text-xs text-outline tracking-widest uppercase mb-3">
              Currently focused on
            </div>
            <div className="flex flex-wrap gap-2">
              {experienceFocus.map((tag) => (
                <span
                  key={tag}
                  className="font-jet text-xs bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Experience;
