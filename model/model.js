const db = require('../db')

class Model  {
  constructor (type) {
    this.__proto__.type = type
  }

  write() {
    db.get(this.__proto__.type)
      .push(this)
      .write()
  }
}

module.exports = Model