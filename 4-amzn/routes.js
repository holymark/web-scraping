import { createPlaywrightRouter , Dataset  } from "crawlee"
import { labels } from "./const.js"

export const router =  createPlaywrightRouter()
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

    const $ = await parseWithCheerio()
    const { url , userData} = request
    log.debug(`Extracting Data: ${url}`)

    await page.waitForSelector(".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal")

        await  enqueueLinks ({
            selector: ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal",
            label: "START__"
        })
    
    
    
})

router.addHandler(labels.DETAILS__,async ({}) => {

})

router.addDefaultHandler(async ({}) => {

})


