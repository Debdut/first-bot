const { Text, QuickReply } = require('../message')
const config = require('../config')
const User = require('../model/user')
const GraphApi = require('../graph-api')(config)

const UserProfile = GraphApi.UserProfile

const handlePostback = (id, postback) => {
  const handler = Handler[postback.payload]
  if (handler) {
    handler(id)
  }
}

const Handler = {}

const delay = (t) => new Promise(resolve => setTimeout(resolve, t))

Handler['PERSISTENT_MENU_TOP_BOTS'] = async (id) => {
  const recipient = { id }
  const response = await UserProfile.get(id)
  const user = new User(response)
  user.write()

  let texts = [ `Hi ${user.first_name}! Meet ${config.APP_NAME}: ${config.APP_DESCRIPTION} 🤖`, 'I am a bot who helps you to find other bots 🤖🤖🤖', 'I can send Top Bots at your service daily so that you can just chill and netflix 😎' ]

  for (let index = 0; index < texts.length; index++) {
    const text = texts[index]
    const message = Text(text)
    await message.send(recipient)
    await delay(500)
  }

  let quick = QuickReply('Please choose an action')
  quick.addQuickReply('text', 'Top Bots', 'QUICK_REPLY_TOP_BOTS')
  quick.addQuickReply('text', 'Random', 'QUICK_REPLY_RANDOM')
  quick.addQuickReply('text', 'Search', 'QUICK_REPLY_SEARCH')
  quick.addQuickReply('text', 'Categories', 'QUICK_REPLY_CATEGORIES')
  quick.addQuickReply('text', 'Feedback', 'QUICK_REPLY_FEEDBACK')
  await quick.send(recipient)
}

module.exports = handlePostback