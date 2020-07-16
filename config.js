const { Console } = require('console')
const dotenv = require('dotenv')

const Logger = new Console({ stdout: process.stdout, stderr: process.stderr })

console.log = (...args) => Logger.log(`[${config.APP_NAME} Messenger]`, ...args)
console.err = (...args) => Logger.err(`[${config.APP_NAME} Messenger]`, ...args)
console.dir = (...args) => Logger.dir(`[${config.APP_NAME} Messenger]`, ...args)

const ENV_VARS = [ 'PAGE_ID', 'APP_ID', 'PAGE_ACCESS_TOKEN', 'APP_NAME', 'APP_DESCRIPTION', 'APP_SECRET', 'VERIFY_TOKEN', 'APP_URL', 'SHOP_URL', 'PORT', 'WEBHOOK', 'PROFILE_SET', 'GRAPH_URI', 'GRAPH_VERSION' ]

class Config {
  constructor () {
    dotenv.config()
    
    ENV_VARS.forEach(env => {
      this[env] = process.env[env]
    })
  }

  get graphUrl () {
    return `${this.GRAPH_URI}/${this.GRAPH_VERSION}`
  }

  get webhookUrl() {
    return `${this.APP_URL}${this.WEBHOOK}`
  }

  get whitelistedDomains () {
    let domains = []
    if (this.APP_URL) {
      domains.push(this.APP_URL)
    }
    if (this.SHOP_URL) {
      domains.push(this.SHOP_URL)
    }
    return domains
  }

  checkEnvVariables () {
    ENV_VARS.forEach(key => {
      if (!process.env[key]) {
        console.log(`[Messenger Bot] [Warning] Missing the environment variable ${key}`)
      }
    }) 
  }
}

const config = new Config()

module.exports = config
