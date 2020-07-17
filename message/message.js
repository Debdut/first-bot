const GraphApi = require('../graph-api')

class Message {
  constructor(messaging_type) {
    this.messaging_type = messaging_type
  }
  
  get message() {
    return this.message
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
}

module.exports = Message