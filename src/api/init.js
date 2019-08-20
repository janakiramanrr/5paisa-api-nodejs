const config = require('../config')

module.exports = (params) => {
  for (const key in params) {
    config[key] = params[key]
  }
}
