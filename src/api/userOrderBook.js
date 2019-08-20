const axios = require('axios')
const config = require('../config.js')
const Const = require('./const')

module.exports = async () => {
  if (!config.isLogged) {
    await require('./authenticate')()
  }

  let result = {}

  let headers = {
    Cookie: config.auth.cookie,
    'content-type': 'application/json'
  }

  let requestHead = {
    appName: config.appName,
    appVer: config.appVersion,
    key: config.key,
    osName: config.orderChannel,
    requestCode: config.api.userOrderBook.requestCode,
    userId: config.userId,
    password: config.password
  }

  let requestBody = {
    ClientCode: config.clientCode
  }

  let response = {}

  try {
    response = await axios({
      method: 'post',
      url: config.api.userOrderBook.url,
      headers,
      data: {
        head: requestHead,
        body: requestBody
      }
    })

    console.log(JSON.stringify(response.data, null, 2))
  } catch (error) {
    console.log('ERROR')
    console.log(error)
  }
}
