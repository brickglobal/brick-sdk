import axios from "axios";
import { fixDateType, getMethodNameAndQuery } from "./utils";
import { AllAccountBalanceResponse, CustomerBalanceGet, LogHistoryResponse, RecheckResponse } from "./type/MethodResponses";
import { Transaction } from "./type/Transaction"
import { SubAccount } from "./type/SubAccount";
import { MainAccount } from "./type/MainAccount";
import { BMMethodType } from "./methods";
import { BMErrorCode } from "./errorCode";
import { LogCustomerDetail } from "./type";
import { ChangeBalanceOptions } from "./type/LogCustomerDetail";


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
        } catch (e: any) {
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
    /**
     * 
     * @param customer_id Id of customer
     * @param asset_id Id of asset
     * @param amount Amount of withdraw (multiple with 1.10^6)
     * @param req_id 
     * @param req_time 
     * @param address withdraw to the address
     * @param action 
     * @returns LogCustomerDetail
     */
    private async customerWithdraw(customer_id: String, asset_id: Number, amount: Number, req_id: String, req_time: Number, address?: String): Promise<LogCustomerDetail> {
        try {
            let res = await this.GetData(BMMethodType.customerWithdraw, { customer_id, asset_id, amount, req_id, req_time, address }) as LogCustomerDetail
            return res
        } catch (e) {
            throw e
        }
    }
    /**
     * 
     * @param sender_id From address of transfer
     * @param receiver_id To address of transfer
     * @param asset_id Id of asset
     * @param amount Amount of transfer (multiple with 1.10^6)
     * @param req_id 
     * @param req_time 
     * @param receiver_enterprise_id Id of enterprise receiver (optional)
     * @param action 
     * @returns LogCustomerDetail
     */
    private async customerTransfer(sender_id: String, receiver_id: String, asset_id: Number, amount: Number, req_id: String, req_time: Number, receiver_enterprise_id?: String | null, action?: String | null): Promise<LogCustomerDetail> {
        try {
            let res = await this.GetData(BMMethodType.customerTransfer, { sender_id, receiver_id, asset_id, receiver_enterprise_id, amount, req_id, req_time, action }) as LogCustomerDetail
            return res
        } catch (e) {
            throw e
        }
    }
    /**
     * 
     * @param customer_id Id of customer
     * @param from_asset_id From id of asset
     * @param to_asset_id To id of asset
     * @param from_amount From amount of exchange (multiple with 1.10^6)
     * @param to_amount To amount of exchange (multiple with 1.10^6)
     * @param req_id 
     * @param req_time 
     * @param action 
     * @returns LogCustomerDetail
     */
    private async customerExchange(customer_id: String, from_asset_id: Number, to_asset_id: Number, from_amount: Number, to_amount: Number, req_id: String, req_time: Number, action?: String): Promise<LogCustomerDetail> {
        try {
            let res = await this.GetData(BMMethodType.customerExchange, { customer_id, from_asset_id, to_asset_id, from_amount, to_amount, req_id, req_time, action }) as LogCustomerDetail
            return res
        } catch (e) {
            throw e
        }
    }
    /**
     * 
     * @param customer_id Id of customer
     * @param asset_id Id of asset
     * @param amount Amount of debit/credit (multiple with 1.10^6)
     * @param req_id 
     * @param req_time 
     * @param action 
     * @returns LogCustomerDetail
     */
    private async customerChangeBalance(customer_id: String, asset_id: Number, amount: Number, req_id: String, req_time: Number, action: String, options?: ChangeBalanceOptions): Promise<LogCustomerDetail> {
        try {
            let res = await this.GetData(BMMethodType.customerChangeBalance, { customer_id, asset_id, amount, req_id, req_time, action, options }) as LogCustomerDetail
            return res
        } catch (e) {
            throw e
        }
    }

    private async customerBalanceGet(customer_id: String): Promise<CustomerBalanceGet[]> {
        try {
            let res = await this.GetData(BMMethodType.customerBalanceGet, { customer_id }) as CustomerBalanceGet[]
            return res
        } catch (e) {
            throw e
        }
    }
    private async enterpriseAddressGet(asset_id: Number): Promise<String> {
        try {
            let res = await this.GetData(BMMethodType.enterpriseAddressGet, { asset_id }) as String
            return res
        } catch (e) {
            throw e
        }
    }
    private async logCustomerHistoryGet(customer_id: String, action?: "all" | null, sort?: "newest" | "oldest" | null, pageNumber?: Number | null, pageSize?: Number | null): Promise<LogHistoryResponse> {
        try {
            let res = await this.GetData(BMMethodType.logCustomerHistoryGet, { customer_id, action, sort, pageNumber, pageSize }) as LogHistoryResponse
            return res
        } catch (e) {
            throw e
        }
    }
    public v2 = {
        customerWithdraw: (customer_id: String, asset_id: Number, amount: Number, req_id: String, req_time: Number, address?: String) => this.customerWithdraw(customer_id, asset_id, amount, req_id, req_time, address),
        customerExchange: (customer_id: String, from_asset_id: Number, to_asset_id: Number, from_amount: Number, to_amount: Number, req_id: String, req_time: Number, action?: String) => this.customerExchange(customer_id, from_asset_id, to_asset_id, from_amount, to_amount, req_id, req_time, action),
        customerChangeBalance: (customer_id: String, asset_id: Number, amount: Number, req_id: String, req_time: Number, action: String, options?: ChangeBalanceOptions) => this.customerChangeBalance(customer_id, asset_id, amount, req_id, req_time, action, options),
        customerTransfer: (sender_id: String, receiver_id: String, asset_id: Number, amount: Number, req_id: String, req_time: Number, receiver_enterprise_id?: String | null, action?: String | null) => this.customerTransfer(sender_id, receiver_id, asset_id, amount, req_id, req_time, receiver_enterprise_id, action),
        customerBalanceGet: (customer_id: String) => this.customerBalanceGet(customer_id),
        enterpriseAddressGet: (asset_id: Number) => this.enterpriseAddressGet(asset_id),
        logCustomerHistoryGet: (customer_id: String, action?: "all" | null, sort?: "newest" | "oldest" | null, pageNumber?: Number | null, pageSize?: Number | null) => this.logCustomerHistoryGet(customer_id, action, sort, pageNumber, pageSize),
    }
}

export { BrickSDK }