import { Consumer, Kafka } from "kafkajs";
import { loadSync } from "@grpc/proto-loader";
import { loadPackageDefinition, credentials } from "grpc";
import { join } from "path";
import { promisify } from "util";
import { ECPair, networks } from "bitcoinjs-lib";
import TronWeb from "tronweb";

const tronweb = new TronWeb({ fullHost: 'https://api.trongrid.io' })
const network = networks.bitcoin

type Currency = {
    type: 'btc' | 'bch' | 'ltc' | 'eth' | 'etc' | 'trx' | 'trc10' | 'trc20' | 'erc20',
    address: string | null
}

type Change = {
    address: string
    txid: string
    n: number
    value: string
    currency: Currency
    blockNumber: number
    timeStamp: number
}

class Brick {
    private _apiKey: string
    private _provider: string
    private _grpcCall: any

    constructor(params: { apiKey: string, provider: string }) {
        if (!params.apiKey) throw new Error(`apiKey must be provided`)
        if (!params.provider) throw new Error(`provider must be provided`)

        this._apiKey = params.apiKey
        this._provider = params.provider

        const packageObject = loadPackageDefinition(loadSync(join(__dirname, '../BrickService.proto'), {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        })) as any

        const grpc = new packageObject['BrickService'](this._provider, credentials.createInsecure())

        this._grpcCall = promisify(grpc.call).bind(grpc)
    }

    public async consume(params: { brokers: string[], callback: (change: Change) => Promise<void> }) {
        try {
            if (!params.brokers.length) throw new Error(`brokers must be provided`)
            if (!params.callback) throw new Error(`callback must be provided`)

            const kafka = new Kafka({
                clientId: this._apiKey,
                brokers: params.brokers,
                ssl: false,
                sasl: undefined
            })

            const consumer = kafka.consumer({ groupId: `${this._apiKey}` })

            await consumer.connect()
            console.log(`consumer connected`)

            await consumer.subscribe({ topic: this._apiKey, fromBeginning: true })
            console.log(`topic subscribed`)

            await consumer.run({
                eachMessage: async payload => {
                    try {
                        const { value } = payload.message

                        const data = JSON.parse(Buffer.from(value!).toString())

                        await params.callback(data)
                    } catch (e) {
                        throw e
                    }
                }
            })
        } catch (e) {
            throw e
        }
    }

    public async watch(params: { address: string, currency: Currency }): Promise<{ result: string, error: string }> {
        try {
            const { result, error } = await this._grpcCall({
                method: 'user_account_watch',
                params: JSON.stringify({ apiKey: this._apiKey, ...params })
            })

            // console.log({ result, error });

            return { result, error }
        } catch (e) {
            throw e
        }
    }

    public async unwatch(params: { address: string, currency: Currency }): Promise<{ result: string, error: string }> {
        try {
            const { result, error } = await this._grpcCall({
                method: 'user_account_unwatch',
                params: JSON.stringify({ apiKey: this._apiKey, ...params })
            })

            // console.log({ result, error });

            return { result, error }
        } catch (e) {
            throw e
        }
    }

    public newAddress(params: { currency: Currency }): { address: string, privateKey: string } {
        const keyPair = ECPair.makeRandom({ network })

        switch (params.currency.type) {
            case 'trx':
            case 'trc10':
            case 'trc20':
                const privateKey = keyPair.privateKey!.toString('hex')
                const address = tronweb.address.fromPrivateKey(privateKey)
                return { address, privateKey }

            default: throw new Error(`type ${params.currency.type} not supported yet`)
        }
    }

    public async send(params: { privateKey: string, toAddress: string, amount: number, feeLimit?: number, currency: Currency }): Promise<string> {
        try {
            if (!params.privateKey) throw new Error(`privateKey must be provided`)
            if (!(Number.isInteger(params.amount) || params.amount > 0)) throw new Error(`amount ${params.amount} is invalid`)

            let txid: string

            switch (params.currency.type) {
                case 'trx':
                    if (!tronweb.isAddress(params.toAddress)) throw new Error(`toAddress ${params.toAddress} is invalid for type ${params.currency.type}`)
                    const trxResult = await tronweb.trx.sendTransaction(params.toAddress, params.amount, params.privateKey)
                    txid = trxResult?.transaction?.txID
                    break;
                case 'trc10':
                    if (!tronweb.isAddress(params.toAddress)) throw new Error(`toAddress ${params.toAddress} is invalid for type ${params.currency.type}`)
                    if (!Number.isInteger(Number(params.currency.address))) throw new Error(`currency address ${params.currency.address} is invalid for type ${params.currency.type}`)
                    const trc10Result = await tronweb.trx.sendToken(params.toAddress, params.amount, params.currency.address, params.privateKey)
                    txid = trc10Result?.transaction?.txID
                    break
                case 'trc20':
                    if (!tronweb.isAddress(params.toAddress)) throw new Error(`toAddress ${params.toAddress} is invalid for type ${params.currency.type}`)
                    if (!tronweb.isAddress(params.currency.address)) throw new Error(`currency address ${params.currency.address} is invalid for type ${params.currency.type}`)
                    const parameters = [{ type: 'address', value: params.toAddress }, { type: 'uint256', value: params.amount }]
                    const options = {
                        feeLimit: 10000000,
                        callValue: 0
                    }
                    const trc20Result = await tronweb.transactionBuilder.triggerSmartContract(params.currency.address, `transfer(address uint256)`, params.currency.address, params.privateKey)
                    txid = trc10Result?.transaction?.txID
                    break
                default: throw new Error(`type ${params.currency.type} not supported`)
            }
            return txid
        } catch (e) {
            throw e
        }
    }
}

export { Brick }