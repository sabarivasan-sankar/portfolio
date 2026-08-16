import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import SkillsSection from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";

gsap.registerPlugin(SplitText, ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <div>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Navbar />
      <HeroSection ready={!loading} />
      <Experience />
      <SkillsSection />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
