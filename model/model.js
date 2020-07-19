const db = require('../db')

class Model  {
  constructor (type, purpose) {
    this.__proto__.type = type
    if (purpose) {
      this.__proto__.purpose = purpose
    }
  }

  write() {
    if (!this.__proto__.purpose) {
      db.get(`${this.__proto__.type}s`)
        .push(this)
        .write()
      db.update(`${this.__proto__.type}_count`, n => n+1)
        .write()
    }
  }
}

module.exports = Model