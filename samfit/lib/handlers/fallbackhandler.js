const parseSpeech     = require('../js/parsespeech')

module.exports = {
    canHandle(handlerInput) {
      return true
    },
    handle(handlerInput) {
      let sessionData = sessionManager.getSession(handlerInput) 
      speechText = parseSpeech('errors', 'fallback_message')

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
  }
  