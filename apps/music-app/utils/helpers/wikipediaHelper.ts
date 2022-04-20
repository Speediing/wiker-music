import axios from "axios";
const cheerio = require("cheerio");

export const formatWikipediaName = (artist: string) => {
  const words = artist.toLowerCase().split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join("_");
};

//TODO: split this into a pageobject and get roles from page
export const getBandNamesAndRolesFromWikipedia = async (artistName: string) => {
  let names: string[] = [];
  let roles: string[] = [];
  let formattedName = formatWikipediaName(artistName);
  let { data, status } = await axios.get(
    `https://en.wikipedia.org/wiki/${formattedName}`
  );
  if (status === 404) throw Error(`Not found: ${artistName}`);

  let $ = cheerio.load(data);
  //If a name has multiple options (ie: frog) then try with _band
  let text1 = $("#mw-content-text > div.mw-parser-output > p").text();
  let text2 = $(
    "#mw-content-text > div.mw-parser-output > div:nth-child(4)"
  ).text();
  let text3 = $(
    "#mw-content-text > div.mw-parser-output > div:nth-child(3)"
  ).text();
  let isBand = false;
  [text1, text2, text3].forEach((text) => {
    if (
      text.includes("may refer to") ||
      (!text.includes("musical group") &&
        !text.includes("band") &&
        text.includes("For other uses, see"))
    ) {
      isBand = true;
    }
  });
  if (isBand) {
    let bandData = await axios.get(
      `https://en.wikipedia.org/wiki/${formattedName}_(band)`
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
        if (!found && $(el).text().toLowerCase().includes("members")) {
          found = true;
        }
      });
  });

  if (found) {
    let members = $(
      "#mw-content-text > div.mw-parser-output > table.infobox.vcard.plainlist > tbody > tr:nth-child(11) > td"
    );
    if (members.children().length === 1) {
      members.children().each((_idx: any, el: any) => {
        let name = $(el).text();
        if (name.length > 0)
          names = [...name.split("\n").filter((x: any) => x !== "")];
      });
    } else {
      try {
        names = [
          ...members
            .html()
            .split("<br>")
            .filter((x: any) => !x.includes("<a")),
        ];
      } catch (e) {
        console.log(e);
      }
      members.children().each((_idx: any, el: any) => {
        let name = $(el).text();
        if (name.length > 0) names.push(name);
      });
    }
  }

  if (found) {
    $(
      `#mw-content-text > div.mw-parser-output > table.infobox.vcard.plainlist > tbody > tr:nth-child(${artistIndex}) > td > ul > li`
    ).each((_idx: any, el: any) => {
      names.push($(el).text());
    });
    $(
      `#mw-content-text > div.mw-parser-output > table.infobox.vcard.plainlist > tbody > tr:nth-child(${artistIndex}) > td > div > ul > li`
    ).each((_idx: any, el: any) => {
      names.push($(el).text());
    });
  }

  // roles = fullTitle.replaceAll("\n", "").match(/\((.*?)\)/gm);
  roles = [];

  if (!found) names.push(artistName);
  return { names, roles };
};
