import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Footer from '../components/footer'
import Navbar from "../components/navbar"
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Finite Loop Club - NMAMIT</title>
        <meta name="description" content="Finite Loop is a Coding Club, which aims to give a good perspective of development, and encourages students to realize their ideas. We encourage students to participate in competitive programming and thus, inspire the next." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  )
}

export default MyApp
