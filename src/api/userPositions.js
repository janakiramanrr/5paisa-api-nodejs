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
    'Content-Type': 'application/json'
  }

  let requestHead = {
    appName: config.appName,
    appVer: config.appVersion,
    key: config.key,
    osName: config.orderChannel,
    requestCode: config.api.userPositions.requestCode,
    userId: config.userId,
    password: config.password
  }

  let requestBody = {
    ClientCode: config.clientCode
    // RequestNo: '11',
    // ConnectionType: '1'
  }

  let response = {}

  try {
    response = await axios({
      method: 'post',
      url: config.api.userPositions.url,
      headers,
      data: {
        head: requestHead,
        body: requestBody
      }
      // withCredentials: true
    })
    console.log('=== REQUEST ===')
    console.log(
      JSON.stringify(
        {
          head: requestHead,
          body: requestBody
        },
        null,
        2
      )
    )
    console.log()

    console.log('=== RESPONSE ===')
    console.log(JSON.stringify(response.data, null, 2))
    console.log()
    result = response.data
  } catch (error) {
    result = {}
    console.log('ERROR')
    console.log(error)
  } finally {
    return result
  }
}
