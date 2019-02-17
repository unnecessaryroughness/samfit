'use strict';

const Alexa = require('ask-sdk')
const skillBuilder = Alexa.SkillBuilders.standard()

exports.handler = skillBuilder
  .addRequestHandlers(
    require('./lib/handlers/sessionstartedhandler'),
    require('./lib/handlers/sessionendedhandler'),
    require('./lib/handlers/helphandler'),
    require('./lib/handlers/stophandler'),  
    require('./lib/handlers/yeshandler'),  
    require('./lib/handlers/nohandler'),  
    require('./lib/handlers/fallbackhandler')  
  )
  .addErrorHandlers(require('./lib/handlers/errorhandler'))
  .lambda()
