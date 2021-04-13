import { BMMethodName } from "../brickSDK"

export const transactionsGet = (params: any): { name: string, query: string } => {
    return {
        name: BMMethodName.transactionsGet,
        query: `
                    query{
                        ${BMMethodName.transactionsGet}(pageNumber:${params.pageNumber}, pageSize:${params.pageSize}){
                            uuid
                            sender
                            receiver
                            amount
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