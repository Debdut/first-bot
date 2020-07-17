const Api = require('./api')
const config = require('../config')

// Send API
// https://developers.facebook.com/docs/messenger-platform/reference/send-api

class Send extends Api {
  constructor(url) {
    super(url)
  }

  send (body) {
    return this
      .fork()
      .go('me/messages')
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .post(body)
  }
}

module.exports = Send