const Api = require('./api')
const config = require('../config')

// User Profile API
// https://developers.facebook.com/docs/messenger-platform/identity/user-profile

class UserProfile extends Api {
  constructor(url) {
    super(url)
  }

  get (id, fields = [ 'id', 'first_name', 'last_name', 'profile_pic', 'gender', 'locale', 'timezone' ]) {

    return this
      .fork()
      .go(id)
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .query({ fields })
      .get()
  }
}

module.exports = UserProfile