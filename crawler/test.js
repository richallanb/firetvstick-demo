import { fetchDataFromUrl } from "./fetchService";
import cheerio from "cheerio-without-node-native";

export default async () => {
  const data = await fetchDataFromUrl(
    "https://www.wonderfulsubs.com/api/v1/media/series?series=shimonetaaboringworldwheretheconceptofdirtyjokesdoesntexist"
  );
  console.log(data.json);
  
};
