import { BMApolloMethodName } from "../brickSDK"

export const subAccountInfo = (params: any): { name: string, query: string } => {
    return {
        name: BMApolloMethodName.subAccountInfo,
        query: `
        query{
            ${BMApolloMethodName.subAccountInfo}(username:"${params.username}"){
                username
                slug
                type
                main
                lock
                asset{
                eur
                trx{
                    balance
                    address
                }
                usdt_trc20{
                    balance
                    address
                }
                }
                deposit{
                eur
                trx
                usdt_trc20
                }
                withdraw{
                eur
                trx
                usdt_trc20
                }
            }
          }`
    }
}