import "@/styles/globals.css";
import Head from "next/head";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <title>Malawi Holidays</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header included on all pages */}
      <Header />

      {/* Main content */}
      <Component {...pageProps} />
    </>
  );
}
