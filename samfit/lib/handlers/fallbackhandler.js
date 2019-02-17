const parseSpeech     = require('../js/parsespeech').parseSpeech

module.exports = {
    canHandle(handlerInput) {
      return true
    },
    handle(handlerInput) {
      speechText = parseSpeech('errors', 'fallback_message')

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
  }
  