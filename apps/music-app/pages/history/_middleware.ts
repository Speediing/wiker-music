import { NextRequest, NextResponse } from "next/server";
import { getSpotifyTokensFromAuthCode } from "../../utils/helpers/spotifyHelpers";
import { getStatSigUserId } from "../../utils/helpers/statsigHelpers";
import { getStatSigPodcastButtonType } from "../../utils/helpers/statsigHelpers";
import statsig from "statsig-node";

const UID_COOKIE = "statsiguid";
const PODCAST_BUTTON_TYPE = "podcastButtonType";
export const middleware = async (req: NextRequest) => {
  const { nextUrl: url } = req;
  let authCode = req?.nextUrl?.searchParams?.get("code");
  if (authCode) {
    let responseJson = await getSpotifyTokensFromAuthCode(
      authCode,
      url?.origin
    );
    url.searchParams.delete("code");
    url.searchParams.set("refreshToken", responseJson.refresh_token);
    url.searchParams.set("userToken", responseJson.access_token);
    return NextResponse.redirect(url);
  }
  const response = NextResponse.next();

  let userID = getStatSigUserId(req.cookies[UID_COOKIE]);
  if (!req.cookies[UID_COOKIE]) {
    response.cookie(UID_COOKIE, userID);
  }
  if (!req.cookies[PODCAST_BUTTON_TYPE]) {
    const type = await getStatSigPodcastButtonType(userID);
    response.cookie(PODCAST_BUTTON_TYPE, type);
  }

  return response;
};
