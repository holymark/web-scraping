import { PlaywrightCrawler } from "crawlee"
import { router } from "./routes.js"
import { BASE__URL, Keywords } from "./const.js"

const keyword = Keywords[0]

const crawler = new PlaywrightCrawler(({

    requestHandler : router
}))


await crawler.addRequests([{
    url: `${BASE__URL}/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`,
    label: "START__",
    userData: {
        keyword,
    },
}])
await crawler.run()
