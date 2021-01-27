import { Brick } from "../src/brick";

const callback = async change => console.log({ change })

const robusta = new Brick({
    apiKey: 'BZ7QM6E-CQP4QY5-GWQ8K7E-1B1ACYW',
    provider: '51.79.176.223:8600'
})

robusta.consume({
    brokers: ['51.79.176.223:9193'],
    callback
})

// robusta.connect()
//     .then(() => console.log('connected'))
//     .catch(err => console.error(err)) 

// ZB194E2-8J44B36-GA3Y1RH-6RN3VJ4.TAUN6FwrnwwmaEqYcckffC7wYmbaS6cBiX.trc10.1002000

// ZB194E2-8J44B36-GA3Y1RH-6RN3VJ4.TAUN6FwrnwwmaEqYcckffC7wYmbaS6cBiX.trc20.TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t

// ZB194E2-8J44B36-GA3Y1RH-6RN3VJ4.TAUN6FwrnwwmaEqYcckffC7wYmbaS6cBiX.trx.undefined

// robusta.watch({
//     address: 'TAUN6FwrnwwmaEqYcckffC7wYmbaS6cBiX',
//     // currency: { type: 'trx', address: null }
//     // currency: { type: 'trc10', address: '1002000' }
//     currency: { type: 'trc20', address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' }
// }).then(console.log).catch(console.error)

// robusta.unwatch({
//     address: 'TAUN6FwrnwwmaEqYcckffC7wYmbaS6cBiX',
//     // currency: { type: 'trx', address: null }
//     // currency: { type: 'trc10', address: '1002000' }
//     currency: { type: 'trc20', address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' }
// }).then(console.log).catch(console.error)

// console.log(robusta.newAddress({type: 'trx'}))