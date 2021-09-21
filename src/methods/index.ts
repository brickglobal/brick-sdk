import { createSub } from "./method.createSub";
import { creditSub } from "./method.creditSub";
import { customerChangeBalance } from "./method.customerChangeBalance";
import { customerExchange } from "./method.customerExchange";
import { customerTransfer } from "./method.customerTransfer";
import { customerWithdraw } from "./method.customerWithdraw";
import { debitSub } from "./method.debitSub";
import { getAllAccountBalance } from "./method.getAllAccountBalance";
import { getMainAccInfo } from "./method.getMainAccInfo";
import { recheckTx } from "./method.recheckTx";
import { requestWithdrawSub } from "./method.requestWithdrawSub";
import { subAccountInfo } from "./method.subAccountInfo";
import { transactionsGet } from "./method.transactionsGet";
import { userBalanceGet } from "./method.userBalanceGet";


export const BMMethodFUnc = {
    createSub,
    debitSub,
    creditSub,
    requestWithdrawSub,
    transactionsGet,
    getMainAccInfo,
    subAccountInfo,
    recheckTx,
    getAllAccountBalance,
    userBalanceGet,
    customerWithdraw,
    customerTransfer,
    customerExchange,
    customerChangeBalance
}

export const BMMethodType = {
    creatSub: `createSub`,
    debitSub: `debitSub`,
    creditSub: `creditSub`,
    requestWithdrawSub: `requestWithdrawSub`,
    transactionsGet: `transactionsGet`,
    getMainAccInfo: `getMainAccInfo`,
    subAccountInfo: `subAccountInfo`,
    recheckTx: `recheckTx`,
    getAllAccountBalance: `getAllAccountBalance`,
    userBalanceGet: `UserBalanceGet`,
    customerWithdraw: `customerWithdraw`,
    customerTransfer: `customerTransfer`,
    customerExchange: `customerExchange`,
    customerChangeBalance: `customerChangeBalance`,
}

export const BMApolloMethodName = {
    creatSub: `sdk_sub_account_create`,
    debitSub: `sdk_sub_account_debit`,
    creditSub: `sdk_sub_account_credit`,
    requestWithdrawSub: `sdk_sub_account_request_withdraw`,
    transactionsGet: `master_main_transactions_get`,
    getMainAccInfo: `sdk_main_account_get`,
    subAccountInfo: `sdk_sub_account_get`,
    recheckTx: `sdk_admin_recheck`,
    getAllAccountBalance: `sdk_main_account_subs_balance_get`,
    userBalanceGet: `sdk_user_balance_get`,
    customerWithdraw: `sdk_customer_withdraw`,
    customerTransfer: `sdk_customer_transfer`,
    customerExchange: `sdk_customer_exchange`,
    customerChangeBalance: `sdk_customer_change_balance`,
}