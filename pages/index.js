import Hero from "../components/hero"
import About from '../components/about'
import Perks from '../components/perks'
import Tech from '../components/tech'
import Discord from '../components/discord'

export default function Home() {
  return (
    <div>
      <Hero />
      <hr className="border-gray-500/50" />
      <About />
      <hr className="border-gray-500/50" />
      <Perks />
      <hr className="border-gray-500/50" />
      <Tech />
      <hr className="border-gray-500/50" />
      <Discord />
      <hr className="border-gray-500/50" />
    </div>
  )
}