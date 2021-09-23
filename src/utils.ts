import { BMMethodFUnc, BMMethodType } from "./methods"

export const usernameRegex = /^[a-zA-Z0-9]{4,16}$/


export const fixDateType = (object: {
    updatedAt?: any
    createdAt?: any
    emailVerifiedAt?: any
}) => {
    if (object.updatedAt) {
        object.updatedAt = new Date(object.updatedAt)
    }
    if (object.createdAt) {
        object.createdAt = new Date(object.createdAt)
    }
    if (object.emailVerifiedAt) {
        object.emailVerifiedAt = new Date(object.emailVerifiedAt)
    }
}

export const getMethodNameAndQuery = (type: string, params: any) => {
    let methodName: string = ``
    let query: string = ``
    switch (type) {
        case BMMethodType.creatSub:
            methodName = BMMethodFUnc.createSub(params).name
            query = BMMethodFUnc.createSub(params).query
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
        case BMMethodType.getMainAccInfo:
            methodName = BMMethodFUnc.getMainAccInfo(params).name
            query = BMMethodFUnc.getMainAccInfo(params).query
            break;
        case BMMethodType.subAccountInfo:
            methodName = BMMethodFUnc.subAccountInfo(params).name
            query = BMMethodFUnc.subAccountInfo(params).query
            break;
        case BMMethodType.recheckTx:
            methodName = BMMethodFUnc.recheckTx(params).name
            query = BMMethodFUnc.recheckTx(params).query
            break;
        case BMMethodType.getAllAccountBalance:
            methodName = BMMethodFUnc.getAllAccountBalance(params).name
            query = BMMethodFUnc.getAllAccountBalance(params).query
            break;
        case BMMethodType.customerWithdraw:
            methodName = BMMethodFUnc.customerWithdraw(params).name
            query = BMMethodFUnc.customerWithdraw(params).query
            break;
        case BMMethodType.customerTransfer:
            methodName = BMMethodFUnc.customerTransfer(params).name
            query = BMMethodFUnc.customerTransfer(params).query
            break;
        case BMMethodType.customerExchange:
            methodName = BMMethodFUnc.customerExchange(params).name
            query = BMMethodFUnc.customerExchange(params).query
            break;
        case BMMethodType.customerChangeBalance:
            methodName = BMMethodFUnc.customerChangeBalance(params).name
            query = BMMethodFUnc.customerChangeBalance(params).query
            break;
        case BMMethodType.customerBalanceGet:
            methodName = BMMethodFUnc.customerBalanceGet(params).name
            query = BMMethodFUnc.customerBalanceGet(params).query
            break;
        case BMMethodType.enterpriseAddressGet:
            methodName = BMMethodFUnc.enterpriseAddressGet(params).name
            query = BMMethodFUnc.enterpriseAddressGet(params).query
            break;
        default:
            break;
    }
    return {
        methodName,
        query
    }
}