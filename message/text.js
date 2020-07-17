const Message = require('./message')

class Text extends Message {
  constructor (text) {
    this.message = { text }
  }
}

module.exports = (text) => new Text(text)