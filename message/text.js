const Message = require('./message')

class Text extends Message {
  constructor (text) {
    super()
    this.message.text = text
  }
}

module.exports = (text) => new Text(text)