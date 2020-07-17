const Template = require('./template')

// https://developers.facebook.com/docs/messenger-platform/send-messages/template/media

class Media extends Template {
  constructor (media_type, attachment_url, buttons, sharable =  false) {
    super('media')
    const elements = [{ media_type, attachment_url }]
    this.message.attachment.payload = { elements, sharable, buttons }
  }
}

module.exports = (media_type, attachment_url, buttons, sharable = false) => new Media(media_type, attachment_url, buttons, sharable)