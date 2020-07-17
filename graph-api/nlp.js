const Api = require('./api')
const config = require('../config')

// NLP API
// https://developers.facebook.com/docs/messenger-platform/built-in-nlp/

class NLP extends Api {
  constructor(url) {
    super(url)
  }

  set () {
    return this
      .fork()
      .go('me/nlp_configs')
      .query({ access_token: config.PAGE_ACCESS_TOKEN, nlp_enabled: true })
      .post()
  }
}

module.exports = NLP