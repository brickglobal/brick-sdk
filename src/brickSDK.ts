
import axios from "axios";
import { fixDateType, getMethodNameAndQuery } from "./utils";
import { AllAccountBalanceResponse, RecheckResponse } from "./type/MethodResponses";
import { Transaction } from "./type/Transaction"
import { SubAccount } from "./type/SubAccount";
import { MainAccount } from "./type/MainAccount";
import { BMMethodType } from "./methods";
import { BMErrorCode } from "./errorCode";


const AssetType = ['usdt_trc20', 'trx', 'eur']


export enum ReadPreference {
    primary = "primary",
    secondary = "secondary"
}

class BrickSDK {

    private _apiKey: string
    private _provider: string

    constructor(params: { apiKey: string, provider: string }) {
        if (!params.apiKey) throw new Error(BMErrorCode.API_KEY_MISSING)
        if (!params.provider) throw new Error(BMErrorCode.PROVIDER_MISSING)

        this._apiKey = params.apiKey
        this._provider = params.provider
    }

    private async GetData(type: string, params: any) {
        try {
            let { methodName, query } = getMethodNameAndQuery(type, params)
            const res = await axios({
                method: 'POST',
                url: this._provider,
                headers: { "content-type": "application/json", "apiKey": this._apiKey },
                data: {
                    query
                }
            })
            const data = res.data
            if (data.errors) {
                throw data.errors[0]
            }
            const result = data.data[methodName]
            fixDateType(result)
            return result
        } catch (e) {
            throw new Error(e.message)
        }
    }
    /**
     * Using for create the Sub Account
     * @param username the name of Sub Account 
     * @returns SubAccount Type 
     */
    public async createSubAcc(username: string): Promise<SubAccount> {
        try {
            // if (!username) throw new Error(BMErrorCode.PARAM_MISSING)
            // if (!usernameRegex.test(username)) throw new Error(BMErrorCode.PARAM_INVALID)
            let res = await this.GetData(BMMethodType.creatSub, { username }) as SubAccount
            return res
        } catch (e) {
            throw e
        }
    }

    /**
     * Using for withdraw asset in the Sub Account
     * @param username the name of Sub Account 
     * @param amount amount of withdraw
     * @param asset type of asset that Brick support
     * @param action 
     * @returns Transaction Type 
     */
    public async debitSubAcc(uuid: string, username: string, amount: number, asset: 'eur' | 'trx' | 'usdt_trc20', action: 'bonus' | 'debit' | 'credit' | 'convert' | 'transfer' | 'cancel' | string): Promise<Transaction> {
        try {
            // if (!username) throw new Error(BMErrorCode.PARAM_MISSING)
            // if (!asset) throw new Error(BMErrorCode.PARAM_MISSING)
            // if (!usernameRegex.test(username)) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!(typeof amount === `number`) || amount < 0) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!AssetType.includes(asset)) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!Object.values(ActionType).includes(action)) throw new Error(ErrorCode.PARAM_INVALID)
            let amountRoundDown = Math.floor(amount)
            let res = await this.GetData(BMMethodType.debitSub, { uuid, username, amount: amountRoundDown, asset, action }) as Transaction
            return res
        } catch (e) {
            throw e
        }
    }

    /**
     * Using for deposit asset in the Sub Account
     * @param username the name of Sub Account 
     * @param amount amount of withdraw (multiple with 1.10^6)
     * @param asset type of asset that Brick support
     * @param action 
     * @returns Transaction Type 
     */
    public async creditSubAcc(uuid: string, username: string, amount: number, asset: 'eur' | 'trx' | 'usdt_trc20', action: 'bonus' | 'debit' | 'credit' | 'transfer' | 'convert' | 'cancel' | string): Promise<Transaction> {
        try {
            // if (!username) throw new Error(BMErrorCode.PARAM_MISSING)
            // if (!asset) throw new Error(BMErrorCode.PARAM_MISSING)
            // if (!usernameRegex.test(username)) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!(typeof amount === `number`) || amount < 0) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!AssetType.includes(asset)) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!Object.values(ActionType).includes(action)) throw new Error(ErrorCode.PARAM_INVALID)
            let amountRoundDown = Math.floor(amount)
            let res = await this.GetData(BMMethodType.creditSub, { uuid, username, amount: amountRoundDown, asset, action }) as Transaction
            return res
        } catch (e) {
            throw e
        }
    }

    /**
     * Using for deposit asset in the Sub Account
     * @param username the name of Sub Account 
     * @param amount amount of withdraw (multiple with 1.10^6)
     * @param asset type of asset that Brick support
     * @param action 
     * @returns Transaction Type 
     */
    public async SubAccRequestWithDraw(uuid: string, username: string, amount: number, asset: 'eur' | 'trx' | 'usdt_trc20', receiver: string): Promise<Transaction> {
        try {
            // if (!username) throw new Error(BMErrorCode.PARAM_MISSING)
            // if (!asset) throw new Error(BMErrorCode.PARAM_MISSING)
            // if (!usernameRegex.test(username)) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!(typeof amount === `number`) || amount < 0) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!AssetType.includes(asset)) throw new Error(BMErrorCode.PARAM_INVALID)
            let amountRoundDown = Math.floor(amount)
            let res = await this.GetData(BMMethodType.requestWithdrawSub, { uuid, username, amount: amountRoundDown, asset, receiver }) as Transaction
            return res
        } catch (e) {
            throw e
        }
    }

    public async TransactionsGet(pageNumber: number, pageSize: Number): Promise<Transaction[]> {
        try {
            // if (pageNumber < 0 || pageSize < 1 || pageSize > 1000) throw new Error(BMErrorCode.PARAM_INVALID)
            let res = await this.GetData(BMMethodType.transactionsGet, { pageNumber, pageSize }) as Transaction[]
            return res
        } catch (e) {
            throw e
        }
    }

    public async MainAccountInfoGet(): Promise<MainAccount> {
        try {
            let res = await this.GetData(BMMethodType.getMainAccInfo, {}) as MainAccount
            return res
        } catch (e) {
            throw e
        }
    }

    public async subAccountInfoGet(username: String, options: ReadPreference = ReadPreference.secondary): Promise<SubAccount> {
        try {
            let res = await this.GetData(BMMethodType.subAccountInfo, { username, options }) as SubAccount
            return res
        } catch (e) {
            throw e
        }
    }

    public async recheckTx(uuid: String): Promise<RecheckResponse> {
        try {
            let res = await this.GetData(BMMethodType.recheckTx, { uuid }) as RecheckResponse
            return res
        } catch (e) {
            throw e
        }
    }

    public async getAllAccountBalance(): Promise<AllAccountBalanceResponse> {
        try {
            let res = await this.GetData(BMMethodType.getAllAccountBalance, {}) as AllAccountBalanceResponse

            return res
        } catch (e) {
            throw e
        }
    }
}

export { BrickSDK }