import { createPlaywrightRouter, Dataset } from "crawlee";
import { labels, BASE__URL } from "./const.js";

export const router = createPlaywrightRouter();

/**
 *         MRP:
 *         MRP_element = await page.query_selector(".a-price.a-text-price")
 *         MRP = MRP.split("₹")[1]
 *          
 * 
 *         BRAND:
 *         brand_name_elem = await page.query_selector('#bylineInfo_feature_div .a-link-normal')
 *         brand_name = re.sub(r'Visit|the|Store|Brand:', '', brand_name).strip()
 *          
 *         PRICE:
 *         sale_price_element = await page.query_selector(".a-price-whole")
 * 
 *         RATINGS:
 *         star_rating_elem = await page.wait_for_selector(".a-icon-alt")
 *         star_rating = star_rating.split(" ")[0]
 *           else:   star_ratings_elem = await page.query_selector("#averageCustomerReviews #acrNoReviewText")
 * 
 *         REVIEWS:
 *         num_reviews_elem = await page.query_selector("#acrCustomerReviewLink #acrCustomerReviewText")
 *         num_reviews = num_ratings.split(" ")[0]
 *         no_review_elem = await page.query_selector("#averageCustomerReviews #acrNoReviewText")
 * 
 *        BEST SELLER:
 *        best_sellers_rank = await (await page.query_selector("tr th:has-text('Best Sellers Rank') + td")).text_content()
 *        ranks = best_sellers_rank.split("#")[1:]
 * 
 *      TECHNICAL DETAILS:
 *      table_element = await page.query_selector("#productDetails_techSpec_section_1")
 *      technical_details = {}
 * 
 *      INFO TABLE:
 *      Product Dimensions	       =>         17.52 x 5.35 x 1.38 inches
 *      Item Weight	               =>         1.76 pounds
 *      ASIN	                   =>         B095LDN8G8
 *      Customer Reviews	       =>         4.2 4.2 out of 5 stars 
 *      1,573 ratings              =>         4.2 out of 5 stars
 *      Best Sellers Rank          =>         #948 in Computer Keyboard & Mouse Combos
 *      Date First  Available	   =>         June 30, 2021
 *      Manufacturer	           =>         MOFII
 *      Country of Origin	       =>         China
 * 
 * 
 *   next up :  rental cottage finder
 */

router.addHandler(labels.START__, async ({ request, log, page, parseWithCheerio, enqueueLinks }) => {

    const $ = await parseWithCheerio();
    const { url, userData } = request;
    log.info(`Extracting Data: ${url}`);

    const links_selector = ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal";
    const all_items = await page.$$(links_selector);
    // await page.waitForSelector(linksSelector)

    for (let i = 0; i < all_items.length; ++i) {
        const url = await all_items[i].getAttribute("href");
        // console.log(url)

        if (url.includes("/ref")) {
            let full_url = BASE__URL + url.split("/ref")[0];
            // console.log(full_url)
            await enqueueLinks({ urls: [full_url] });

        } else if (url.includes("/sspa/click?ie")) {

            // Extract the product ID and clean the URL
            const product_ID = url.split("%2Fref%")[0];
            const clean_url = product_ID.replace("%2Fdp%2F", /dp/);
            const urls = clean_url.split("url=%2F")[1];
            const full_urls = BASE__URL + urls;
            // console.log(full_urls)

            await enqueueLinks({ urls: [full_urls] });

        } else {
            let full_url = BASE__URL + url;
            console.log({ full_url });
            await enqueueLinks({ urls: [full_url] });
        }

        /**
         * const substrings = ['Basket', 'Accessories', 'accessories', 'Disposable', 'Paper', 'Reusable', 'Steamer', 'Silicone', 'Liners', 'Vegetable-Preparation', 'Pan', 'parchment', 'Parchment', 'Cutter', 'Tray', 'Cheat-Sheet', 'Reference-Various', 'Cover', 'Crisper', 'Replacement'];
         * if (!substrings.some(substring => full_url.includes(substring))) {
         * product_urls.add(full_url);
         * }
         */
    }

    const next_button = await page.$("a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator");

    if (next_button) {
        const is_clickable = await next_button.isEnabled();

        if (is_clickable) {
            await next_button.click();
            await page.waitForSelector(".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal");
        } else {
            log.info("Next button is not clickable");
        }
    }
    // if( next_button){
    // await enqueueLinks({
    // selector: "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator",
    // label: "START__"
    // })
    // }
    // await  enqueueLinks ({
    // selector: linksSelector,
    // label: "START__"
    // })
});

router.addHandler(labels.DETAILS__, async ({ }) => {

});

router.addDefaultHandler(async ({ }) => {

});
