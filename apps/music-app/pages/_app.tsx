import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import { fetcher } from "../utils/helpers/authHelpers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component className={"bg-black min-h-screen h-full"} {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
