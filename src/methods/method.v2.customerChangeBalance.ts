import { BMApolloMethodName } from ".";
import { ChangeBalanceOptions } from "../type/LogCustomerDetail";

export const customerChangeBalance = (params: { customer_id: string, asset_id: number, amount: number, req_id: string, req_time: number, action: string, options?: ChangeBalanceOptions }): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.customerChangeBalance,
    query: `mutation{
      ${BMApolloMethodName.customerChangeBalance}(
            customer_id: "${params.customer_id}"
            asset_id: ${params.asset_id}
            amount: ${params.amount}
            req_id: "${params.req_id}"
            req_time: ${params.req_time}
            action: "${params.action}"
            ${params.options?.require_amount ?
            `options:{
              require_amount:${params.options.require_amount}
            }`: ""}
        ) {
          _id
          req_id
          ref_id
          customer_id
          enterprise_id
          asset_id
          amount
          fee_enterprise
          txid
          create_date
          status
          req_time
          action
        }
      }`,
  };
};
