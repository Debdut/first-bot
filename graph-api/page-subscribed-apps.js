const Api = require('./api')
const config = require('../config')

// Page Subscribed Apps API
// https://developers.facebook.com/docs/graph-api/reference/page/subscribed_apps/

class PageSubscribedApps extends Api {
  constructor(url) {
    super(url)
  }

  get () {
    return this
      .fork()
      .go(config.PAGE_ID)
      .go('subscribed_apps')
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .get()
  }

  set (customFields = []) {
    const fields = [ 'messages', 'messaging_postbacks', 'messaging_optins', 'message_deliveries', 'messaging_referrals', ...customFields ]

    return this
      .fork()
      .go(config.PAGE_ID)
      .go('subscribed_apps')
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .query({ subscribed_field: fields })
      .post()
  }

  delete () {
    return this
      .fork()
      .go(config.PAGE_ID)
      .go('subscribed_apps')
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .delete()
  }
}

module.exports = PageSubscribedApps