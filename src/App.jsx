import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import SkillsSection from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

gsap.registerPlugin(SplitText, ScrollTrigger);

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Experience />
      <SkillsSection />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
