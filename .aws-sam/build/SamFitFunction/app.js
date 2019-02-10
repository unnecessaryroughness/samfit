'use strict';

const Alexa = require('ask-sdk')
const skillBuilder = Alexa.SkillBuilders.standard()

exports.handler = skillBuilder
  .addRequestHandlers(
    require('./lib/handlers/sessionstartedhandler'),
    require('./lib/handlers/sessionendedhandler'),
    require('./lib/handlers/helphandler'),
    require('./lib/handlers/unhandledhandler')  
  )
  .addErrorHandlers(require('./lib/handlers/errorhandler'))
  .lambda()
