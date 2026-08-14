import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import SectionHeading from "./SectionHeading";
import { contact, awards } from "../lib/data";
import { MailIcon, PhoneIcon, MapPinIcon, GithubIcon, LinkedinIcon, AwardIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Contact = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(".contact-title", { type: "chars" });
      gsap.fromTo(
        split.chars,
        { y: 60, opacity: 0, rotate: 6 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      gsap.fromTo(
        ".contact-label",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      gsap.fromTo(
        ".contact-sub",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        },
      );

      gsap.fromTo(
        ".contact-item",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-items", start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".social-btn",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(3)",
          scrollTrigger: { trigger: ".social-row", start: "top 85%" },
        },
      );

      gsap.fromTo(
        ".award-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".award-row", start: "top 85%" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-6 md:px-16 pt-12 md:pt-20 pb-12 scroll-mt-24 relative"
    >
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-secondary-fixed/10 blur-3xl pointer-events-none -z-10" />

      <div className="text-center max-w-2xl mx-auto">
        <div className="contact-label font-jet text-sm text-secondary tracking-widest uppercase pb-3">
          05 — Contact
        </div>
        <h2 className="contact-title font-serif4 font-bold text-4xl md:text-6xl tracking-tight text-on-surface leading-tight">
          Let&apos;s build something
        </h2>
        <p className="contact-sub font-inter text-on-surface-variant mt-6">
          Open to new challenges and opportunities. Reach out and let&apos;s talk about how I can
          help your team ship reliable, scalable software.
        </p>

        <div className="contact-items flex flex-wrap justify-center gap-x-8 gap-y-4 mt-10">
          <a
            href={`mailto:${contact.email}`}
            className="contact-item flex items-center gap-2 font-inter text-on-surface hover:text-secondary transition-colors"
          >
            <MailIcon className="text-secondary" />
            {contact.email}
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="contact-item flex items-center gap-2 font-inter text-on-surface hover:text-secondary transition-colors"
          >
            <PhoneIcon className="text-secondary" />
            {contact.phone}
          </a>
          <span className="contact-item flex items-center gap-2 font-inter text-on-surface">
            <MapPinIcon className="text-secondary" />
            {contact.location}
          </span>
        </div>

        <div className="social-row flex justify-center gap-4 mt-8">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="social-btn size-11 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface hover:bg-secondary hover:text-on-secondary hover:border-secondary transition-colors"
          >
            <GithubIcon />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="social-btn size-11 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface hover:bg-secondary hover:text-on-secondary hover:border-secondary transition-colors"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>

      <div className="award-row grid sm:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl mx-auto mt-20">
        {awards.map((award) => (
          <div
            key={award.title}
            className="award-card group relative flex items-start gap-3 pl-5"
          >
            <span className="absolute left-0 top-0 bottom-0 w-px bg-outline-variant/40" />
            <span className="absolute left-0 top-0 w-px h-full bg-secondary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
            <AwardIcon className="text-secondary shrink-0 mt-0.5" />
            <div>
              <div className="font-inter font-medium text-on-surface text-sm">{award.title}</div>
              <div className="font-jet text-xs text-outline mt-1">
                {award.org} · {award.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-24 pt-8 border-t border-outline-variant/20 font-jet text-xs text-outline">
        <span>© {new Date().getFullYear()} Sabarivasan Sankar</span>
        <span>Built with React &amp; GSAP</span>
      </div>
    </section>
  );
};

export default Contact;
