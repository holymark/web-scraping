import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";
const BASE__URL = "https://warehouse-theme-metal.myshopify.com";
const storeUrl = `${BASE__URL}/collections/sales`;

(async function (url) {
  const response = await gotScraping(url);
  const html = response.body;
  const $ = cheerio.load(html);
  const regExp =
    /https?:\/\/warehouse-theme-metal\.myshopify\.com\/products\/[\w-]+/;

  const links = $("a");

  for (const link of links) {
    const url = $(link).attr("href");
 const absoluteUrl=new URL(url,BASE__URL)
    if (regExp.test(url)) console.log(url);
  }
})(storeUrl);
