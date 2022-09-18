import Head from 'next/head'
import Navbar from "../components/navbar"
import Hero from "../components/hero"
import About from '../components/about'
import Perks from '../components/perks'
import Tech from '../components/tech'
import Footer from '../components/footer'
import Discord from '../components/discord'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Finite Loop Club - NMAMIT</title>
        <meta name="description" content="Finite Loop is a Coding Club, which aims to give a good perspective of development, and encourages students to realize their ideas. We encourage students to participate in competitive programming and thus, inspire the next." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <About />
      <Perks />
      <Tech />
      <Discord />
      <Footer />
    </div>
  )
}