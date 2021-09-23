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
