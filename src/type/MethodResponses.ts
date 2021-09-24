import { LogCustomerDetail } from "."

export type RecheckResponse = {
    txid: string
    status: string
}

export type AllAccountBalanceResponse = {
    eur: number
    usdt_trc20: number
}

export type CustomerBalanceGet = {
    asset_id: number
    balance: number
}
export type LogHistoryResponse = {
    data: [LogCustomerDetail]
    totalItems: Number
}

