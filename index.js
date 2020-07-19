const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const { pickCheck } = require('./util')
const Bot = require('./model/bot')
const Handler = require('./handlers')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res
  .status(200)
  .send('Hi There')
})

app.get(config.WEBHOOK, (req, res) => {
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (mode && token) {
    if (mode === 'subscribe' && token === config.VERIFY_TOKEN) {
      console.log('Webhook Verified')
      res
        .status(200)
        .send(challenge)
    } else {
      res
        .sendStatus(403)
    }
  }
})

app.post(config.WEBHOOK, (req, res) => {
  let body = req.body
  
  if (body.object === 'page') {
    body.entry.forEach(entry => {
      const webhookEvent = entry.messaging[0]
      const senderId = webhookEvent.sender.id
      if (webhookEvent.message) {
        if (webhookEvent.message.quick_reply) {
          Handler.Postback(senderId, webhookEvent.message.quick_reply)
        } else {
          Handler.Message(senderId, webhookEvent.message)
        }

      } else if (webhookEvent.postback) {
        Handler.Postback(senderId, webhookEvent.postback)
      }
    })
    res
      .status(200)
      .send('EVENT_RECEIVED')
  } else {
    res.sendStatus(404)
  }
})

app.get('/app-link/:id', (req, res) => {
  const messenger_id = req.params.id
  res.redirect(`https://m.me/${messenger_id}`)
})

app.post('/bot', async (req, res) => {
  let body = req.body
  let bot = pickCheck(body, ['title', 'description', 'image_url', 'messenger_url', 'category'], ['website', 'email', 'name', 'phone'])
  if (bot) {
    bot = new Bot(bot)
    try {
      await bot.write()
    } catch (error) {
      res
        .status(500)
        .send('SERVER ERROR! TRY IN SOME TIME')
      return
    }
    res
      .status(200)
      .json({ success: true, id: bot.id })
  } else {
    res
      .status(403)
      .send('INCORRECT SCHEMA')
  }
})

app.listen(config.PORT, () => {
  console.log(`Listening at port ${config.PORT}`)
})