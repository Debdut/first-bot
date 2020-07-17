const Uuid = require('uuid')

const { pick } = require('../util')
const Model = require('./model')

/*
user object { 
  first_name
  last_name
  gender
  locale
  timezone
  id
  profile_pic
  phone
  email
}
*/
class User extends Model {
  constructor(user) {
    super('users')
    pick(user, [ 'first_name', 'last_name', 'gender', 'locale', 'timezone', 'id', 'profile_pic', 'phone', 'email' ], this, true)

    this.messenger_id = this.id
    this.id = Uuid.v4()
  }
}

const user = new User({ first_name: 'Debdut', last_name: 'Karmakar', gender: 'male', locale: 'en-US', timezone: -5, id: 28123, profile_pic: null, lazy: true })

user.write()