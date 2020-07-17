const Message = require('./message')

class Attachment extends Message {
  constructor (type, url, is_reusable) {
    this.message = {
      attachment: {
        type,
        payload: {
          is_reusable,
          url
        }
      }
    }
  }
}

module.exports = (type, url, is_reusable) => new Attachment(type, url, is_reusable)
