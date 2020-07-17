const Api = require('./api')
const config = require('../config')
const { stringifyProps } = require('../util')

// App Events API
// https://developers.facebook.com/docs/marketing-api/app-event-api/

class AppEvent extends Api {
  constructor(url) {
    super(url)
  }

  send (sender_psid, eventName) {
    const body = stringifyProps({ 
      event: 'CUSTOM_APP_EVENTS',
      custom_events: [{ _eventName: 'postback_payload', _value: eventName, _origin: config.APP_NAME }],
      advertiser_tracking_enabled: 0,
      application_tracking_enabled: 0,
      extinfo: [ 'mb1' ],
      page_id: config.PAGE_ID,
      page_scoped_user_id: sender_psid
    })

    return this
      .fork()
      .go(config.APP_ID)
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .post(body)
  }
}

module.exports = AppEvent