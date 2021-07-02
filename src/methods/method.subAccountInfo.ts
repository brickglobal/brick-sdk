import { BMApolloMethodName } from "."

export const subAccountInfo = (params: any): { name: string, query: string } => {
    return {
        name: BMApolloMethodName.subAccountInfo,
        query: `
        query{
            ${BMApolloMethodName.subAccountInfo}(username:"${params.username}" ${params.options ? `options:"${params.options}"` : ``}){
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