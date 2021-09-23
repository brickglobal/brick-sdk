import { createSub } from "./method.createSub";
import { creditSub } from "./method.creditSub";
import { customerChangeBalance } from "./method.v2.customerChangeBalance";
import { customerExchange } from "./method.v2.customerExchange";
import { customerTransfer } from "./method.v2.customerTransfer";
import { customerWithdraw } from "./method.v2.customerWithdraw";
import { debitSub } from "./method.debitSub";
import { getAllAccountBalance } from "./method.getAllAccountBalance";
import { getMainAccInfo } from "./method.getMainAccInfo";
import { recheckTx } from "./method.recheckTx";
import { requestWithdrawSub } from "./method.requestWithdrawSub";
import { subAccountInfo } from "./method.subAccountInfo";
import { transactionsGet } from "./method.transactionsGet";
import { customerBalanceGet } from "./method.v2.customerBalanceGet";
import { enterpriseAddressGet } from "./method.v2.enterpriseAddressGet";


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
    customerBalanceGet,
    customerWithdraw,
    customerTransfer,
    customerExchange,
    customerChangeBalance,
    enterpriseAddressGet,
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
    customerBalanceGet: `customerBalanceGet`,
    customerWithdraw: `customerWithdraw`,
    customerTransfer: `customerTransfer`,
    customerExchange: `customerExchange`,
    customerChangeBalance: `customerChangeBalance`,
    enterpriseAddressGet: `enterpriseAddressGet`
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
    customerBalanceGet: `sdk_user_balance_get`,
    customerWithdraw: `sdk_customer_withdraw`,
    customerTransfer: `sdk_customer_transfer`,
    customerExchange: `sdk_customer_exchange`,
    customerChangeBalance: `sdk_customer_change_balance`,
    enterpriseAddressGet: `sdk_enterprise_asset_address_get`
}