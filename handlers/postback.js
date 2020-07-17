const { Text } = require('../message')
const config = require('./config')
const 

const handlePostback = (id, postback) => Handler[postback](id)
const Handler = {}

Handler['GET_STARTED'] = (id) => {
  const recipient = { id }
  const text = `Hi `
}

module.exports = handlePostback