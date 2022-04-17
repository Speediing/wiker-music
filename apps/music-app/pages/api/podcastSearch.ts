import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let lastfmkey = "";
  let test = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=${lastfmkey}&artist=${req.query.search.replaceAll(
      `"`,
      ""
    )}&format=json`
  );
  let testjson = await test.json();
  console.log(testjson.artist.bio.summary.replaceAll("\n", ""));
  console.log(
    testjson.artist.bio.summary
      .replaceAll("\n", "")
      .match(/(\w+\s\w+)(?=\s?\(.*?)/gm)
  );
  console.log(
    testjson.artist.bio.summary.replaceAll("\n", "").match(/\((.*?)\)/gm)
  );
  res.status(200).json({ name: "John Doe" });
}
