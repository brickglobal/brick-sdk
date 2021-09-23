import { BMApolloMethodName } from ".";
export const customerTransfer = (params: {
  sender_id: string,
  receiver_id: string,
  asset_id: number,
  receiver_enterprise_id?: string,
  amount: number,
  req_id: string,
  req_time: number,
  action?: string,
}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.customerTransfer,
    query: `mutation{
      ${BMApolloMethodName.customerTransfer}(
            sender_id: "${params.sender_id}"
            receiver_id: "${params.receiver_id}"
            asset_id: ${params.asset_id}
            ${params.receiver_enterprise_id?`receiver_enterprise_id: "${params.receiver_enterprise_id}"`: ""}
            amount: ${params.amount}
            req_id: "${params.req_id}"
            req_time: ${params.req_time}
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
