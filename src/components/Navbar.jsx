import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MenuIcon, CloseIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { name: "Home", link: "home" },
  { name: "Experience", link: "experience" },
  { name: "Skills", link: "skills" },
  { name: "Projects", link: "projects" },
  { name: "Contact", link: "contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef(null);
  const linksRef = useRef([]);
  const mobilePanelRef = useRef(null);
  const mobileLinksRef = useRef([]);

  linksRef.current = [];
  mobileLinksRef.current = [];
  const addLinkRef = (el) => {
    if (el && !linksRef.current.includes(el)) linksRef.current.push(el);
  };
  const addMobileLinkRef = (el) => {
    if (el && !mobileLinksRef.current.includes(el)) mobileLinksRef.current.push(el);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".nav-logo", { y: -18, opacity: 0, duration: 0.6 })
        .from(linksRef.current, { y: -14, opacity: 0, duration: 0.5, stagger: 0.07 }, "-=0.35")
        .from(".nav-actions > *", { y: -14, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");

      ScrollTrigger.create({
        start: 0,
        end: 140,
        scrub: 0.3,
        onUpdate: (self) => {
          gsap.set(headerRef.current, {
            paddingTop: gsap.utils.interpolate(20, 10, self.progress),
            paddingBottom: gsap.utils.interpolate(20, 10, self.progress),
            boxShadow: `0 10px 30px -12px rgba(11, 28, 48, ${gsap.utils.interpolate(0, 0.18, self.progress)})`,
          });
        },
      });
    },
    { scope: headerRef },
  );

  useGSAP(
    () => {
      if (!mobilePanelRef.current) return;

      if (open) {
        gsap.set(mobilePanelRef.current, {
          top: headerRef.current.offsetHeight,
          clipPath: "inset(0% 0% 100% 0%)",
        });
        const tl = gsap.timeline();
        tl.to(mobilePanelRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.45,
          ease: "power3.inOut",
        }).from(
          mobileLinksRef.current,
          { y: 24, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
          "-=0.2",
        );
      } else if (mounted) {
        const tl = gsap.timeline({ onComplete: () => setMounted(false) });
        tl.to(mobileLinksRef.current, { y: 12, opacity: 0, duration: 0.2, stagger: 0.03 }).to(
          mobilePanelRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.35, ease: "power3.inOut" },
          "-=0.1",
        );
      }
    },
    { scope: headerRef, dependencies: [open, mounted] },
  );

  const openMenu = () => {
    setMounted(true);
    setOpen(true);
  };
  const closeMenu = () => setOpen(false);
  const toggleMenu = () => (open ? closeMenu() : openMenu());

  return (
    <>
    <header
      ref={headerRef}
      className="sticky top-0 z-50 flex justify-between items-center py-5 px-6 md:px-16 border-b border-b-outline-variant/30 bg-surface/80 backdrop-blur-md"
    >
      <a href="#home" className="nav-logo font-serif4 font-bold text-2xl text-primary shrink-0">
        Sabarivasan Sankar
      </a>

      <nav className="gap-8 items-center hidden md:flex">
        {links.map((item) => (
          <a
            ref={addLinkRef}
            key={item.link}
            href={`#${item.link}`}
            className="font-inter text-on-surface-variant hover:text-primary transition-colors relative group"
          >
            {item.name}
            <span className="absolute left-0 -bottom-1 h-px w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>

      <div className="nav-actions flex items-center gap-3">
        <a
          href="/resume.pdf"
          download
          className="btn-contained h-fit hidden sm:inline-block"
        >
          Resume
        </a>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          className="md:hidden text-on-surface p-1"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

    </header>

    {mounted && (
      <div
        ref={mobilePanelRef}
        className="md:hidden fixed inset-x-0 bottom-0 bg-surface flex flex-col gap-2 px-6 py-8 z-40"
      >
        {links.map((item) => (
          <a
            ref={addMobileLinkRef}
            key={item.link}
            href={`#${item.link}`}
            onClick={closeMenu}
            className="font-serif4 text-3xl font-bold text-on-surface py-3 border-b border-outline-variant/20"
          >
            {item.name}
          </a>
        ))}
        <a
          ref={addMobileLinkRef}
          href="/resume.pdf"
          download
          className="btn-contained text-center mt-6 py-3 rounded-sm"
        >
          Resume
        </a>
      </div>
    )}
    </>
  );
}

export default Navbar;
