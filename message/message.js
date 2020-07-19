const config = require('../config')
const GraphApi = require('../graph-api')(config)
const { removeNull } = require('../util')

class Message {
  constructor(messaging_type) {
    this.messaging_type = messaging_type
    this.message = {}
  }

  send (recipient) {
    let body = {
      recipient,
      messaging_type: this.messaging_type,
      message: this.message
    }
    body = removeNull(body)
    return GraphApi.Send.send(body)
  }

  addQuickReply (content_type, title, payload, image_url) {
    if (!this.message.quick_replies) {
      this.message.quick_replies = []
    }
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

module.exports = Message