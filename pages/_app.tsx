import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Kufam } from 'next/font/google';

const kufam = Kufam({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={kufam.className}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
}
