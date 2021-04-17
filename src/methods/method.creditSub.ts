import { BMApolloMethodName } from "../brickSDK"

export const creditSub = (params: any): { name: string, query: string } => {
    return {
        name: BMApolloMethodName.creditSub,
        query: `
                    mutation{
                        ${BMApolloMethodName.creditSub}(uuid:"${params.uuid}",action:"${params.action}",username:"${params.username}",asset:${params.asset},amount:${params.amount}){
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
                            currentBalance
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