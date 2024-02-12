import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";
const BASE__URL = "https://warehouse-theme-metal.myshopify.com";
const storeUrl = `${BASE__URL}/collections/sales`;

(async function (url) {
  const response = await gotScraping(url);
  const html = response.body;
  const $ = cheerio.load(html);

  const productLinks = $("a.product-item__title");

  const productsURLs = [];

  for (const link of productLinks) {
    const url = $(link).attr("href");
    const absoluteUrl = new URL(url, BASE__URL);
    productsURLs.push(absoluteUrl);
  }
  for (const productURL of productsURLs) {
    try {
      const productResponse = await gotScraping(productURL);
      const productHtml = productResponse.body;
      const $productPage = cheerio.load(productHtml);

      const productPageTitle = $productPage("h1").text().trim();
      const productVendor = $productPage("a.product-meta__vendor")
        .text()
        .trim();
      const productPrice = $productPage("span.price").contents()[2].nodeValue;
      const productReviewCount = parseInt(
        $productPage("span.rating__caption").text(),
        10
      );

      const productDescription = $('div[class*="description"] div.rte')
        .text()
        .trim();

      const productItem = {
        productPageTitle,
        productVendor,
        productPrice,
        productReviewCount,
        productDescription,
      };
      console.log(productItem);
    } catch (e) {
      console.log(e.message, productURL);
    }
  }
})(storeUrl);
