import { createPlaywrightRouter, Dataset } from "crawlee";
import { labels, BASE__URL } from "./const.js";
import { getProductURLs } from "./utils/functions.js"

export const router = createPlaywrightRouter();


router.addHandler(labels.START__, async ({ request, log, page, parseWithCheerio, enqueueLinks }) => {

    const $ = await parseWithCheerio();
    const { url, userData } = request;
    log.info(`Extracting Data: ${url}`);


  const prod_urls =  await getProductURLs(page, log, enqueueLinks, BASE__URL)
  console.log(prod_urls)

// for 
});

router.addHandler(labels.DETAILS__, async ({ }) => {

});

router.addDefaultHandler(async ({ }) => {

});



