const { Text, QuickReply, Template } = require('../message')
const config = require('../config')
const User = require('../model/user')
const Bot = require('../model/bot')
const Button = require('../types/button')
const GraphApi = require('../graph-api')(config)

const UserProfile = GraphApi.UserProfile

const handlePostback = (id, postback) => {
  const { payload } = postback
  const handler = Handler[payload]
  if (handler) {
    handler(id)
  }
}

const Handler = {}

const delay = (t) => new Promise(resolve => setTimeout(resolve, t))

Handler['GET_STARTED'] = async (id) => {
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

  await QuickReplyMenu(recipient, 'Please choose an action')
}

const BotsFunc = (func) => async (id) => {
  const recipient = { id }
  const bots = (new Bot(null, 'search'))[func]()
  const message = Template.Generic()
  bots.forEach(bot => message
    .addElement(bot.image_url, bot.title, bot.description, [
      new Button.Url('Use Bot', bot.messenger_url),
      new Button.Postback('Upvote', `UPVOTE_BOT_${id}`)
    ])
  )
  addQuickReplyMenu(message)
  await message.send(recipient)
}

const QuickReplyMenu = async (recipient, text) => {
  let quick = QuickReply(text)
  addQuickReplyMenu(quick)
  await quick.send(recipient)
}

const addQuickReplyMenu = (message) => {
  message.addQuickReply('text', 'Top Bots', 'QUICK_REPLY_TOP_BOTS')
  message.addQuickReply('text', 'Random', 'QUICK_REPLY_RANDOM')
  message.addQuickReply('text', 'Search', 'QUICK_REPLY_SEARCH')
  message.addQuickReply('text', 'Categories', 'QUICK_REPLY_CATEGORIES')
  message.addQuickReply('text', 'Feedback', 'QUICK_REPLY_FEEDBACK')
}

const Categories = async (id) => {
  let quick = QuickReply('Choose a category')
  const categories = ['App', 'Ecommerce', 'Game', 'Search', 'Retail', 'Utility']
  categories.forEach(category => quick.addQuickReply('text', category, `CATEGORY_${category}`))
  await quick.send({ id })
}

Handler['PERSISTENT_MENU_TOP_BOTS'] = BotsFunc('top')
Handler['QUICK_REPLY_TOP_BOTS'] = BotsFunc('top')
Handler['QUICK_REPLY_RANDOM'] = BotsFunc('random')

Handler['PERSISTENT_MENU_MENU'] = (id) => QuickReplyMenu({ id }, 'Choose an action')

Handler['QUICK_REPLY_CATEGORIES'] = Categories
Handler['PERSISTENT_MENU_CATEGORIES'] = Categories

module.exports = handlePostback