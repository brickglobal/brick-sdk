import { BMApolloMethodName } from ".";

export const customerWithdraw = (params: {customer_id: string, asset_id: number, amount: number, address: string}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.customerWithdraw,
    query: `mutation{
        sdk_customer_withdraw(
          customer_id: "${params.customer_id}"
          asset_id:${params.asset_id}
          amount: ${params.amount}
          address:"${params.address}"
        ) {
          _id
          ref_id
          customer_id
          enterprise_id
          asset_id
          amount
          fee_brick
          txid
          create_date
          status
          action
        }
      }`,
  };
};
