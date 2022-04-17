import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "../styles/globals.css";

const moreThanOneHourAgo = (date: number) => {
  const HOUR = 1000 * 60 * 60;
  return Date.now() - date > HOUR;
};

async function fetcher(url: string) {
  const headerToken = window?.location.search.split("userToken=")[1];
  const lsToken = localStorage.getItem("userToken");
  const lastRefresh: string | null = localStorage.getItem("lastRefresh");

  let token = lsToken ? lsToken : headerToken;
  //check if needs to refresh
  if (moreThanOneHourAgo(new Date(lastRefresh || "").getTime())) {
    const tokensResponse = await fetch(
      `${window.location.origin}/api/refreshToken`,
      {
        method: "POST",
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      }
    );
    let tokens = await tokensResponse.json();
    if (tokens) {
      token = tokens.access_token;
      localStorage.setItem("userToken", token);
      localStorage.setItem("lastRefresh", new Date().toISOString());
    }
  }
  return fetch(`https://api.spotify.com/v1/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component className={"bg-black min-h-screen h-full"} {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
