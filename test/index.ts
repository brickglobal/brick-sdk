import { v4 as uuidv4 } from 'uuid';

import { BrickSDK, ReadPreference } from "../src/brickSDK";
import { fixDateType } from '../src/utils';

(async () => {
    try {
      const brickSDK = new BrickSDK({
        apiKey: "QARE0EM-KZFE7ZK-R6WSV7Z-WJH4HP2",
        provider: "http://localhost:6699/"
      })
      console.time("xxxxx")
      // const data = await brickSDK.v2.customerWithdraw("TKVSaJQDWeKFSEXmA44pjxduGTxyXa6B52",0,10000000, `tuan_${new Date().toString()}`,1632283453575)
      // const data = await brickSDK.v2.customerExchange("TKVSaJQDWeKFSEXmA44pjxduGTxyXa6B52",0,1, 10000000,10000000, `tuan_${new Date().toString()}`,1632283453575,"exchange")
      // const data = await brickSDK.v2.customerChangeBalance("TKVSaJQDWeKFSEXmA44pjxduGTxyXa6B52",0,10000000, `tuan_${new Date().toString()}`,1632283453575, "action_example")
      // const data = await brickSDK.v2.customerTransfer("TKVSaJQDWeKFSEXmA44pjxduGTxyXa6B52", "TVv3Xrj9rmo5BqBsXSwU3YsQKoVRhLuGtN",0,10000000, `tuan_${new Date().toString()}`,1632283453575,null,"action_example")
      const data = await brickSDK.v2.customerBalanceGet("TKVSaJQDWeKFSEXmA44pjxduGTxyXa6B52")
      // const data = await brickSDK.v2.customerBalanceGet("TKVSaJQDWeKFSEXmA44pjxduGTxyXa6B52")
      // const data = await brickSDK.v2.enterpriseAddressGet(0)
      // const data = await brickSDK.v2.logCustomerHistoryGet("TKVSaJQDWeKFSEXmA44pjxduGTxyXa6B52", null, null, 2, 2)
      console.timeEnd("xxxxx")
      console.log(data)
      
    } catch (e) {
      throw e
    }
  })()


