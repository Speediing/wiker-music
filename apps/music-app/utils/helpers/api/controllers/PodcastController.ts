import {
  createRedisClient,
  getAccessTokenInRedis,
  incrementSearchCount,
} from "../../redisHelpers";
import {
  getArtistNameFromSearch,
  getPodcastEpisodesFromBandNames,
} from "../../spotifyHelpers";
import { getBandNamesAndRolesFromWikipedia } from "../../wikipediaHelper";

export const getPodcastsFromArtist = async (artist: string) => {
  const redis = createRedisClient();
  let accessToken = await getAccessTokenInRedis(redis);

  let artistName = await getArtistNameFromSearch(artist, accessToken || "");

  let cachedArtistNames: any = await redis.get(artistName);
  let names: string[] = [];
  let roles: string[] = [];
  if (cachedArtistNames) {
    names = cachedArtistNames?.names;
    roles = cachedArtistNames?.roles;
  } else {
    try {
      let namesAndRoles = await getBandNamesAndRolesFromWikipedia(artistName);
      names = namesAndRoles.names;
      roles = namesAndRoles.roles;
      await redis.set(
        artistName,
        JSON.stringify({
          names: namesAndRoles.names,
          roles: namesAndRoles.roles,
        }),
        {}
      );
    } catch (error) {
      names = [artistName];
      console.log(error);
    }
  }

  let episodes = await getPodcastEpisodesFromBandNames(
    names.map((x) => x.replace(/\s+/g, " ")),
    roles,
    accessToken || ""
  );

  //   let count = await incrementSearchCount(redis);
  //   if (count % 10 === 0) res.unstable_revalidate("/");
  return {
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
  };
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
};
