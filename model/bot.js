const Uuid = require('uuid')

const { pick } = require('../util')
const Model = require('./model')
const db = require('../db')

/*
user object { 
  title
  description
  image_url
  messenger_url
  [name]
  [email]
  [website]
  [phone]
  upvotes
}
*/
class Bot extends Model {
  constructor(user, purpose) {
    super('bot', purpose)
    if (user) {
      pick(user, [ 'title', 'description', 'image_url', 'messenger_url', 'name', 'email', 'website', 'phone', 'category' ], this, true)
      this.id = Uuid.v4()
      this.upvotes = 0
    }
  }

  top (n = 3) {
    const bots = db
      .get('bots')
      .sortBy('upvotes')
      .take(n)
      .value()
    return bots
  }

  random (n = 3) {
    const bots = db
      .get('bots')
      .sortBy(() => Math.random())
      .take(n)
      .value()

    return bots
  }

  upvote(id) {
    const upvotes = db
      .get('bots')
      .find({ id })
      .upvotes

    db.get('bots')
      .find({ id })
      .assign({ upvotes: upvotes + 1 })
      .write()
  }

  byCategory (category, n = 3) {
    const bots = db
      .get('bots')
      .find({ category })
      .take(n)
      .value()

    return bots
  }
}

module.exports = Bot