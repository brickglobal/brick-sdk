import { v4 as uuidv4 } from 'uuid';

import { BrickSDK } from "../src/brickSDK";

const brickInstance = new BrickSDK({ apiKey: "EK5R6MF-8VJMSZT-KC519WG-5JK6ZFY", provider: "http://139.99.210.62:8888/" })

const test = async () => {
    console.log(await brickInstance.SubAccRequestWithDraw("fakeWithdrawUUID", "testSubAcc", 1000000, 'usdt_trc20', "TJYM3W22TYpvpnAHNgT7UsG6AekJcxTkkU"))
}

test()

