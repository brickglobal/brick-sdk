# Brick Master SDK

A JavaScript SDK for interact with Brick Master server

[![npm version](https://img.shields.io/npm/v/@brickglobal/brick-sdk?style=plastic)](https://www.npmjs.com/package/@brickglobal/brick-sdk)
[![npm downloads](https://img.shields.io/npm/dw/@brickglobal/brick-sdk?style=plastic)](https://www.npmjs.com/package/@brickglobal/brick-sdk)

## Features

##### Version 1:
- Create sub account 
- Debit / Credit / RequestWithdraw for sub account
- Check main account information
- Check sub account information
- recheck TransactionID
- Support `TRC20`

##### Version 2:
- Get enterprise address
- Get customer balance
- Exchange customer's assets
- Withdraw customer's assets
- Change balance customer's asset
- Transfer asset
- Get transaction customer history

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

// For using v2 BrickMaster method
const brickSDKv2 = new BrickSDK({ 
    apiKey: "EK5R6MF-8VJMSZT-*******-*******", 
    provider: "http://example-host:xxxx/" 
}).v2

```
## Methods
There are total 15 methods:

##### Version 1:

1. createSubAcc
2. debitSubAcc
3. creditSubAcc
4. SubAccRequestWithDraw
5. MainAccountInfoGet
6. recheckTx
7. subAccountInfo
8. getAllAccountBalance

##### Version 2:

9. customerBalanceGet
10. customerWithdraw
11. customerTransfer
12. customerExchange
13. customerChangeBalance
14. enterpriseAddressGet
15. logCustomerHistoryGet

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
####  `8. getAllAccountBalance`
Using to get balance of all subAccount 
__Params__
```javascript
// no prams required
```
__Return__
```javascript
{
    eur:number,
    usdt_trc20:number,
}
```
__Example__
```javascript
const getAllAccountBalanceRes = await brickSDK.getAllAccountBalance()
/*Success return example
    {
        eur:number,
        usdt_trc20:number,
    }
*/
```
####  `9. customerBalanceGet`
Using to get balance of customer
__Params__

| Parameter  | Description  | Data Type |
| :------------ |:---------------:| -----:|
| customer_id |id of customer|string|

```javascript
{
    customer_id: String
}
```
__Return__
```javascript
{
    asset_id: Number
    balance: Number
} []
```
__Example__
```javascript
const getBalance = await brickSDKv2.customerBalanceGet("user_id_example")
/*Success return example
    [ 
        { 
            asset_id: 0, 
            balance: 310000000 
        }
    ]
*/
```
####  `10. customerWithdraw`
Using to withdraw customer's asset
__Params__
| Parameter  | Description  | Data Type |
| :------------ |:---------------:| -----:|
| customer_id |id of customer|string|
|asset_id|id of asset|number|
|amount|withdraw amount|number (interger and must be > 0)|
|req_id|request id|string unique|
|req_time|send request time|timestamp in miliseconds|
|address |receiver address|(optional) Hex string|


```javascript
{
    customer_id: String,
    asset_id: Number,
    amount: Number,
    req_id: String,
    req_time: Number,
    address?: String
}
```
__Return__
```javascript
{
    _id: String
    req_id: String
    ref_id: String
    customer_id: String
    enterprise_id: String
    asset_id: Number
    amount: Number
    fee_enterprise: Number
    txid: String
    req_time: Date
    create_date: Date
    status: Number
    action: String
}
```
__Example__
```javascript
const withdraw = await brickSDKv2.customerWithdraw("customer_id_example", 0, 10000000, "req_id_example", 1632283453575,"TKVSaJQDWeKFSEXmA44pjx***duGTxyX***")
/*Success return example
    {
        "data": {
            "sdk_customer_withdraw": {
            "_id": "614b0ba748ae090012b331c5",
            "req_id": "req_id_example",
            "ref_id": "359222f9-5c2f-4b8c-84c8-171309045c0f",
            "customer_id": "customer_id_example",
            "enterprise_id": "example_enterprise",
            "asset_id": 0,
            "amount": -10000000,
            "fee_enterprise": 9000000,
            "txid": "fb0d0c8b8c9554206537ee2ff75111758851586070352fc32c7d12e621e00e06",
            "create_date": "2021-09-22T10:55:35.709Z",
            "status": 1,
            "action": "withdraw"
            }
        }
    }
*/
```
####  `11. customerTransfer`
Using to transfer from one customer's asset to another customer
__Params__
| Parameter  | Description  | Data Type |
| :------------ |:---------------:| -----:|
|sender_id|to id|string|
|receiver_id|from id|string|
|asset_id|id of asset|number|
|amount|transfer amount|number (interger and must be > 0)|
|req_id|request id|string unique|
|req_time|send request time|timestamp in miliseconds|
|receiver_enterprise_id|id enterprise receiver|(optional) string|
|action |major|(optional) string|

```javascript
{
    sender_id: String,
    receiver_id:String,
    asset_id: Number,
    amount: Number,
    req_id: String,
    req_time: Number,
    receiver_enterprise_id?: String,
    action?: String
}
```
__Return__
```javascript
// Array has two items
{
    _id: String
    req_id: String
    ref_id: String
    customer_id: String
    enterprise_id: String
    asset_id: Number
    amount: Number
    fee_enterprise: Number
    txid: String
    req_time: Date
    create_date: Date
    status: Number
    action: String
}[]
```
__Example__
```javascript
const transfer = await brickSDKv2.customerTransfer("sender_id_example", "receiver_id_example", 0, 10000000, "req_id_example", 1632283453575, "action_example")
/*Success return example
    {
  "data": {
    "sdk_customer_transfer": [
      {
        "_id": "614b0d0448ae090012b331c6",
        "req_id": "req_id_example",
        "ref_id": "ef3873cb-4644-417c-8adb-eab439fa5b11",
        "req_time": "2021-09-22T04:04:13.575Z",
        "customer_id": "sender_id_example",
        "enterprise_id": "example_enterprise",
        "asset_id": 0,
        "amount": -10000000,
        "fee_enterprise": 115000,
        "txid": null,
        "create_date": "2021-09-22T11:01:24.919Z",
        "status": 0,
        "action": "action_example"
      },
      {
        "_id": "614b0d0448ae090012b331c7",
        "req_id": "req_id_example",
        "ref_id": "ef3873cb-4644-417c-8adb-eab439fa5b11",
        "req_time": "2021-09-22T04:04:13.575Z",
        "customer_id": "receiver_id_example",
        "enterprise_id": "example_enterprise",
        "asset_id": 0,
        "amount": 9885000,
        "fee_enterprise": 0,
        "txid": null,
        "create_date": "2021-09-22T11:01:24.919Z",
        "status": 0,
        "action": "action_example"
      }
    ]
  }
}
*/
```
####  `12. customerExchange`
Using to exchange from one asset class to another of customer
__Params__
| Parameter  | Description  | Data Type |
| :------------ |:---------------:| -----:|
|customer_id|id of customer|string|
|from_asset_id|from id of asset|interger number|
|to_asset_id|to id of asset|interger number|
|from_amount|from amount|number (interger and must be > 0)|
|to_amount|request id|number (interger and must be > 0|
|req_id|request id|string unique|
|req_time|send request time|timestamp in miliseconds|
|action |major|(optional) string|

```javascript
{
    customer_id: String,
    from_asset_id: Number,
    to_asset_id: Number,
    from_amount: Number,
    to_amount: Number,
    req_id: String,
    req_time: Number,
    action?: String
}
```
__Return__
```javascript
// Array has two items
{
    _id: String
    req_id: String
    ref_id: String
    customer_id: String
    enterprise_id: String
    asset_id: Number
    amount: Number
    fee_enterprise: Number
    txid: String
    req_time: Date
    create_date: Date
    status: Number
    action: String
}[]
```
__Example__
```javascript
const data = await brickSDKv2.customerExchange("customer_id_example", 0, 1, 10000000, 10000000, "req_id_example",1632283453575, "action_example")
/*Success return example
    {
  "data": {
    "sdk_customer_exchange": [
      {
        "_id": "614b113e48ae090012b331c8",
        "req_id": "req_id_example",
        "ref_id": "d03d8adc-795c-4638-af01-5ac6a1310d16",
        "req_time": "2021-09-22T04:04:13.575Z",
        "customer_id": "customer_id_example",
        "enterprise_id": "example_enterprise",
        "asset_id": 0,
        "amount": -1000000,
        "fee_enterprise": 0,
        "txid": null,
        "create_date": "2021-09-22T11:19:26.717Z",
        "status": 0,
        "action": "action_example"
      },
      {
        "_id": "614b113e48ae090012b331c9",
        "req_id": "req_id_example",
        "ref_id": "d03d8adc-795c-4638-af01-5ac6a1310d16",
        "req_time": "2021-09-22T04:04:13.575Z",
        "customer_id": "customer_id_example",
        "enterprise_id": "example_enterprise",
        "asset_id": 1,
        "amount": 10000000,
        "fee_enterprise": 0,
        "txid": null,
        "create_date": "2021-09-22T11:19:26.717Z",
        "status": 0,
        "action": "action_example"
      }
    ]
  }
}
*/
```
####  `13. customerChangeBalance`
Using to debit/credit balance of customer
__Params__
| Parameter  | Description  | Data Type |
| :------------ |:---------------:| -----:|
|customer_id|id of customer|string|
|asset_id|id of asset|interger number|
|amount|change balance amount|number (interger and must be != 0)|
|req_id|request id|string unique|
|req_time|send request time|timestamp in milliseconds|
|action |major|string|
|options |object| optional - require_amount (balance of user must be greater than require_amount) - number |

```javascript
{
    customer_id: String,
    asset_id: Number,
    amount: Number,
    req_id: String,
    req_time: Number,
    action: String,
    options?:{
        require_amount?:Number
    }
}
```
__Return__
```javascript
{
    _id: String
    req_id: String
    ref_id: String
    customer_id: String
    enterprise_id: String
    asset_id: Number
    amount: Number
    fee_enterprise: Number
    txid: String
    req_time: Date
    create_date: Date
    status: Number
    action: String
}
```
__Example__
```javascript
const data = await brickSDKv2.customerChangeBalance("customer_id_example", 0, 10000000, "req_id_example", 1632283453575, "action_example")
/*Success return example
    {
  "data": {
    "sdk_customer_change_balance": {
      "_id": "614b12ec48ae090012b331ca",
      "req_id": "req_id_example",
      "ref_id": "5b16bf8b-5a80-4f49-83f2-9db8ba1de0ae",
      "req_time": "2021-09-22T04:04:13.575Z",
      "customer_id": "customer_id_example",
      "enterprise_id": "example_enterprise",
      "asset_id": 0,
      "amount": 10000000,
      "fee_enterprise": 0,
      "txid": null,
      "create_date": "2021-09-22T11:26:36.752Z",
      "status": 0,
      "action": "action_example"
    }
  }
}
*/
```
####  `14. enterpriseAddressGet`
Using to get enterprise address
__Params__
| Parameter  | Description  | Data Type |
| :------------ |:---------------:| -----:|
|asset_id|id of asset|interger number|

```javascript
{
    asset_id: Number
}
```
__Return__
```javascript
> string
```
__Example__
```javascript
const data = await brickSDKv2.enterpriseAddressGet("asset_id_example")
/*Success return example
> TKVSaJQDWeKFSEXmA44pjxdu***GTxyXa***
*/
```
####  `15. logCustomerHistoryGet`
Using to get transaction customer historyGet
__Params__
| Parameter  | Description  | Data Type |
| :------------ |:---------------:| -----:|
|customer_id|id of customer|string|
|action|major|(optional) 'all' or null|
|sort|sort data|(optional) 'newest' or 'oldest' or null|
|pageNumber|number of page|(optional) interger number|
|pageSize|size of a page|(optional) interger number|

```javascript
{
    asset_id: String
    action?: 'all' | null
    sort?: 'newest' | 'oldest' | null
    pageNumber?: Number
    pageSize?: Number
}
```
__Return__
```javascript
{
    data: {
        _id: String
        req_id: String
        ref_id: String
        customer_id: String
        enterprise_id: String
        asset_id: Number
        amount: Number
        fee_enterprise: Number
        txid: String
        req_time: Date
        create_date: Date
        status: Number
        action: String
    }[],
    totalitems: Number
}
```
__Example__
```javascript
const data = await brickSDKv2.logCustomerHistoryGet("customer_id_example", 'all', null, 2, 20)
/*Success return example
    data: {
      _id: '614d347749d5d4001275cbbc',
      req_id: '21',
      ref_id: '6bfe1dec-7981-422b-ad77-4b2db7faf701',
      customer_id: 'customer_id_example',
      enterprise_id: 'example_enterprise',
      amount: -2000,
      fee_enterprise: 0,
      txid: null,
      create_date: '2021-09-24T02:14:15.268Z',
      status: 0,
      req_time: '2021-09-22T09:31:21.000Z',
      action: 'exchange'
    }[],
    totalItems: 1324
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

__2.1.2__

* add `options` params to method `customerChangeBalance`

__2.1.1__

* fix return type of method `customerBalanceGet`

__2.1.0__

* add new method `logCustomerHistoryGet`

__2.0.2__

* Leave `action` of method `customerWithdraw`
* `action` of method `customerChangeBalance` require

__2.0.1__

* integration with BrickMaster version 2
* add new five methods: `customerBalanceGet`, `customerWithdraw`, `customerTransfer`, `customerExchange`, `customerChangeBalance`, `enterpriseAddressGet`
* export type: `LogCustomerDetail`

__1.1.22__
* fix `subAccountInfo` cannot trigger

__1.1.21__
* update return type

__1.1.20__
* fix wrong Date type
* add new method `getAllAccountBalance`

__1.1.19__
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