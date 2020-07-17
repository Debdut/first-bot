const Api = require('./api')
const config = require('../config')

// Personas API
// https://developers.facebook.com/docs/messenger-platform/reference/personas-api/

class Persona extends Api {
  constructor(url) {
    super(url)
  }

  get (id) {
    const fields = [ 'first_name', 'last_name', 'gender', 'locale', 'timezone' ]

    return this
      .fork()
      .go(id)
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .query({ fields })
      .get()
  }

  getAll () {
    return this
      .fork()
      .go('me/personas')
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .get()
  }

  delete (id) {
    return this
      .fork()
      .go(id)
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .delete()
  }

  create (name, profile_picture_url) {
    return this
      .fork()
      .go('me/personas')
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .post({ name, profile_picture_url })
  }
}

module.exports = Persona