import { v4 as uuidv4 } from 'uuid';

import { BrickSDK, ReadPreference } from "../src/brickSDK";
import { fixDateType } from '../src/utils';

const brickInstance = new BrickSDK({ apiKey: "BKY5MXQ-3H3M8YG-JHA063H-TRSJNRP", provider: "http://192.168.1.86:8888/" })

const test = async () => {
    const username = "lalamama123"
    // console.log(await brickInstance.SubAccRequestWithDraw("fakeWithdrawUUID", "testSubAcc", 1000000, 'usdt_trc20', "TJYM3W22TYpvpnAHNgT7UsG6AekJcxTkkU"))
    // console.log(await (await brickInstance.MainAccountInfoGet()).fee)
    // console.log(await brickInstance.debitSubAcc(uuidv4(),username,10000000,"eur","debit"))
    // console.log(await brickInstance.debitSubAcc(uuidv4(),username,10000000,"eur","debit"))
    // console.log(await brickInstance.creditSubAcc(uuidv4(),username,10000000,"eur","credit"))
    console.log(await brickInstance.getAllAccountBalance())
    // let count=0
    // for (let i = 0; i < 20000; i++) {
    //     brickInstance.subAccountInfoGet(username, ReadPreference.secondary).catch(e=>{console.log(count++)})
    // }

    // console.log(await brickInstance.subAccountInfoGet(username,ReadPreference.secondary))
    // console.log(await brickInstance.recheckTx("subwithdraw101"))
    
   
}

test()

