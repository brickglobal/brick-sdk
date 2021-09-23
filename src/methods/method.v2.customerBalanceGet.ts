import { BMApolloMethodName } from ".";

export const customerBalanceGet = (params: {customer_id: string}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.customerBalanceGet,
    query: `query{
            ${BMApolloMethodName.customerBalanceGet}(customer_id:"${params.customer_id}"){
                  asset_id
                  balance
            }
          }`,
  };
};
