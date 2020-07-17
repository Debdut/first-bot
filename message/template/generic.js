const Template = require('./template')

// https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic

class Generic extends Template {
  constructor() {
    super('generic')
    this.message.attachment.payload.elements = []
  }

  addElement (image_url, title, subtitle, buttons, default_action) {
    const element = { image_url, title, subtitle, buttons, default_action }
    this.message.attachment.payload.elements
      .push(element)
  }
}

module.exports = () => new Generic()