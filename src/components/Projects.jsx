import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { projects } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
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
        ".project-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".project-grid", start: "top 78%" },
        },
      );

      const cards = gsap.utils.toArray(".project-card");
      const cleanups = [];

      gsap.set(".project-rail", { scaleY: 0, transformOrigin: "top" });

      cards.forEach((card) => {
        const rail = card.querySelector(".project-rail");
        const nudgeX = gsap.quickTo(card, "x", { duration: 0.4, ease: "power3.out" });
        const railScale = gsap.quickTo(rail, "scaleY", { duration: 0.4, ease: "power3.out" });

        const onEnter = () => {
          nudgeX(8);
          railScale(1);
        };
        const onLeave = () => {
          nudgeX(0);
          railScale(0);
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef} className="px-6 md:px-16 py-12 md:py-20 scroll-mt-24">
      <SectionHeading index="04" label="Projects" title="Things I've built" />

      <div className="project-grid grid md:grid-cols-3 gap-x-10 gap-y-12 mt-16">
        {projects.map((project) => (
          <div key={project.title} className="project-card relative pl-7 flex flex-col">
            <span className="absolute left-0 top-0 bottom-0 w-px bg-outline-variant/40" />
            <span className="project-rail absolute left-0 top-0 w-px h-full bg-secondary" />

            <h3 className="font-serif4 font-bold text-xl text-on-surface mb-3">{project.title}</h3>
            <p className="font-inter text-sm text-on-surface-variant leading-relaxed grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-jet text-[11px] uppercase tracking-wide text-secondary border border-secondary/30 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
