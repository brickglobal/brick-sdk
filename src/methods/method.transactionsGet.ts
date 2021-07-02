import { BMApolloMethodName } from "."

export const transactionsGet = (params: any): { name: string, query: string } => {
    return {
        name: BMApolloMethodName.transactionsGet,
        query: `
                    query{
                        ${BMApolloMethodName.transactionsGet}(pageNumber:${params.pageNumber}, pageSize:${params.pageSize}){
                            uuid
                            sender
                            receiver
                            amount
                            fee
                            asset
                            action
                            depositStatus
                            depositTxid
                            withdrawStatus
                            withdrawTxid
                            createdAt
                          }
                    }`
    }
}