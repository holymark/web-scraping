import { createPlaywrightRouter } from "crawlee"
import {labels} from "./const"

export const router =  createPlaywrightRouter()


router.addHandler(labels.START__,async () => {

})


