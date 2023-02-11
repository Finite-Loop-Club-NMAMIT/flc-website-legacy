import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "next-themes";
import nProgress from "nprogress";
import { type Session } from "next-auth";

import { api } from "../utils/api";

import "../styles/globals.css";
import "../styles/nprogress.min.css";

import Footer from "../components/footer";
const Navbar = dynamic(() => import("../components/navbar"), { ssr: false });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  nProgress.configure({ showSpinner: false, easing: "ease", speed: 500 });
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      nProgress.start();
    });

    router.events.on("routeChangeComplete", () => {
      nProgress.done();
    });

    return () => {
      nProgress.done();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <SessionProvider session={session}>
        <Head>
          <title>Finite Loop Club - NMAMIT</title>
          <meta
            name="description"
            content="Finite Loop is a Coding Club, which aims to give a good perspective of development, and encourages students to realize their ideas. We encourage students to participate in competitive programming and thus, inspire the next."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <Analytics />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
