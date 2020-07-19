const Message = require('./message')

// https://developers.facebook.com/docs/messenger-platform/reference/buttons/quick-replies

class QuickReply extends Message {
  constructor (text, attachment) {
    super('RESPONSE')
    this.message = {
      text,
      attachment,
      quick_replies: []
    }
  }
}

module.exports = (text, attachment) => new QuickReply(text, attachment) 