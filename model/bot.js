const Uuid = require('uuid')

const { pick } = require('../util')
const Model = require('./model')

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
}
*/
class Bot extends Model {
  constructor(user) {
    super('bot')
    pick(user, [ 'title', 'description', 'image_url', 'messenger_url', 'name', 'email', 'website', 'phone' ], this, true)
    this.id = Uuid.v4()
  }
}

module.exports = Bot