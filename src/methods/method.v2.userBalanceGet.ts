import { BMApolloMethodName } from ".";

export const userBalanceGet = (params: {customer_id: string}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.userBalanceGet,
    query: `query{
            ${BMApolloMethodName.userBalanceGet}(customer_id:"${params.customer_id}"){
                  asset_id
                  balance
            }
          }`,
  };
};
