import { BMApolloMethodName } from ".";

export const userBalanceGet = (params: {customer_id: string}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.userBalanceGet,
    query: `query{
            sdk_user_balance_get(customer_id:"${params.customer_id}"){
                  asset_id
                  balance
            }
          }`,
  };
};
