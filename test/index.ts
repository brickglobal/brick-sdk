import { v4 as uuidv4 } from 'uuid';

import { BrickSDK } from "../src/brickSDK";

const brickInstance = new BrickSDK({ apiKey: "YCN35WM-M6SMSB1-NVBBQJN-SYXFG63", provider: "http://139.99.210.62:8888/" })
// (async () => {
//     const username = 'hoansub02'

//     const creditRes = await brickInstance.creditSubAcc(uuidv4(), username, 100000000, "eur", "bonus")
//     console.log({ creditRes })
//     const debitRes = await brickInstance.debitSubAcc(uuidv4(), username, 50000000, "eur", "bonus")
//     console.log({ debitRes })
//     const SubAccRequestWithDrawRes = await brickInstance.SubAccRequestWithDraw(uuidv4(), username, 50000000, "eur")
//     console.log({ SubAccRequestWithDrawRes })
// })()

