import { NextRequest, NextResponse } from "next/server";
import { getSpotifyTokensFromAuthCode } from "../../utils/helpers/spotifyHelpers";
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

  await statsig.initialize(process.env.STATSIG_SERVER_API_KEY as string, {
    initTimeoutMs: 1000,
  });

  let userID = req.cookies[UID_COOKIE];

  if (!userID) {
    userID = crypto.randomUUID();
  }

  const experiment = await statsig.getExperiment({ userID }, "podcast_button");
  const type = experiment.get("type", "badge");
  const response = NextResponse.next();

  if (!req.cookies[UID_COOKIE]) {
    response.cookie(UID_COOKIE, userID);
  }
  response.cookie(PODCAST_BUTTON_TYPE, type);

  return response;
};
