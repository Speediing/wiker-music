import axios from "axios";
const cheerio = require("cheerio");

export const formatWikipediaName = (artist: string) => {
  const words = artist.toLowerCase().split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join("_");
};

export const getBandNamesAndRolesFromWikipedia = async (artistName: string) => {
  let names: string[] = [];
  let roles: string[] = [];
  let { data, status } = await axios.get(
    `https://en.wikipedia.org/wiki/${formatWikipediaName(artistName)}`
  );
  if (status === 404) throw Error(`Not found: ${artistName}`);
  {
  }
  let $ = cheerio.load(data);
  if (
    $("#mw-content-text > div.mw-parser-output > p")
      .text()
      .includes("may refer to") ||
    $("#mw-content-text > div.mw-parser-output > div:nth-child(4)")
      .text()
      .includes("For other uses, see")
  ) {
    let bandData = await axios.get(
      `https://en.wikipedia.org/wiki/${artistName}_(band)`
    );
    data = bandData.data;
    $ = cheerio.load(data);
  }

  let artistIndex = 0;
  let found = false;
  $(
    "#mw-content-text > div.mw-parser-output > table.infobox.vcard.plainlist > tbody > tr"
  ).each((_idx: any, el: any) => {
    if (!found) artistIndex += 1;
    $(el)
      .children()
      .each((_idx: any, el: any) => {
        console.log($(el).text());
        if (!found && $(el).text() === "Members") {
          found = true;
        }
      });
  });

  $(
    `#mw-content-text > div.mw-parser-output > table.infobox.vcard.plainlist > tbody > tr:nth-child(${artistIndex}) > td > div > ul > li`
  ).each((_idx: any, el: any) => {
    names.push($(el).text());
  });
  if (names.length === 0 && found) {
    $(
      `#mw-content-text > div.mw-parser-output > table.infobox.vcard.plainlist > tbody > tr:nth-child(${artistIndex}) > td > ul > li`
    ).each((_idx: any, el: any) => {
      names.push($(el).text());
    });
  }
  if (names.length === 0 && found) {
    $(
      `#mw-content-text > div.mw-parser-output > table > tbody > tr:nth-child(8) > td`
    ).each((_idx: any, el: any) => {
      names.push($(el).text());
    });
  }

  // roles = fullTitle.replaceAll("\n", "").match(/\((.*?)\)/gm);
  roles = [];

  if (!found) names.push(artistName);
  return { names, roles };
};
