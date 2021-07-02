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


export enum ActionType {
    bonus = 'bonus',
    debit = 'debit',
    credit = 'credit',
    transfer = 'transfer',
    convert = 'convert',
    withdraw = 'withdraw',
    deposit = 'deposit',
    cancel = 'cancel'
}

export type Transaction = {
    _id?: string
    uuid: string
    system: TransactionSystem
    type: TransactionType
    status: TransactionStatus
    amount: number
    asset: string
    action: ActionType | string
    data: TransactionData
    txid: string
    updatedAt: Date
    createdAt: Date
    fee: number
    currentBalance: number
}