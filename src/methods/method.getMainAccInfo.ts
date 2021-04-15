import { BMApolloMethodName } from "../brickSDK"

export const getMainAccInfo = (params: any): { name: string, query: string } => {
    return {
        name: BMApolloMethodName.getMainAccInfo,
        query: `
                query{
                        ${BMApolloMethodName.getMainAccInfo} {
                        username
                        slug
                        type
                        lock
                        email
                        emailVerifiedAt
                        twoFa
                        apiKey
                        fee {
                            deposit {
                            ... on FeeVersion1 {
                                version
                                data {
                                a
                                b
                                }
                            }
                            }
                            withdraw {
                            ... on FeeVersion1 {
                                version
                                data {
                                a
                                b
                                }
                            }
                            }
                        }
                        masterFee {
                            deposit
                            withdraw
                        }
                        asset {
                            trx {
                            balance
                            address
                            }
                            usdt_trc20 {
                            balance
                            address
                            }
                        }
                        deposit {
                            trx {
                            totalDeposit
                            mainDeposit
                            subsDeposit
                            }
                            usdt_trc20 {
                            totalDeposit
                            mainDeposit
                            subsDeposit
                            }
                        }
                        withdraw {
                            trx {
                            totalWithdraw
                            mainWithdraw
                            subsWithdraw
                            }
                            usdt_trc20 {
                            totalWithdraw
                            mainWithdraw
                            subsWithdraw
                            }
                        }
                        }
                    }`
    }
}