import { NextApiRequest, NextApiResponse } from "next";
import { formatArtist } from "../../utils/helpers/rymHelper";
import { Redis } from "@upstash/redis";
import { refreshTokenQuery } from "../../utils/helpers/authHelpers";
import { cache } from "swr/dist/utils/config";
const cheerio = require("cheerio");
const axios = require("axios");

//   console.log(postTitles);
//   console.log(fullTitle);
// console.log(testjson.artist.bio.summary.replaceAll("\n", ""));
//   console.log(fullTitle.replaceAll("\n", "").match(/(\w+\s\w+)(?=\s?\(.*?)/gm));
//   console.log(postTitles);
//   console.log(fullTitle.replaceAll("\n", "").match(/\((.*?)\)/gm));
//   console.log(searchData.data.artists.items[0].name);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(process.env);
  const redis = new Redis({
    url: "https://usw2-awake-anemone-30070.upstash.io",
    token: process.env.UPSTASH_SECRET || "",
  });
  let token = await redis.get("accessToken");

  if (!token) {
    let refreshToken: string | null = await redis.get("refreshToken");
    const test = await refreshTokenQuery(refreshToken || "");
    if (test.access_token) {
      token = test.access_token;
      await redis.set("accessToken", test.access_token, {});
      redis.expire("accessToken", test.expires_in - 100);
    }
  }

  const searchData = await axios.get(
    `https://api.spotify.com/v1/search?type=artist&q=${req.query.search}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(
    `https://rateyourmusic.com/artist/${formatArtist(
      searchData.data.artists.items[0].name
    )}`
  );
  let artistName = searchData.data.artists.items[0].name;
  let cachedArtist: any = await redis.get(artistName);
  let names: string[] = [];
  let roles: string[] = [];
  console.log(cachedArtist);
  if (cachedArtist) {
    console.log("hehe got the cache");
    names = cachedArtist?.names;
    roles = cachedArtist?.roles;
  }
  if (!cachedArtist) {
    const { data } = await axios.get(
      `https://rateyourmusic.com/artist/${formatArtist(
        searchData.data.artists.items[0].name
      )}`
    );
    //   } catch (error) {
    //     console.log(error);
    //   }
    console.log("after");
    const $ = cheerio.load(data);
    let artistIndex = 0;
    let found = false;
    $(
      "#column_container_left > div > div.section_artist_info > div.artist_info > div.artist_info_main > div"
    ).each((_idx: any, el: any) => {
      if (!found) {
        artistIndex += 1;
        if ($(el).text() === "Members") found = true;
      }
    });
    console.log(artistIndex);
    $(
      `#column_container_left > div > div.section_artist_info > div.artist_info > div.artist_info_main > div:nth-child(${
        artistIndex + 1
      }) > span > a`
    ).each((_idx: any, el: any) => {
      const postTitle = $(el).text();
      names.push(postTitle);
    });
    let fullTitle = $(
      `#column_container_left > div > div.section_artist_info > div.artist_info > div.artist_info_main > div:nth-child(${
        artistIndex + 1
      }) > span`
    ).text();
    roles = fullTitle.replaceAll("\n", "").match(/\((.*?)\)/gm);
    await redis.set(
      artistName,
      JSON.stringify({ names: names, roles: roles }),
      {}
    );
  }

  let urls: any = [];
  names.forEach(async (name: any) => {
    urls.push(
      axios.get(`https://api.spotify.com/v1/search?type=episode&q=${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  });

  let proms = await Promise.all(urls);
  let eps: any = [];

  proms.forEach((prom: any, index: number) => {
    prom.data.episodes.items.forEach((ep: any) => {
      eps.push({ ...ep, artist: names[index], role: roles[index] });
    });
  });
  //   console.log(postTitles);
  //   console.log(fullTitle);

  // console.log(eps.length);
  //   eps.forEach((ep: any) => {
  //     console.log(ep);
  //   });
  res.status(200).json(
    eps
      .sort((a: any, b: any) => b.release_date.localeCompare(a.release_date))
      .filter(
        (value: any, index: number, self: any) =>
          index === self.findIndex((t: any) => t.uri === value.uri)
      )
      .filter((ep: any) => ep.description.includes(ep.artist))
  );
}
