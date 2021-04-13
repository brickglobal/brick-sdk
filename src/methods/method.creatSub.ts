import { BMMethodName } from "../brickSDK"

export const creatSub = (params: { username: string }): { name: string, query: string } => {
    return {
        name: BMMethodName.creatSub,
        query: `mutation {
            ${BMMethodName.creatSub}(username:"${params.username}"){
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
          }}`
    }
}