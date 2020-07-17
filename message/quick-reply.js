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


  addQuickReply (content_type, title, payload, image_url) {
    this.message.quick_replies
      .push({ content_type, title, payload, image_url })
  }

  setlocationReply () {
    this.message.quick_replies = [{ content_type: 'location' }]
  }

  setPhoneReply () {
    this.message.quick_replies = [{ content_type: 'user_phone_number' }]
  }

  setEmailReply () {
    this.message.quick_replies = [{ content_type: 'user_email' }]
  }
}

module.exports = (text, attachment) => new QuickReply(text, attachment) 