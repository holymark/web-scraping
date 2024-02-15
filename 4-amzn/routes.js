import { createPlaywrightRouter , Dataset  } from "crawlee"
import { labels } from "./const.js"

export const router =  createPlaywrightRouter()


router.addHandler(labels.START__,async ({ request, log, parseWithCheerio, enqueueLinks }) => {

    const $ = await parseWithCheerio()
    const { url , userData} = request
    log.debug(`Extracting Data: ${url}`)
    //  console.log({userData})


})

router.addHandler(labels.DETAILS__,async ({}) => {

})

router.addDefaultHandler(async ({}) => {

})


