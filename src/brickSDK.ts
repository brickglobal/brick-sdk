import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { usernameRegex } from "./utils";

export const ErrorCode = {
    PARAM_INVALID: `PARAM_INVALID`,
    PARAM_MISSING: `PARAM_MISSING`
}

const MethodType = {
    creatSub: `createSub`,
    debitSub: `debitSub`,
    creditSub: `creditSub`,
}

const AssetType = ['usdt_trc20', 'trx', 'eur']
const ActionType = ['bonus']

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

export type Transaction = {
    uuid: string
    sender: string
    receiver: string
    amount: number
    asset: string
    action: string
    extra: string
    createdAt: Date
}

class BrickSDK {

    private _apiKey: string
    private _provider: string

    constructor(params: { apiKey: string, provider: string }) {
        if (!params.apiKey) throw new Error(ErrorCode.PARAM_MISSING)
        if (!params.provider) throw new Error(ErrorCode.PARAM_MISSING)

        this._apiKey = params.apiKey
        this._provider = params.provider
    }

    private async GetData(type, params: any) {
        try {
            let query: string = ``
            switch (type) {
                case MethodType.creatSub:
                    query = `mutation {
                        sdk_sub_account_create(username:"${params.username}"){
                            username
                            slug
                            type
                            main
                            lock
                            asset{
                            eur
                            trx{
                                balance
                                address
                            }
                            usdt_trc20{
                                balance
                                address
                            }
                            }
                            deposit{
                            eur
                            trx
                            usdt_trc20
                            }
                            withdraw{
                            eur
                            trx
                            usdt_trc20
                            }
                      }}`
                    break;
                case MethodType.creditSub:
                    query = `
                    mutation{
                        sdk_sub_account_credit(uuid:"${uuidv4()}",action:"${params.action}",username:"${params.username}",asset:${params.asset},amount:${params.amount}){
                            uuid
                            sender
                            receiver
                            amount
                            asset
                            action
                            extra
                            createdAt
                          }
                    }`
                    break;
                case MethodType.debitSub:

                    query = `
                        mutation{
                            sdk_sub_account_debit(uuid:"${uuidv4()}",action:"${params.action}",username:"${params.username}",asset:${params.asset},amount:${params.amount}){
                                uuid
                                sender
                                receiver
                                amount
                                asset
                                action
                                extra
                                createdAt
                              }
                        }`

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
            return data.data
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
            if (!username) throw new Error(ErrorCode.PARAM_MISSING)
            if (!usernameRegex.test(username)) throw new Error(ErrorCode.PARAM_INVALID)
            let res = await this.GetData(MethodType.creatSub, { username }) as SubAccount
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
    public async debitSubAcc(username: string, amount: number, asset: 'eur' | 'trx' | 'usdt_trc20', action: 'bonus'): Promise<Transaction> {
        try {
            if (!username) throw new Error(ErrorCode.PARAM_MISSING)
            if (!amount) throw new Error(ErrorCode.PARAM_MISSING)
            if (!asset) throw new Error(ErrorCode.PARAM_MISSING)
            if (!usernameRegex.test(username)) throw new Error(ErrorCode.PARAM_INVALID)
            if (!(typeof amount === `number`) || !(amount > 0)) throw new Error(ErrorCode.PARAM_INVALID)
            if (!AssetType.includes(asset)) throw new Error(ErrorCode.PARAM_INVALID)
            if (!ActionType.includes(action)) throw new Error(ErrorCode.PARAM_INVALID)
            let res = await this.GetData(MethodType.debitSub, { username, amount, asset, action }) as Transaction
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
    public async creditSubAcc(username: string, amount: number, asset: 'eur' | 'trx' | 'usdt_trc20', action: 'bonus'): Promise<Transaction> {
        try {
            if (!username) throw new Error(ErrorCode.PARAM_MISSING)
            if (!amount) throw new Error(ErrorCode.PARAM_MISSING)
            if (!asset) throw new Error(ErrorCode.PARAM_MISSING)
            if (!usernameRegex.test(username)) throw new Error(ErrorCode.PARAM_INVALID)
            if (!(typeof amount === `number`) || !(amount > 0)) throw new Error(ErrorCode.PARAM_INVALID)
            if (!AssetType.includes(asset)) throw new Error(ErrorCode.PARAM_INVALID)
            if (!ActionType.includes(action)) throw new Error(ErrorCode.PARAM_INVALID)
            let res = await this.GetData(MethodType.creditSub, { username, amount, asset, action }) as Transaction
            return res
        } catch (e) {
            throw e
        }
    }
}

export { BrickSDK }