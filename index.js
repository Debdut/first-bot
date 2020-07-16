const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const config = require('./config')
// const { handleMessage, handlePostback } = require('./handlers')

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

      console.log(`Sender PSID - ${senderId}`)

      if (webhookEvent.message) {
        handleMessage(senderId, webhookEvent.message)
      } else if (webhookEvent.postback) {
        handlePostback(senderId, webhookEvent.postback)
      }
    })
    res
      .status(200)
      .send('EVENT_RECEIVED')
  } else {
    res.sendStatus(404)
  }
})

app.listen(config.PORT, () => {
  console.log(`Listening at port ${config.PORT}`)
})

function handleMessage (id, message) {
  console.log(id, message)
}

function handlePostback (id, postback) {
  console.log(id, postback)
}