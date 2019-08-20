const axios = require('axios')
const config = require('../config.js')
const Const = require('./const')

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
  ClientCode: config.clientCode
}

module.exports = async () => {
  let response = {}

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

    console.log(response.data)
  } catch (error) {
    console.log('ERROR')
    console.log(error)
  }
}
