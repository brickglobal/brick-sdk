import { BMApolloMethodName } from "../brickSDK"

export const requestWithdrawSub = (params: any): { name: string, query: string } => {
    return {
        name: BMApolloMethodName.requestWithdrawSub,
        query: `
                    mutation{
                        ${BMApolloMethodName.requestWithdrawSub}(uuid:"${params.uuid}",username:"${params.username}",asset:${params.asset},amount:${params.amount},receiver:"${params.receiver}"){
                            uuid
                            system
                            type
                            amount
                            fee
                            asset
                            action
                            updatedAt
                            createdAt
                            txid
                            data{
                                ... on InternalTxData{
                                  sender{
                                    _id
                                    slug
                                  }
                                  receiver{
                                    _id
                                    slug
                                  }
                                }
                                ... on ExternalDepositTxData{
                                  sender{
                                    address
                                  }
                                  receiver{
                                    _id
                                    slug
                                  }
                                }
                                ... on ExternalWithdrawTxData{
                                  sender{
                                    _id
                                    slug
                                  }
                                  receiver{
                                    address
                                  }
                                }
                              }
                          }
                    }`
    }
}