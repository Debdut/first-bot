const config = require('./config')
const GraphApi = require('./graph-api')(config)

const MessengerProfile = GraphApi.MessengerProfile

if (config.PROFILE_SET === 'false') {
  console.log('Setting Profile')
  
  MessengerProfile.setGetStarted()
  MessengerProfile.setGreeting([
    { locale: 'default', text: `Hey {{user_first_name}}! Meet ${config.APP_NAME}: ${config.APP_DESCRIPTION} 🙏` }
  ])
  MessengerProfile.setPersistentMenu([
    {
      locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [
        { type: 'postback', title: 'Top Bots', payload: 'PERSISTENT_MENU_TOP_BOTS' },
        { type: 'postback', title: 'Categories', payload: 'PERSISTENT_MENU_CATEGORIES' },
        { type: 'postback', title: 'Menu', payload: 'PERSISTENT_MENU_MENU' }
      ]
    }
  ])
  MessengerProfile
    .set()
    .then(res => console.log(res))
    .catch(err => console.error(err))
}
