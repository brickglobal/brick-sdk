import { BMApolloMethodName } from ".";

export const enterpriseAddressGet = (params: {asset_id: string}): { name: string; query: string } => {
  return {
    name: BMApolloMethodName.enterpriseAddressGet,
    query: `query{
        ${BMApolloMethodName.enterpriseAddressGet}(asset_id:${params.asset_id})
          }`,
  };
};
