import { BMApolloMethodName } from ".";

export const logCustomerHistoryGet = (params: {customer_id: String, action?: "all" | null, sort?: "newest" | "oldest" | null, pageNumber?: Number | null, pageSize?: Number | null}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.logCustomerHistoryGet,
    query: `query{
      ${BMApolloMethodName.logCustomerHistoryGet}(
        customer_id:"${params.customer_id}"
        ${params.action?`action: ${params.action}`: ""}
        ${params.sort?`sort: ${params.sort}`: ""}
        ${params.pageSize?`pageSize: ${params.pageSize}`: ""}
        ${params.pageNumber?`pageNumber: ${params.pageNumber}`: ""}
        ){
        data{
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
        totalItems
      }
          }`,
  };
};
