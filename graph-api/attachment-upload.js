const Api = require('./api')
const config = require('../config')

// Attachment Upload API
// https://developers.facebook.com/docs/messenger-platform/reference/attachment-upload-api

class AttachmentUpload extends Api {
  constructor(url) {
    super(url)
  }

  send (body) {
    return this
      .fork()
      .go('me/message_attachments')
      .query({ access_token: config.PAGE_ACCESS_TOKEN })
      .post(body)
  }
}

module.exports = AttachmentUpload