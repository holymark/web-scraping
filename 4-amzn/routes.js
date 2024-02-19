import { createPlaywrightRouter, Dataset } from "crawlee";
import { labels, BASE__URL, tracking_tag } from "./const.js";

export const router = createPlaywrightRouter();




router.addHandler(
  labels.START__,
  async ({ request, log, page, parseWithCheerio, enqueueLinks, crawler}) => {
    const $ = await parseWithCheerio();
    const { url, userData } = request;
    log.info(`Extracting Data: ${url}`);


  //  await Loop_Url(page,crawler, log)
    

            const next_button = await page.$(
              "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"
            );

            if (next_button) {
              // const is_clickable = await next_button.isEnabled();

              console.log(next_button.getAttribute("href"))
              // if (is_clickable) {
              //   await next_button.click();
                
              //   const links_selector = ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal";
              //   const all_items = await page.waitForSelector(links_selector);
              //   // const all_items = await page.$$(links_selector);

              //   console.log(page.$$(links_selector))
              //      for (let i = 0; i < all_items.length; ++i) {
              //           const url = await all_items[i].getAttribute("href");
              //           let full_url = "";
      
              //           console.log(url)
              //           // await Loop_Url(page,crawler, log)
                    
              //         }

               
              //         console.log("Next button was clicked");
              // }
             
              // else {
              //   console.log("Next button is not clickable");
              // }

            }else {
              console.log("No next button to click on.")
            }
    

  
  }
)

router.addHandler(
  labels.PRODUCT__,
  async ({ request, log, page, parseWithCheerio, enqueueLinks }) => {
    const { url } = request 
    const { data } = request.userData;
    log.info(`Fetching Product.. : ${url}`)
    console.log(data)
  }
);

router.addDefaultHandler(async ({}) => {});


async function Do_Url (url, log, crawler, full_url){
  // there must be a url and it should not be an ad.
  if (url && !url.includes("https://aax-us-iad.amazon.com/x/c")) {
        if (url.includes("/ref")) {
          full_url = BASE__URL + url.split("/ref")[0] + tracking_tag;
          log.info(`Fetching URL: ${full_url}`);

        } else if (url.includes("/sspa/click?ie")) {
          const product_ID = url.split("%2Fref%")[0];
          const clean_url = product_ID.replace("%2Fdp%2F", /dp/);
          const urls = clean_url.split("url=%2F")[1];
          full_url = BASE__URL + urls + tracking_tag;
        } else {
          full_url = url + tracking_tag;
        }

        await crawler.addRequests([
          {
          url: full_url,
          label: labels.PRODUCT__,

          userData: {
            data: {
                title: "Title here",
                asin: "Assin here",
                itemUrl: "Item Url here",
                keyword: "Keyword here",
            },
        },
        }
      ])
      }
}


async function Loop_Url(page, crawler, log){
  const links_selector =
  ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal";
const all_items = await page.$$(links_selector);

for (let i = 0; i < all_items.length; ++i) {
  const url = await all_items[i].getAttribute("href");
  let full_url = "";

  await Do_Url(url, log, crawler, full_url)
}
}