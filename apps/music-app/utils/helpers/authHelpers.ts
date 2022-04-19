const queryString = require("query-string");
export const refreshTokenQuery = async (refreshToken: string) => {
  const url = `https://accounts.spotify.com/api/token`;
  const tokenRequest = await fetch(url, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const tokenResponse = await tokenRequest.json();
  return tokenResponse;
};

export const isLoggedIn = () => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("refreshToken") !== null;
  }
  return false;
};

const moreThanOneHourAgo = (date: number) => {
  const HOUR = 1000 * 60 * 60;
  return Date.now() - date > HOUR;
};

export const fetcher = async (url: string) => {
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
};

export const loginUrl =
  "https://accounts.spotify.com/authorize?" +
  queryString.stringify({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    scope:
      "user-read-private user-read-email user-read-recently-played user-read-playback-position user-top-read",
    redirect_uri: `${process.env.NEXT_PUBLIC_HOSTNAME}/history`,
  });
