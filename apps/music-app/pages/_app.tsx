import type { AppProps } from "next/app";
import Head from "next/head";
import { StatsigProvider } from "statsig-react";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import { fetcher } from "../utils/helpers/authHelpers";
import cookie from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_API_KEY || ""}
      user={{
        userID: cookie.load("statsiguid"),
      }}
      waitForInitialization={true}
    >
      <SWRConfig value={{ fetcher }}>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Component className={"bg-black min-h-screen h-full"} {...pageProps} />
      </SWRConfig>
    </StatsigProvider>
  );
}

export default MyApp;
