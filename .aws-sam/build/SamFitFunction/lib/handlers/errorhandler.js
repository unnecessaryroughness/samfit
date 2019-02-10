const sessionManager  = require('../js/sessionmanager')
const errorOccurred = 'An error occurred'

module.exports = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      let sessionData = sessionManager.getSession(handlerInput)
      sessionData.lastAction = 'error'
      sessionManager.updateSession(handlerInput, sessionData)
      
      console.log(`Error handled: ${error.message}`)

      return handlerInput.responseBuilder
        .speak(errorOccurred)
        .reprompt(errorOccurred)
        .getResponse();
    }
  }

