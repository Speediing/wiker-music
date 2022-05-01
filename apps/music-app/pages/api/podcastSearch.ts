import { NextApiRequest, NextApiResponse } from "next";
import { getPodcastsFromArtist } from "../../utils/helpers/api/controllers/PodcastController";

import {
  createRedisClient,
  getAccessTokenInRedis,
  incrementSearchCount,
} from "../../utils/helpers/redisHelpers";
import {
  getArtistNameFromSearch,
  getPodcastEpisodesFromBandNames,
} from "../../utils/helpers/spotifyHelpers";
import { getBandNamesAndRolesFromWikipedia } from "../../utils/helpers/wikipediaHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const redis = createRedisClient();

  let podcasts = getPodcastsFromArtist(req.query.search.toString());

  let count = await incrementSearchCount(redis);
  if (count % 10 === 0) res.unstable_revalidate("/");
  res.status(200).json(podcasts);
}
