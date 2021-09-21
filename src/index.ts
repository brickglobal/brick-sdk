import { BrickSDK } from "./brickSDK";
import { MainAccount, RecheckResponse, SubAccount, Transaction, AllAccountBalanceResponse, MasterSettings, MainAccountFee, LogCustomerDetail } from "./type";
(async () => {
  try {
    const brickSDK = new BrickSDK({
      apiKey: "toan_enterprise",
      provider: "http://139.99.121.150:6699/"
    })
    const data = await brickSDK.customerWithdraw("TD22S44hNb2bE96uRe935vXUk3Xi5omD29",0,10000000,"TD22S44hNb2bE96uRe935vXUk3Xi5omD29")
    console.log(data)
  } catch (e) {
    throw e
  }
})()
export {
    BrickSDK,
    SubAccount, 
    MainAccount, 
    Transaction, 
    MainAccountFee, 
    MasterSettings, 
    RecheckResponse, 
    AllAccountBalanceResponse,
    LogCustomerDetail,
}