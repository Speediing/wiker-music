import { NextRequest, NextResponse } from "next/server";

type IAuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export const middleware = async (req: NextRequest) => {
  const { nextUrl: url } = req;
  let authCode = req?.nextUrl?.searchParams?.get("code");
  if (authCode) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${url?.origin}/history`,
    });
    let responseJson: IAuthResponse = await response.json();
    url.searchParams.delete("code");
    url.searchParams.set("refreshToken", responseJson.refresh_token);
    url.searchParams.set("userToken", responseJson.access_token);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};
