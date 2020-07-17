const Message = require('../message')

class Template extends Message {
  constructor (template_type) {
    this.message = {
      attachment: {
        type: 'template',
        payload: {
          template_type
        }
      }
    }
  }
}

module.exports = Template