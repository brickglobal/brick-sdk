import { BMApolloMethodName } from ".";

export const customerTransfer = (params: {sender_id: string, receiver_id: string, asset_id: number, receiver_enterprise_id: string, amount: number}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.customerTransfer,
    query: `mutation{
        sdk_customer_transfer(
            sender_id:"${params.sender_id}"
            receiver_id:"${params.receiver_id}"
            asset_id: ${params.asset_id}
            receiver_enterprise_id:"${params.receiver_enterprise_id}"
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
