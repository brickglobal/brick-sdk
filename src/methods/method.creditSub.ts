import { BMMethodName } from "../brickSDK"

export const creditSub = (params: any): { name: string, query: string } => {
    return {
        name: BMMethodName.creditSub,
        query: `
                    mutation{
                        ${BMMethodName.creditSub}(uuid:"${params.uuid}",action:"${params.action}",username:"${params.username}",asset:${params.asset},amount:${params.amount}){
                            uuid
                            system
                            type
                            amount
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