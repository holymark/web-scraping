
/**simple web crawler and scraper using got-scraper and cheerio */
import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";

//-------------
const BASE__URL = "https://warehouse-theme-metal.myshopify.com";
const storeUrl = `${BASE__URL}/collections/sales`;

(async function (url) {
  const response = await gotScraping(url);
  const html = response.body;
  const $ = cheerio.load(html);

  const productLinks = $("a.product-item__title");

  // database assumption.
  const productsURLs = [];

  /**
   * loop through all <a className="a.product-item__title" href="https://....">link</a>
   * Get the link attached and match with the BASE__URL
   * Push it to our database : productURLs[]
   */
  for (const link of productLinks) {
    const url  $(link).attr("href");
    const absoluteUrl = new URL(url, BASE__URL);
    productsURLs.push(absoluteUrl);
  }

/**
 * Iterate through all links from the database
 * Crawl each link
 * Scrape out the [ptoductTitle, vendor, price, reviewCount, description]
 * Save To database.
 */
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
