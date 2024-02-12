import { gotScraping } from "got-scraping";

import * as cheerio from "cheerio";

const storeUrl =
  "https://warehouse-theme-metal.myshopify.com/collections/sales";

(async function (url) {
  const response = await gotScraping(url);
  const html = response.body;
  //    console.log(html)

  const $ = cheerio.load(html);
  const products = $(".product-item"); // all of em
  for (const product of products) {
    let results = [];
    const title = $(product).find("a.product-item__title").text().trim();
    const price = $(product).find("span.price").contents()[2].nodeValue.trim();

    results.push({ title, price });

    console.log(results);
  }
})(storeUrl);
