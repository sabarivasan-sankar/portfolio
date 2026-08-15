import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { skillGroups, competence } from "../lib/data";
import { CodeIcon, LayoutIcon, ServerIcon, DatabaseIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

const icons = [CodeIcon, LayoutIcon, ServerIcon, DatabaseIcon];

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
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
        ".skill-card",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: pinRef.current, start: "top 85%" },
        },
      );

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const track = trackRef.current;
          const pinEl = pinRef.current;
          const getScrollAmount = () => track.scrollWidth - pinEl.offsetWidth;

          const tween = gsap.to(track, { x: () => -getScrollAmount(), ease: "none" });

          const getNavOffset = () => document.querySelector("header")?.offsetHeight || 0;

          ScrollTrigger.create({
            trigger: pinEl,
            start: () => "top " + getNavOffset(),
            end: () => "+=" + getScrollAmount(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            animation: tween,
          });
        },
      });

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
    <section id="skills" ref={sectionRef} className="py-12 md:py-20 scroll-mt-24">
      <div className="px-6 md:px-16">
        <SectionHeading index="03" label="Skills" title="What I work with" />
      </div>

      <div ref={pinRef} className="skills-pin relative mt-12 md:overflow-hidden">
        <div
          ref={trackRef}
          className="skills-track flex flex-col md:flex-row gap-5 px-6 md:px-16 md:w-max will-change-transform"
        >
          {skillGroups.map((group, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={group.title}
                className="skill-card bg-surface-container-lowest border border-outline-variant/25 rounded-2xl p-8 flex flex-col items-center text-center hover:border-secondary/50 transition-colors duration-300 md:w-[380px] lg:w-[420px] md:shrink-0"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="text-secondary" />
                  <h3 className="font-serif4 font-bold text-lg text-on-surface">{group.title}</h3>
                </div>
                <p className="font-inter text-sm text-on-surface-variant mb-6">{group.caption}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-jet text-xs bg-secondary-container/40 text-on-secondary-container px-3 py-1.5 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                  {group.familiar.map((item) => (
                    <span
                      key={item}
                      className="font-jet text-xs bg-surface-container-high text-outline px-3 py-1.5 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="mt-12 overflow-hidden"
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
