const Api = require('./api')
const config = require('../config')

// Subscriptions API
// https://developers.facebook.com/docs/graph-api/reference/v7.0/app/subscriptions

class Subscriptions extends Api {
  constructor(url) {
    super(url)
  }

  get (id) {
    return this
      .fork()
      .go(config.APP_ID)
      .go('subscriptions')
      .query({ access_token: `${config.APP_ID}|${config.APP_SECRET}` })
      .get()
  }

  set (customFields = []) {
    const fields = [ 'messages', 'messaging_postbacks', 'messaging_optins', 'message_deliveries', 'messaging_referrals', ...customFields ]

    return this
      .fork()
      .go(config.APP_ID)
      .go('subscriptions')
      .query({ access_token: `${config.APP_ID}|${config.APP_SECRET}` })
      .query({ object: page })
      .query({ callback_url: config.webhookUrl })
      .query({ verify_token: config.VERIFY_TOKEN })
      .query({ fields })
      .query({ include_values: true })
      .post()
  }
}

module.exports = Subscriptions