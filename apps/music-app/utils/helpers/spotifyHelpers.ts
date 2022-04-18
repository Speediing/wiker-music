import axios from "axios";

export const getArtistNameFromSearch = async (
  search: string,
  accessToken: string
) => {
  const searchData = await axios.get(
    `https://api.spotify.com/v1/search?type=artist&q=${search}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  let artistName = searchData.data.artists.items[0].name;
  return artistName;
};

export const getPodcastEpisodesFromBandNames = async (
  names: string[],
  roles: string[],
  accessToken: string
) => {
  let urls: any = [];
  names.forEach(async (name: any) => {
    urls.push(
      axios.get(`https://api.spotify.com/v1/search?type=episode&q=${name}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    );
  });
  let proms: any = [];
  try {
    proms = await Promise.allSettled(urls);
  } catch (error) {
    console.log(error);
  }

  let completedReqs = proms
    .filter((x: any) => x.status === "fulfilled")
    .map((x: any) => x.value);
  let eps: any = [];

  completedReqs.forEach((prom: any, index: number) => {
    prom.data.episodes.items.forEach((ep: any) => {
      eps.push({ ...ep, artist: names[index], role: roles[index] || "" });
    });
  });
  return eps;
};
