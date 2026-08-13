import gsap from "gsap"
import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import BackgroundShader from "./components/Shader"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

function App() {
  return (
    <div>
      <BackgroundShader />
      <Navbar />
      <HeroSection />
    </div>
  )
}

export default App
