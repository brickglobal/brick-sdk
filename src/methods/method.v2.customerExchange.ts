import { BMApolloMethodName } from ".";

export const customerExchange = (params: {
  customer_id: string,
  from_asset_id: number,
  to_asset_id: number,
  from_amount: number,
  to_amount: number,
  req_id: String,
  req_time: Number,
  action?: String
}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.customerExchange,
    query: `mutation{
      ${BMApolloMethodName.customerExchange}(
            customer_id: "${params.customer_id}"
            from_asset_id: ${params.from_asset_id}
            to_asset_id: ${params.to_asset_id}
            from_amount: ${params.from_amount}
            to_amount: ${params.to_amount}
            req_id: "${params.req_id}"
            req_time: ${params.req_time}
            ${params.action ? `action: "${params.action}"` : ``}
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
