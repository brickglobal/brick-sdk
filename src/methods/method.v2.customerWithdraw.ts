import { BMApolloMethodName } from ".";

export const customerWithdraw = (params: {customer_id: string, asset_id: number, amount: number, req_id: string, req_time: number, address?: string, action?: string}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.customerWithdraw,
    query: `mutation{
      ${BMApolloMethodName.customerWithdraw}(
          customer_id: "${params.customer_id}"
          asset_id:${params.asset_id}
          amount: ${params.amount}
          req_id: "${params.req_id}"
          req_time: ${params.req_time}
          ${params.address?`address: "${params.address}"`: ""}
          ${params.action?`action: "${params.action}"`: ""}
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
