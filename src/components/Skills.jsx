import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiGo,
  SiRubyonrails,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiSvelte,
  SiNodedotjs,
  SiExpress,
  SiApachekafka,
  SiGit,
  SiClaude,
} from "react-icons/si";
import { TbApi, TbShieldLock, TbTransfer, TbPlugConnected } from "react-icons/tb";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

const toolIcons = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "SQL (PostgreSQL)": SiPostgresql,
  Go: SiGo,
  "Ruby on Rails": SiRubyonrails,
  React: SiReact,
  Redux: SiRedux,
  "Tailwind CSS": SiTailwindcss,
  Svelte: SiSvelte,
  "React Native": SiReact,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "RESTful APIs": TbApi,
  RBAC: TbShieldLock,
  "Apache Kafka": SiApachekafka,
  CDC: TbTransfer,
  Celigo: TbPlugConnected,
  Git: SiGit,
  "Claude Code": SiClaude,
};

const tools = Array.from(new Set(skillGroups.flatMap((g) => [...g.items, ...g.familiar])));
const familiarTools = new Set(skillGroups.flatMap((g) => g.familiar));

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const toolsWrapRef = useRef(null);
  const toolsTrackRef = useRef(null);

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
        ".tool-item",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: toolsWrapRef.current, start: "top 85%" },
        },
      );

      const toolsTrack = toolsTrackRef.current;
      const toolsWrap = toolsWrapRef.current;
      const getToolsOffset = () => Math.max(0, toolsTrack.scrollWidth - toolsWrap.offsetWidth);
      // Slightly longer than the raw pixel offset so the reveal paces itself
      // more slowly relative to how far the page actually scrolls.
      const getPinDistance = () => getToolsOffset() * 1.3;

      const toolsTween = gsap.to(toolsTrack, { x: () => -getToolsOffset(), ease: "none" });

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "center center",
        end: () => "+=" + getPinDistance(),
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
        animation: toolsTween,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="skills" ref={sectionRef} className="py-12 md:py-20 scroll-mt-24">
      <div ref={pinRef}>
        <div className="px-6 md:px-16">
          <SectionHeading index="03" label="Skills" title="What I work with" />
          <div className="flex items-center gap-5 mt-4 font-jet text-xs text-outline">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Experienced with
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Familiar with
            </span>
          </div>
        </div>

        <div
          ref={toolsWrapRef}
          className="mt-8 md:mt-12 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            ref={toolsTrackRef}
            className="flex gap-8 md:gap-10 w-max px-6 md:px-16 pt-3 md:pt-4 will-change-transform"
          >
            {tools.map((tool) => {
              const Icon = toolIcons[tool];
              const isFamiliar = familiarTools.has(tool);
              return (
                <div key={tool} className="tool-item flex flex-col items-center gap-4 w-32 md:w-44 shrink-0">
                  <div
                    className={`relative w-28 h-28 md:w-40 md:h-40 rounded-3xl border flex items-center justify-center text-on-surface-variant transition-colors duration-300 ${
                      isFamiliar
                        ? "bg-blue-50 border-blue-200 hover:border-blue-400"
                        : "bg-emerald-50 border-emerald-200 hover:border-emerald-400"
                    }`}
                  >
                    <Icon size={52} className="md:hidden" />
                    <Icon size={72} className="hidden md:block" />
                    <span
                      className={`absolute -top-2 -right-2 font-jet text-[9px] md:text-[10px] uppercase tracking-wide text-white px-2 py-0.5 rounded-full whitespace-nowrap ${
                        isFamiliar ? "bg-blue-500" : "bg-emerald-500"
                      }`}
                    >
                      {isFamiliar ? "Familiar" : "Experienced"}
                    </span>
                  </div>
                  <span className="font-jet text-sm md:text-base text-center text-on-surface-variant leading-tight">
                    {tool}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
