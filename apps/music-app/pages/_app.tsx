import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import { fetcher } from "../utils/helpers/authHelpers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component className={"bg-black min-h-screen h-full"} {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
