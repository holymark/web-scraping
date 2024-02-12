import { gotScraping } from "got-scraping";
import { writeFileSync } from "fs";
import * as cheerio from "cheerio";
import { parse } from "json2csv";

const storeUrl =
  "https://warehouse-theme-metal.myshopify.com/collections/sales";

(async function (url) {
  const response = await gotScraping(url);
  const html = response.body;
  //    console.log(html)

  const $ = cheerio.load(html);
  const products = $(".product-item"); // all of em
  let results = [];
  for (const product of products) {
    const title = $(product).find("a.product-item__title").text().trim();
    const price = $(product).find("span.price").contents()[2].nodeValue.trim();

    results.push({ title, price });
  }
  const csv = parse(results);

  writeFileSync(".csv", csv);
  // console.log(csv);
})(storeUrl);
