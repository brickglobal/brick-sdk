# Brick Master SDK

A JavaScript SDK for interact with Brick Master server

[![npm version](https://img.shields.io/npm/v/@brickglobal/brick-sdk?style=plastic)](https://www.npmjs.com/package/@brickglobal/brick-sdk)
[![npm downloads](https://img.shields.io/npm/dw/@brickglobal/brick-sdk?style=plastic)](https://www.npmjs.com/package/@brickglobal/brick-sdk)

## Features

- Create sub account 
- Debit / Credit / RequestWithdraw for sub account
- Check main account information
- Check sub account information
- recheck TransactionID
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
There are total 65 methods:

1. createSubAcc
2. debitSubAcc
3. SubAccRequestWithDraw
4. MainAccountInfoGet
5. recheckTx
6. subAccountInfo
####  `1. createSubAcc`
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
####  `2. debitSubAcc`
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
    fee: number
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
        fee:0,
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
####  `3. creditSubAcc`
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
    fee:number
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
        fee:0,
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
####  `4. SubAccRequestWithDraw`
using to request withdraw
__Params__
```javascript
uuid: string
username: string
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
    fee:string
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
        fee:0,
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
####  `5. MainAccountInfoGet`
Using to get main account information
__Params__
```javascript
// no prams required
```
__Return__
```javascript
{
    username: string
    slug: string
    type: string
    lock: string
    email: string
    emailVerifiedAt: Date
    twoFa: boolean
    apiKey: string
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
        trx: {
            totalDeposit: number
            mainDeposit: number
            subsDeposit: number
        }
        usdt_trc20: {
            totalDeposit: number
            mainDeposit: number
            subsDeposit: number
        }
    }
    withdraw: {
         trx: {
            totalWithdraw: number
            mainWithdraw: number
            subsWithdraw: number
        }
        usdt_trc20: {
            totalWithdraw: number
            mainWithdraw: number
            subsWithdraw: number
        }
    }
    fee: {
        deposit: {
            version: number
            data: {
                a: number
                b: number
            }
        }
        withdraw: {
            version: number
            data: {
                a: number
                b: number
            }
        }
    }
    masterFee: {
        deposit: number
        withdraw: number
    }
}
```
__Example__
```javascript
const getAccInfoRes= await brickSDK.MainAccountInfoGet()
/*Success return example
    getAccInfoRes{
        username: 'testMainAcc',
        slug: 'testMainAcc',
        type: 'main',
        lock: 'none',
        email: 'testMainAcc@abc.com',
        emailVerifiedAt: '2021-04-00T00:00:00.000Z',
        twoFa: true,
        apiKey: 'ZQEWTH0-PZ348Y0-******-******-',
        fee: {
            deposit: { 
                version: 1, 
                data: {
                    a:0,
                    b:1
                } 
            },
            withdraw: { 
                version: 1, 
                data: {
                    a:1,
                    b:0
                } 
            }
        },
        masterFee: { 
            deposit: 0, 
            withdraw: 0 
        },
        asset: {
            trx: { 
                balance: 0, 
                address: 'TYxAnsw8NL1CDve9EPJ5KL************' 
            },
            usdt_trc20: {
                balance: 0,
                address: 'TYxAnsw8NL1CDve9EPJ5KL************'
            }
        },
        deposit: {
            trx: { 
                totalDeposit: 0, 
                mainDeposit: 0, 
                subsDeposit: 0 
            },
            usdt_trc20: {
                totalDeposit: 0,
                mainDeposit: 0,
                subsDeposit: 0
            }
        },
        withdraw: {
            trx: { 
                totalWithdraw: 0, 
                mainWithdraw: 0, 
                subsWithdraw: 0 
            },
            usdt_trc20: {
                totalWithdraw: 0,
                mainWithdraw: 0,
                subsWithdraw: 0
            }
        }
    }
*/
```
####  `6. recheckTx`
Using to check status of one Transaction in blockchain
__Params__
```javascript
uuid: string
```
__Return__
```javascript
{
    txid: string
    status: string
}
```
__Example__
```javascript
const recheckTxRes = await brickSDK.recheckTx("testTxId")
/*Success return example
    recheckTxRes{
        txid: "testTxId"
        status: "success"
    }
*/
```
####  `7. subAccountInfo`
Using to get infomation of subAccount
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
const subAccountInfoRes = await brickSDK.subAccountInfo("testSubAcc")
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
## Error 
There are two type of error that will be response
* SDK error
* Server response error

__SDK error__
* `API_KEY_MISSING`: missing API key when instantiate BrickSDK
* `PROVIDER_MISSING`: missing Provider when instantiate BrickSDK
* `PARAM_INVALID`: param not correct type or not support
* `PARAM_MISSING`: some param is missing

__Server response error__
This errors will start with `BM:` as prefix
Will be update soon ...
## Recent History

__1.1.18__
* add new method `subAccountInfo`

__1.1.16__
* improve `creditSubAcc`, `debitSubAcc`, `SubAccRequestWithDraw` make sure amount roundown before send request to Brick Master server

__1.1.15__
* add new method `recheckTxRes`

__1.1.2__
* fix some bugs

__1.1.0__
* add new method `MainAccountInfoGet`

__1.0.13__
* add more action choices

__1.0.12__
* export two types: `Transaction` and `SubAccount`

__1.0.9__
* remove some too old package

__1.0.8__
* update `README`

__1.0.7__
* first time deploy to npm