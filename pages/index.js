import Hero from "../components/hero"
import About from '../components/about'
import Perks from '../components/perks'
import Tech from '../components/tech'
import Discord from '../components/discord'

export default function Home() {
  return (
    <div>
      <Hero />
      <hr />
      <About />
      <hr />
      <Perks />
      <hr />
      <Tech />
      <hr />
      <Discord />
      <hr />
    </div>
  )
}