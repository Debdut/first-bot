const db = require('../db')

class Model  {
  constructor (type) {
    this.__proto__.type = type
  }

  write() {
    db.get(`${this.__proto__.type}s`)
      .push(this)
      .write()
    db.update(`${this.__proto__.type}_count`, n => n+1)
      .write()
  }
}

module.exports = Model