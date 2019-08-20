const axios = require('axios')
const config = require('../config.js')
const Const = require('./const')
const { OrderStatus } = Const

module.exports = async (order) => {
  let response = {}
  let result = {}

  let headers = {
    'content-type': 'application/json'
  }

  let requestHead = {
    appName: config.appName,
    appVer: config.appVersion,
    key: config.key,
    osName: config.orderChannel,
    requestCode: config.api.orderStatus.requestCode,
    userId: config.userId,
    password: config.password
  }

  let requestBody = {
    ClientCode: config.clientCode,
    OrdStatusReqList: [
      {
        Exch: config.trading.exchange,
        ExchType: config.trading.exchangeSegment,
        ScripCode: config.trading.scripCode
      }
    ]
  }

  const { RemoteOrderID = '' } = order || {}

  requestBody.OrdStatusReqList[0].RemoteOrderID =
    RemoteOrderID || config.lastRemoteOrderID

  try {
    response = await axios({
      method: 'post',
      url: config.api.orderStatus.url,
      headers,
      data: {
        head: requestHead,
        body: requestBody
      }
    })

    result = response.data && response.data.body

    if (
      result &&
      Array.isArray(result.OrdStatusResLst) &&
      result.OrdStatusResLst.length > 0
    ) {
      result = result.OrdStatusResLst[0]

      if (result) {
        const { OrderQty, PendingQty, TradedQty } = result

        if (TradedQty === OrderQty) {
          result = OrderStatus.FILLED
        } else if (PendingQty > 0 && TradedQty > 0) {
          result = OrderStatus.PARTIALLY_FILLED
        } else if (PendingQty > 0 && TradedQty === 0) {
          result = OrderStatus.PENDING
        } else {
          result = OrderStatus.INVALID
        }
      } else {
        result = OrderStatus.INVALID
      }
    } else {
      result = OrderStatus.INVALID
    }

    // console.log(response.data)
    // console.log(JSON.stringify(response.data, null, 2))
  } catch (error) {
    console.log('ERROR')
    console.log(error)
    result = {}
  } finally {
    return result
  }
}
