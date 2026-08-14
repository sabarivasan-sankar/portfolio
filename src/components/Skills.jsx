import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { skillGroups, competence } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);

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
        ".skill-row",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skill-list", start: "top 78%" },
        },
      );

      const marqueeTween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 26,
        ease: "none",
        repeat: -1,
      });

      const marqueeEl = marqueeRef.current.parentElement;
      const onEnter = () => gsap.to(marqueeTween, { timeScale: 0, duration: 0.4 });
      const onLeave = () => gsap.to(marqueeTween, { timeScale: 1, duration: 0.4 });
      marqueeEl.addEventListener("mouseenter", onEnter);
      marqueeEl.addEventListener("mouseleave", onLeave);

      return () => {
        marqueeEl.removeEventListener("mouseenter", onEnter);
        marqueeEl.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section id="skills" ref={sectionRef} className="px-6 md:px-16 py-12 md:py-20 scroll-mt-24">
      <SectionHeading index="03" label="Skills" title="What I work with" />

      <div className="skill-list flex flex-col divide-y divide-outline-variant/20 mt-12">
        {skillGroups.map((group, i) => {
          const tags = [
            ...group.items.map((t) => ({ text: t, familiar: false })),
            ...group.familiar.map((t) => ({ text: t, familiar: true })),
          ];
          return (
            <div
              key={group.title}
              className="skill-row group relative flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10 py-6 md:pl-6"
            >
              <span className="absolute left-0 top-0 bottom-0 w-px bg-secondary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out hidden md:block" />

              <div className="flex items-baseline gap-3 md:w-52 shrink-0">
                <span className="font-jet text-xs text-outline tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif4 font-bold text-2xl text-on-surface group-hover:text-secondary transition-colors duration-300">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-1 gap-y-2 font-jet text-sm flex-1">
                {tags.map((tag, idx) => (
                  <span key={tag.text} className="flex items-baseline">
                    <span className={tag.familiar ? "text-outline italic" : "text-on-surface-variant"}>
                      {tag.text}
                    </span>
                    {idx < tags.length - 1 && (
                      <span className="text-outline-variant/60 ml-3 mr-0.5">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-12 -mx-6 md:-mx-16 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div ref={marqueeRef} className="flex gap-4 w-max">
          {[...competence, ...competence].map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="font-jet text-sm text-on-surface-variant border border-outline-variant/40 bg-surface-container-lowest px-5 py-2.5 rounded-full whitespace-nowrap shrink-0"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
