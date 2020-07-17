const Api = require('./api')
const config = require('../config')
const { stringifyProps } = require('../util')

// Messenger Profile API
// https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/

class MessengerProfile extends Api {
  constructor(url) {
    super(url)
    this.base = this
      .fork()
      .go('me/messenger_profile')
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
    this.profile = {}
  }

  get (id) {
    const fields = [ 'get_started', 'greeting', 'ice_breakers', 'persistent_menu', 'whitelisted_domains', 'account_linking_url', 'home_url']

    return this.base
      .fork()  
      .query({ fields })
      .get()
  }

  set () {
    const body = stringifyProps(this.profile)
    // console.log(body)

    return this.base
      .fork()
      .post(body)
  }

  delete (fields) {
    const body = { fields }
    return this.base
      .fork()
      .post(body)
  }

  setGetStarted (payload = 'GET_STARTED') {
    this.profile.get_started = { payload }
  }

  setGreeting (greetings = []) {
    this.profile.greeting = greetings
  }

  setPersistentMenu (menu = []) {
    this.profile.persistent_menu = menu
  }
}

module.exports = MessengerProfile