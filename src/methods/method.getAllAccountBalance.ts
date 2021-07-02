import { BMApolloMethodName } from "."


export const getAllAccountBalance = (params: any): { name: string, query: string } => {
    return {
        name: BMApolloMethodName.getAllAccountBalance,
        query: `
            query {
                ${BMApolloMethodName.getAllAccountBalance} {
                eur
                usdt_trc20
                }
            }
          `
    }
}