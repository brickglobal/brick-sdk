import { AllAsset } from "./SubAccount"


export type MasterSettings = {
    depositMin: number
    withdrawMin: number
    depositFee: number
    withdrawFee: number
}

type MainDeposit = {
    totalDeposit: number
    mainDeposit: number
    subsDeposit: number
}

type MainWithdraw = {
    totalWithdraw: number
    mainWithdraw: number
    subsWithdraw: number
}

type AllMainDeposit = {
    trx: MainDeposit
    usdt_trc20: MainDeposit
}

type AllMainWithdraw = {
    trx: MainWithdraw
    usdt_trc20: MainWithdraw
}

type FeeVersion1Data = {
    a: number
    b: number
}

type FeeVersion2Data = {
    a: number
    b: number
    c: number
    min: number
}

type FeeVersion1 = {
    version: number
    data: FeeVersion2Data
}

export type MainAccountFee = {
    deposit: FeeVersion1
    withdraw: FeeVersion1
}

export type MainAccount = {
    username: String
    slug: String
    type: String
    lock: String
    email: String
    emailVerifiedAt: Date
    twoFa: Boolean
    apiKey: String
    asset: AllAsset
    deposit: AllMainDeposit
    withdraw: AllMainWithdraw
    fee: MainAccountFee
    masterSettings: MasterSettings
}