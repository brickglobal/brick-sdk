import { BMApolloMethodName } from "../brickSDK"

export const recheckTx = (params: any): { name: string, query: string } => {
    return {
        name: BMApolloMethodName.recheckTx,
        query: `
        query ${BMApolloMethodName.recheckTx} {
            sdk_admin_recheck(uuid:"${params.uuid}") {
                txid 
                status
            }
          }
        `
    }
}