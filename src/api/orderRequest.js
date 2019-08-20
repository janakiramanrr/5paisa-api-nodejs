const axios = require('axios')
const config = require('../config.js')
const Const = require('./const')
const randomNumericId = require('randomatic')

const orderDateTime = () => {
  let gmtPlus0000Time = new Date(new Date(Date.now()).toUTCString()).getTime()

  return Date.now()
}

const validTillDate = () => {
  let date = new Date()
  date = new Date(date.setDate(date.getDate() + 7)).getTime()

  return date
}

module.exports = async (order) => {
  if (!config.isLogged) {
    await require('./authenticate')()
  }

  let result = {}
  let response = {}
  const incrementalOrderId = config.incrementalOrderId

  let headers = {
    Cookie: `${config.auth.cookie}`,
    'content-type': 'application/json; charset=utf-8'
  }

  let requestHead = {
    appName: config.appName,
    appVer: config.appVersion,
    key: config.key,
    osName: config.orderChannel,
    requestCode: config.api.orderRequest.requestCode,
    userId: config.userId,
    password: config.password
  }

  let OrderDateTime = `/Date(${orderDateTime()}+0530)/`

  let requestBody = {
    ClientCode: config.clientCode,
    Exchange: config.trading.exchange,
    ExchangeType: config.trading.exchangeSegment,
    OrderID: incrementalOrderId,
    OrderDateTime,
    ScripCode: config.trading.scripCode,
    AtMarket: false,
    RemoteOrderID: randomNumericId('0', 20),
    ExchOrderID: '0',
    DisQty: 0,
    IsStopLossOrder: false,
    StopLossPrice: 0,
    IsVTD: false,
    IOCOrder: false,
    IsIntraday: config.trading.IsIntraday,
    PublicIP: config.server.PublicIP,
    AHPlaced: 'N',
    ValidTillDate: `/Date(${validTillDate()}+0530)/`,
    iOrderValidity: Const.iOrderValidity.Day,
    TradedQty: 0,
    OrderRequesterCode: config.clientCode,
    AppSource: config.appSource
  }

  requestBody = Object.assign(requestBody, order)

  if (requestBody.OrderFor === Const.OrderFor.Cancel) {
    const { lastExchOrderID, lastTradedQty } = config

    requestBody = Object.assign(requestBody, {
      ExchOrderID: lastExchOrderID,
      TradedQty: lastTradedQty
    })
  } else if (requestBody.OrderFor === Const.OrderFor.Place) {
    const { lastExchOrderID, lastTradedQty } = config

    requestBody = Object.assign(requestBody, {
      TradedQty: 0
    })
  }
  // console.log(requestBody)
  try {
    response = await axios({
      method: 'post',
      url: config.api.orderRequest.url,
      headers,
      data: {
        head: requestHead,
        body: requestBody
      }
    })

    result = response.data && response.data.body

    if (result.RMSResponseCode === 0) {
      // success
      config.lastRemoteOrderID = requestBody.RemoteOrderID
    } else {
      config.lastRemoteOrderID = '0'
    }
  } catch (error) {
    console.log('ORDER REQUEST ERROR')
    console.log(error.message)
    console.log(error)
  } finally {
    config.incrementalOrderId = incrementalOrderId + 1

    return result
  }
}
