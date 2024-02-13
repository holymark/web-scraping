import { PlaywrightCrawler,Dataset  } from "crawlee";

//-------------
const BASE__URL = "https://warehouse-theme-metal.myshopify.com";
const storeUrl = `${BASE__URL}/collections/sales`;


const crawler=new PlaywrightCrawler({

    // headless: false;  //just to kmow whats happening in the browser
    requestHandler:async ({parseWithCheerio, request, log, enqueueLinks})=>{
        const url = request.url;
        const $ = await parseWithCheerio()
        log.info(`Fetching URL: ${url}`);

        if(request.label === "start-url"){
            await enqueueLinks({
                selector: "a.product-item__title",
            })

            return 
        }


       
  
        const productPageTitle = $("h1").text().trim();
        const productVendor = $("a.product-meta__vendor")
          .text()
          .trim();
        const productPrice = $("span.price").contents()[2].nodeValue;
        const productReviewCount = parseInt(
          $("span.rating__caption").text(),
          10
        );
  
        const productDescription = $('div[class*="description"] div.rte')
          .text()
          .trim();
  
       
           // recommended products
        const recommendedProducts= $(".product-recommendations a.product-item__title")
        .map((index,element)=>{
            return $(element).text().trim()
        })

        .toArray()
          await Dataset.pushData({
          productPageTitle,
          productVendor,
          productPrice,
          productReviewCount,
          productDescription,
          recommendedProducts
        });



       

    }
})

await crawler.addRequests([{url:storeUrl, label:"start-url"}])
await crawler.run()

await Dataset.exportToCSV("product-database")