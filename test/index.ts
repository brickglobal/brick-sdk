import { v4 as uuidv4 } from 'uuid';

import { BrickSDK, ReadPreference } from "../src/brickSDK";

const brickInstance = new BrickSDK({ apiKey: "BKY5MXQ-3H3M8YG-JHA063H-TRSJNRP", provider: "http://192.168.1.86:8888/" })

const test = async () => {
    const username="lalamama123"
    // console.log(await brickInstance.SubAccRequestWithDraw("fakeWithdrawUUID", "testSubAcc", 1000000, 'usdt_trc20', "TJYM3W22TYpvpnAHNgT7UsG6AekJcxTkkU"))
    // console.log(await (await brickInstance.MainAccountInfoGet()).fee)
    // console.log(await brickInstance.debitSubAcc(uuidv4(),username,10000000,"eur","debit"))
    // console.log(await brickInstance.debitSubAcc(uuidv4(),username,10000000,"eur","debit"))
    // console.log(await brickInstance.creditSubAcc(uuidv4(),username,10000000,"eur","credit"))
    console.log(await brickInstance.subAccountInfoGet(username,ReadPreference.secondary))
}

test()

