
import { usernameRegex } from "./utils";

import axios from "axios";
import { creatSub } from "./methods/method.creatSub";
import { debitSub } from "./methods/method.debitSub";
import { creditSub } from "./methods/method.creditSub";
import { requestWithdrawSub } from "./methods/method.requestWithdrawSub";
import { transactionsGet } from "./methods/method.transactionsGet";

export const BMErrorCode = {
    PARAM_INVALID: `PARAM_INVALID`,
    PARAM_MISSING: `PARAM_MISSING`,
    API_KEY_MISSING: `API_KEY_MISSING`,
    PROVIDER_MISSING: `PROVIDER_MISSING`
}

const BMMethodType = {
    creatSub: `createSub`,
    debitSub: `debitSub`,
    creditSub: `creditSub`,
    requestWithdrawSub: `requestWithdrawSub`,
    transactionsGet: `transactionsGet`
}

export const BMMethodName = {
    creatSub: `sdk_sub_account_create`,
    debitSub: `sdk_sub_account_debit`,
    creditSub: `sdk_sub_account_credit`,
    requestWithdrawSub: `sdk_sub_account_request_withdraw`,
    transactionsGet: `master_main_transactions_get`
}

export const BMMethodFUnc = {
    creatSub,
    debitSub,
    creditSub,
    requestWithdrawSub,
    transactionsGet
}

const AssetType = ['usdt_trc20', 'trx', 'eur']
export const ActionType = {
    bonus: 'bonus',
    debit: 'debit',
    credit: 'credit',
    transfer: 'transfer',
    convert: 'convert',
    withdraw: 'withdraw',
    deposit: 'deposit',
    cancel: 'cancel'
}

export type Asset = {
    balance: number
    address: string
}

export type AllAsset = {
    eur: number
    trx: Asset
    usdt_trc20: Asset
}

export type AllSubCashier = {
    eur: number
    trx: number
    usdt_trc20: number
}

export type SubAccount = {
    username: string
    slug: string
    type: string
    main: string
    lock: string
    asset: AllAsset
    deposit: AllSubCashier
    withdraw: AllSubCashier
}

export enum TransactionSystem {
    internal = 'internal',
    external = 'external',
}
export enum TransactionStatus {
    sent = 'sent',
    completed = 'completed'
}
export enum TransactionType {
    debit = 'debit',
    credit = 'credit',
    deposit = 'deposit',
    withdraw = 'withdraw'
}

export type InternalAccount = {
    _id: string
    slug: string
}

export type ExternalAccount = {
    address: string
}

export type InternalTxData = {
    sender: InternalAccount
    receiver: InternalAccount
}

export type ExternalDepositTxData = {
    sender: ExternalAccount
    receiver: InternalAccount
}

export type ExternalWithdrawTxData = {
    sender: InternalAccount
    receiver: ExternalAccount
}

export type TransactionData = InternalTxData | ExternalDepositTxData | ExternalWithdrawTxData

export type Transaction = {
    _id?: string
    uuid: string
    system: TransactionSystem
    type: TransactionType
    status: TransactionStatus
    amount: number
    asset: string
    action: string
    data: TransactionData
    txid: string
    updatedAt: Date
    createdAt: Date
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

    private async GetData(type, params: any) {
        try {
            let methodName: string = ``
            let query: string = ``
            switch (type) {
                case BMMethodType.creatSub:
                    methodName = BMMethodFUnc.creatSub(params).name
                    query = BMMethodFUnc.creatSub(params).query
                    break;
                case BMMethodType.creditSub:
                    methodName = BMMethodFUnc.creditSub(params).name
                    query = BMMethodFUnc.creditSub(params).query
                    break;
                case BMMethodType.debitSub:
                    methodName = BMMethodFUnc.debitSub(params).name
                    query = BMMethodFUnc.debitSub(params).query
                    break;
                case BMMethodType.requestWithdrawSub:
                    methodName = BMMethodFUnc.requestWithdrawSub(params).name
                    query = BMMethodFUnc.requestWithdrawSub(params).query
                    break;
                case BMMethodType.transactionsGet:
                    methodName = BMMethodFUnc.transactionsGet(params).name
                    query = BMMethodFUnc.transactionsGet(params).query
                    break;
                default:
                    break;
            }
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
            return data.data[methodName]
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
            if (!username) throw new Error(BMErrorCode.PARAM_MISSING)
            if (!usernameRegex.test(username)) throw new Error(BMErrorCode.PARAM_INVALID)
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
    public async debitSubAcc(uuid: string, username: string, amount: number, asset: 'eur' | 'trx' | 'usdt_trc20', action: 'bonus' | 'debit' | 'credit' | 'convert' | 'transfer' | 'cancel'): Promise<Transaction> {
        try {
            if (!username) throw new Error(BMErrorCode.PARAM_MISSING)
            if (!asset) throw new Error(BMErrorCode.PARAM_MISSING)
            if (!usernameRegex.test(username)) throw new Error(BMErrorCode.PARAM_INVALID)
            if (!(typeof amount === `number`) || amount < 0) throw new Error(BMErrorCode.PARAM_INVALID)
            if (!AssetType.includes(asset)) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!Object.values(ActionType).includes(action)) throw new Error(ErrorCode.PARAM_INVALID)
            let res = await this.GetData(BMMethodType.debitSub, { uuid, username, amount, asset, action }) as Transaction
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
    public async creditSubAcc(uuid: string, username: string, amount: number, asset: 'eur' | 'trx' | 'usdt_trc20', action: 'bonus' | 'debit' | 'credit' | 'transfer' | 'convert' | 'cancel'): Promise<Transaction> {
        try {
            if (!username) throw new Error(BMErrorCode.PARAM_MISSING)
            if (!asset) throw new Error(BMErrorCode.PARAM_MISSING)
            if (!usernameRegex.test(username)) throw new Error(BMErrorCode.PARAM_INVALID)
            if (!(typeof amount === `number`) || amount < 0) throw new Error(BMErrorCode.PARAM_INVALID)
            if (!AssetType.includes(asset)) throw new Error(BMErrorCode.PARAM_INVALID)
            // if (!Object.values(ActionType).includes(action)) throw new Error(ErrorCode.PARAM_INVALID)
            let res = await this.GetData(BMMethodType.creditSub, { uuid, username, amount, asset, action }) as Transaction
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
            if (!username) throw new Error(BMErrorCode.PARAM_MISSING)
            if (!asset) throw new Error(BMErrorCode.PARAM_MISSING)
            if (!usernameRegex.test(username)) throw new Error(BMErrorCode.PARAM_INVALID)
            if (!(typeof amount === `number`) || amount < 0) throw new Error(BMErrorCode.PARAM_INVALID)
            if (!AssetType.includes(asset)) throw new Error(BMErrorCode.PARAM_INVALID)
            let res = await this.GetData(BMMethodType.requestWithdrawSub, { uuid, username, amount, asset, receiver }) as Transaction
            return res
        } catch (e) {
            throw e
        }
    }

    public async TransactionsGet(pageNumber: number, pageSize: Number): Promise<Transaction[]> {
        try {
            if (pageNumber < 0 || pageSize < 1 || pageSize > 1000) throw new Error(BMErrorCode.PARAM_INVALID)
            let res = await this.GetData(BMMethodType.transactionsGet, { pageNumber, pageSize }) as Transaction[]
            return res
        } catch (e) {
            throw e
        }
    }
}

export { BrickSDK }