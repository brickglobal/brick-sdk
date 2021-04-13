import { BMMethodName } from "../brickSDK"

export const requestWithdrawSub = (params: any): { name: string, query: string } => {
    return {
        name: BMMethodName.requestWithdrawSub,
        query: `
                    mutation{
                        ${BMMethodName.requestWithdrawSub}(uuid:"${params.uuid}",username:"${params.username}",asset:${params.asset},amount:${params.amount},receiver:"${params.receiver}"){
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