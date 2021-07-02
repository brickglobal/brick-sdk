import { BMApolloMethodName } from "."

export const debitSub = (params: any): { name: string, query: string } => {
    return {
        name: BMApolloMethodName.debitSub,
        query: `
                    mutation{
                        ${BMApolloMethodName.debitSub}(uuid:"${params.uuid}",action:"${params.action}",username:"${params.username}",asset:${params.asset},amount:${params.amount}){
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