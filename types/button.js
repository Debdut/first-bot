class Button {
  constructor (type) {
    this.type = type
  }
}

class Url extends Button {
  constructor (title, url) {
    super('web_url')
    this.title = title
    this.url = url
  }
}

class Postback extends Button {
  constructor (title, payload) {
    super('postback')
    this.title = title
    this.payload = payload
  }
}

class Call extends Button {
  constructor (title, phone) {
    super('phone_number')
    this.title = title
    this.payload = phone
  }
}

class LogIn extends Button {
  constructor (url) {
    super('account_link')
    this.url = url
  }
}

class LogOut extends Button {
  constructor () {
    super('account_unlink')
  }
}

class Game extends Button {
  constructor (title, payload, player_id, context_id) {
    super('game_play')
    this.title = title
    this.payload = payload
    if (player_id) {
      this.game_metadata = { player_id }
    } else if (context_id) {
      this.game_metadata = { context_id }
    }
  }
}

module.exports = { Url, Postback, Call, LogIn, LogOut, Game }