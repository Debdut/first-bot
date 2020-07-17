const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db/index.json')
const db = low(adapter)

db.defaults({ bots: [], users: [], bot_count: 0, user_count: 0 })
  .write()

module.exports = db