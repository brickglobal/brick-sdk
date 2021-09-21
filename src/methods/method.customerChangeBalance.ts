import { BMApolloMethodName } from ".";

export const customerChangeBalance = (params: {customer_id: string, asset_id: number, amount: number}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.customerChangeBalance,
    query: `mutation{
        sdk_customer_change_balance(
            customer_id: "${params.customer_id}"
            asset_id: ${params.asset_id}
            amount: ${params.amount}
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
