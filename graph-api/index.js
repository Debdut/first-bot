const Url = require('url-request')

const AppEvent = require('./app-event')
const AttachmentUpload = require('./attachment-upload')
const MessengerProfile = require('./messenger-profile')
const NLP = require('./nlp')
const PageSubscribedApps = require('./page-subscribed-apps')
const Persona = require('./persona')
const Send = require('./send')
const Subscriptions = require('./subscriptions')
const UserProfile = require('./user-profile')

class GraphApi {
  constructor (config) {
    this.baseUrl = Url(config.graphUrl)
    this.config = config

    this.AppEvent = new AppEvent(this.baseUrl, this.config)
    this.AttachmentUpload = new AttachmentUpload(this.baseUrl, this.config)
    this.MessengerProfile = new MessengerProfile(this.baseUrl, this.config)
    this.NLP = new NLP(this.baseUrl, this.config)
    this.PageSubscribedApps = new PageSubscribedApps(this.baseUrl, this.config)
    this.Persona = new Persona(this.baseUrl, this.config)
    this.Send = new Send(this.baseUrl, this.config)
    this.Subscriptions = new Subscriptions(this.baseUrl, this.config)
    this.UserProfile = new UserProfile(this.baseUrl, this.config)
  }
}

module.exports = (config) => new GraphApi(config)