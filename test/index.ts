import { v4 as uuidv4 } from 'uuid';

import { BrickSDK } from "../src/brickSDK";

const brickInstance = new BrickSDK({ apiKey: "ZQEWTH0-PZ348Y0-MKS3R2K-Y9PE5A6", provider: "http://139.99.210.62:8888/" })

const test = async () => {
    // console.log(await brickInstance.SubAccRequestWithDraw("fakeWithdrawUUID", "testSubAcc", 1000000, 'usdt_trc20', "TJYM3W22TYpvpnAHNgT7UsG6AekJcxTkkU"))
    console.log(await brickInstance.MainAccountInfoGet())
}

test()

