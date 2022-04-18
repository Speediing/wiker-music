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
