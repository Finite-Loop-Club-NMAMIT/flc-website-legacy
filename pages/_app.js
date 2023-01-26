import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Footer from '../components/footer';
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('../components/navbar'), { ssr: false });
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import nProgress from 'nprogress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  nProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 });
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      nProgress.start();
    });

    router.events.on('routeChangeComplete', () => {
      nProgress.done();
    });

    return () => {
      nProgress.done();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <Head>
          <title>Finite Loop Club - NMAMIT</title>
          <meta
            name="description"
            content="Finite Loop is a Coding Club, which aims to give a good perspective of development, and encourages students to realize their ideas. We encourage students to participate in competitive programming and thus, inspire the next."
          />

          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
            integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
