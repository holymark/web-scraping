import { createPlaywrightRouter, Dataset } from "crawlee";
import { labels, BASE__URL, tracking_tag } from "./const.js";

export const router = createPlaywrightRouter();

router.addHandler(
  labels.START__,
  async ({ request, log, page, parseWithCheerio, enqueueLinks }) => {
    const $ = await parseWithCheerio();
    const { url, userData } = request;
    log.info(`Extracting Data: ${url}`);

    // const product_URLs = new Set();

    const links_selector =
      ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal";
    const all_items = await page.$$(links_selector);
    // await page.waitForSelector(linksSelector)

    for (let i = 0; i < all_items.length; ++i) {
      const url = await all_items[i].getAttribute("href");
      let full_url = "";

      // there must be a url and it should not be an ad.
      if (url && !url.includes("https://aax-us-iad.amazon.com/x/c")) {
        if (url.includes("/ref")) {
          full_url = BASE__URL + url.split("/ref")[0] + tracking_tag;
          log.info(`Fetching URL: ${full_url}`);
          // await enqueueLinks({ urls: [full_url] });
        } else if (url.includes("/sspa/click?ie")) {
          // Extract the product ID and clean the URL
          const product_ID = url.split("%2Fref%")[0];
          const clean_url = product_ID.replace("%2Fdp%2F", /dp/);
          const urls = clean_url.split("url=%2F")[1];
          full_url = BASE__URL + urls + tracking_tag;
          log.info(`Fetching URL: ${full_url}`);
        } else {
          full_url = url + tracking_tag;
        }
      }
      await enqueueLinks({
        url: full_url,
        label: "",
      });
    }

    const next_button = await page.$(
      "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"
    );

    if (next_button) {
      const is_clickable = await next_button.isEnabled();

      if (is_clickable) {
        await next_button.click();
        await page.waitForSelector(
          ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal"
        );

        product_URLs.add(await getProductURLs(page, log, enqueueLinks));
      } else {
        log.info("Next button is not clickable");
      }
    }
    const number_of_products = product_URLs.size;

    console.log(`Scraped ${number_of_products} products.`);
  }
);

router.addHandler(
  labels.PRODUCT__,
  async ({ request, log, page, parseWithCheerio, enqueueLinks }) => {
    const { data } = request.userData;
  }
);

router.addDefaultHandler(async ({}) => {});
