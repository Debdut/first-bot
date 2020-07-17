const Template = require('./template')

// https://developers.facebook.com/docs/messenger-platform/send-messages/template/button

class Button extends Template {
  constructor (text, buttons) {
    super('button')
    this.message.attachment.payload = {
      text,
      buttons
    }
  }
}

module.exports = (text, buttons) => new Button(text, buttons)