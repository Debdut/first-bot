const Url = require('url-request')

class Api {
  constructor (url) {
    this.url = url
  }

  fork () {
    return this.url
      .fork()
  }
}

module.exports = Api