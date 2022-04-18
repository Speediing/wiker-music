import { NextApiRequest, NextApiResponse } from "next";

import {
  createRedisClient,
  getAccessTokenInRedis,
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
  let accessToken = await getAccessTokenInRedis(redis);

  let artistName = await getArtistNameFromSearch(
    req.query.search.toString(),
    accessToken || ""
  );

  let cachedArtistNames: any = await redis.get(artistName);

  let names: string[] = [];
  let roles: string[] = [];
  if (cachedArtistNames) {
    names = cachedArtistNames?.names;
    roles = cachedArtistNames?.roles;
  } else {
    let namesAndRoles = await getBandNamesAndRolesFromWikipedia(artistName);
    await redis.set(
      artistName,
      JSON.stringify({
        names: namesAndRoles.names,
        roles: namesAndRoles.roles,
      }),
      {}
    );
  }

  let episodes = await getPodcastEpisodesFromBandNames(
    names,
    roles,
    accessToken || ""
  );

  res.status(200).json({
    artistName,
    eps: episodes
      .sort((a: any, b: any) => b.release_date.localeCompare(a.release_date))
      .filter(
        (value: any, index: number, self: any) =>
          index === self.findIndex((t: any) => t.uri === value.uri)
      )
      .filter((ep: any) =>
        ep.description
          .toLowerCase()
          .includes(ep.artist.toLowerCase() || artistName.toLowerCase())
      ),
  });
}
