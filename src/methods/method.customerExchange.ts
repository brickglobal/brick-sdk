import { BMApolloMethodName } from ".";

export const customerExchange = (params: {customer_id: string, from_asset_id: number, to_asset_id: number, from_amount: number, to_amount: number}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.customerExchange,
    query: `mutation{
        sdk_customer_exchange(
            customer_id: "${params.customer_id}"
            from_asset_id: ${params.from_asset_id}
            to_asset_id: ${params.from_asset_id}
            from_amount: ${params.to_amount}
            to_amount: ${params.to_amount}
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
