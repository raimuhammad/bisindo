import axios from "axios";
import { parse } from "node-html-parser";
import path from "path";
import fs from "fs";

const initFetch = () =>
  axios
    .get("https://id.wikibooks.org/wiki/Bahasa_Isyarat/Alfabet/A")
    .then((data) => {
      return parse(data.data);
    });

const contents: Array<{
  id: string;
  image: string;
  letter: string;
}> = [];

const parsePage = (result: any, withLinks = false): any => {
  const letter = result.querySelectorAll(
    "#mw-content-text div.mw-parser-output div big"
  );

  const image = result.querySelectorAll(
    "#mw-content-text div.mw-parser-output div.center div.floatnone a img"
  );
  const scrapResult = {
    letter: letter[0].innerText,
    image: `https://${image[0].getAttribute("src")}`,
  };
  if (withLinks) {
    const links = result
      .querySelectorAll("#mw-content-text div.mw-parser-output .noprint a")
      .map((item) => {
        if (item.getAttribute("href")) {
          return `https://id.wikibooks.org${item.getAttribute("href")}`;
        }
        return null;
      })
      .filter(Boolean);
    return {
      ...scrapResult,
      links,
    };
  }
  return scrapResult;
};

initFetch().then((result) => {
  const { links, ...initScrap } = parsePage(result, true);
  contents.push({
    id: initScrap.letter,
    ...initScrap,
  });
  const run = () => {
    console.log(initScrap.links);
    const promises = links.map((item) => {
      return axios
        .get(item)
        .then(({ data }) => {
          const result = parsePage(parse(data), false);
          return {
            id: result.letter,
            ...result,
          };
        })
        .catch((e) => {
          console.log(e);
          return "";
        });
    });
    return Promise.all(promises);
  };
  run().then((result) => {
    const final = [...contents, ...result];
    const file = fs.createWriteStream(path.resolve("../views/image-data.json"), {
      flags: "w+",
    });
    file.write(JSON.stringify(final));
  });
});
