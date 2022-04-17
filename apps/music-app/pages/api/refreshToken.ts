import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `https://accounts.spotify.com/api/token`;
  const { refreshToken } = JSON.parse(req.body);
  if (refreshToken) {
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
    if (tokenResponse) res.status(200).json(tokenResponse);
  } else {
    res.status(400).json({ error: true });
  }
}
