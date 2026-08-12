import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import BackgroundShader from "./components/Shader"

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
