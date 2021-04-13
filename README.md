# Brick Master SDK

A JavaScript SDK for interact with Brick Master server

[![npm version](https://img.shields.io/npm/v/brickSDK.js.svg)](https://www.npmjs.com/package/brickSDK.js)
[![npm downloads](https://img.shields.io/npm/dw/brickSDK.js)](https://www.npmjs.com/package/brickSDK.js)

## Features

- Create sub account 
- Debit / Credit / RequestWithdraw for sub account
- Support `TRC20`

## Installation
### [Node.js](http://nodejs.org):
```bash
$ npm install @brickglobal/brick-sdk
```
## Creating an Instance
First off, in your javascript file, define `BrickSDK`:
```javascript
const { BrickSDK } = require('@brickglobal/brick-sdk');
```
> ES module

```javascript
import { BrickSDK } from "@brickglobal/brick-sdk";
```
When you instantiate `BrickSDK` you must provide
* apiKey
* provider

```javascript
const brickSDK = new BrickSDK({ 
    apiKey: "EK5R6MF-8VJMSZT-*******-*******", 
    provider: "http://example-host:xxxx/" 
})
```
## Methods
There are total 4 methods:
####  `createSubAcc`
Using to create sub account
__Params__
```javascript
username: string
```
__Return__
```javascript
{
    username: string
    slug: string
    type: string
    main: string
    lock: string
    asset: {
        eur: number
        trx: {
            balance: number
            address: string
        }
        usdt_trc20: {
            balance: number
            address: string
        }
    }
    deposit: {
        eur: number
        trx: number
        usdt_trc20: number
    }
    withdraw:{
        eur: number
        trx: number
        usdt_trc20: number
    }
}
```
__Example__
```javascript
const createRes= await brickSDK.createSubAcc("testSubAcc")
/*Success return example
   {
        username: 'testSubAcc',
        slug: 'testsubacc',
        type: 'sub',
        main: 'testMainAcc',
        lock: 'none',
        asset: {
            eur: 0,
            trx: { balance: 0, address: 'TR4jDigUp6JK7mF7UhBfju9*******' },
            usdt_trc20: { balance: 0, address: 'TR4jDigUp6JK7mF7UhBfju9*******' }
        },
        deposit: { eur: 0, trx: 0, usdt_trc20: 0 },
        withdraw: { eur: 0, trx: 0, usdt_trc20: 0 }
    }
*/
```
####  `debitSubAcc`
Using to request debit
__Params__
```javascript
uuid: string
usename: string
amount: number
asset: 'eur'|'trx'|'usdt_trc20'
action: string
```
__Return__
```javascript
{
    _id?: string
    uuid: string
    system: 'internal'|'external'
    type: 'debit'|'credit'|'deposit'|'withdraw'
    status: 'sent'|'completed'
    amount: number
    asset: string
    action: string
    data: {
        sender: {_id: string, slug: string} | {address: string}
        receiver: {_id: string, slug: string} | {address: string}
    }
    txid: string
    updatedAt: Date
    createdAt: Date
}
```
__Example__
```javascript
const debitRes= await brickSDK.debitSubAcc("fakeDebitUUID","testSubAcc",1000000,"usdt","debit")
/*Success return example
    {
        uuid: 'fakeDebitUUID',
        system: 'internal',
        type: 'debit',
        amount: 1000000,
        asset: 'usdt_trc20',
        action: 'debit',
        updatedAt: '2021-04-13T08:59:16.455Z',
        createdAt: '2021-04-13T08:59:16.455Z',
        txid: 'b06b8d42-96f6-4210-9717-************',
        data: {
            sender: { _id: '60751775ec13070012******', slug: 'testMainAcc' },
            receiver: { _id: '60755a56b1c3040012******', slug: 'testsubacc' }
        }
    }
*/
```
####  `creditSubAcc`
Using to request credit
__Params__
```javascript
uuid: string
usename: string
amount: number
asset: 'eur'|'trx'|'usdt_trc20'
action: string
```
__Return__
```javascript
{
    _id?: string
    uuid: string
    system: 'internal'|'external'
    type: 'debit'|'credit'|'deposit'|'withdraw'
    status: 'sent'|'completed'
    amount: number
    asset: string
    action: string
    data: {
        sender: {_id: string, slug: string} | {address: string}
        receiver: {_id: string, slug: string} | {address: string}
    }
    txid: string
    updatedAt: Date
    createdAt: Date
}
```
__Example__
```javascript
const creditRes= await brickSDK.creditSubAcc("fakeCreditUUID","testSubAcc",1000000,"usdt","debit")
/*Success return example
    creditRes {
        uuid: 'fakeCreditUUID',
        system: 'internal',
        type: 'credit',
        amount: 1000000,
        asset: 'usdt_trc20',
        action: 'credit',
        updatedAt: '2021-04-13T00:00:00.000Z',
        createdAt: '2021-04-13T00:00:00.000Z',
        txid: 'b06b8d42-96f6-4210-9717-************',
        data: {
            sender: { _id: '60751775ec13070012******', slug: 'testMainAcc' },
            receiver: { _id: '60755a56b1c3040012******', slug: 'testsubacc' }
        }
    }
*/
```
####  `SubAccRequestWithDraw`
using to request withdraw
__Params__
```javascript
uuid: string
usename: string
amount: number
asset: 'eur'|'trx'|'usdt_trc20'
receiver: string                        //TRC20 address
```
__Return__
```javascript
{
    _id?: string
    uuid: string
    system: 'internal'|'external'
    type: 'debit'|'credit'|'deposit'|'withdraw'
    status: 'sent'|'completed'
    amount: number
    asset: string
    action: string
    data: {
        sender: {_id: string, slug: string} | {address: string}
        receiver: {_id: string, slug: string} | {address: string}
    }
    txid: string
    updatedAt: Date
    createdAt: Date
}
```
__Example__
```javascript
const withdrawRes= await brickSDK.SubAccRequestWithDraw("fakeCreditUUID","testSubAcc",1000000,"usdt","TJYM3W22TYpvpnAHNgT7UsG6Aek*******")
/*Success return example
    withdrawRes {
        uuid: 'fakeCreditUUID',
        system: 'external',
        type: 'withdraw',
        amount: 1000000,
        asset: 'usdt_trc20',
        action: 'withdraw',
        updatedAt: '2021-04-13T00:00:00.000Z',
        createdAt: '2021-04-13T00:00:00.000Z',
        txid: 'b06b8d42-96f6-4210-9717-************',
        data: {
            sender: { _id: '60751775ec13070012******', slug: 'testMainAcc' },
            receiver: { address:'TJYM3W22TYpvpnAHNgT7UsG6Aek*******' }
        }
    }
*/
```
## Error 
There are two type of error that will be response
* SDK error
* Server response error

__SDK error__
`API_KEY_MISSING`: missing API key when instantiate BrickSDK
`PROVIDER_MISSING`: missing Provider when instantiate BrickSDK
`PARAM_INVALID`: param not correct type or not support
`PARAM_MISSING`: some param is missing

__Server response error__
This errors will start with `BM:` as prefix
Will be update soon ...
## Recent History
__1.0.7__
first time deloy to npm