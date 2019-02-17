const parseSpeech     = require('../js/parsespeech').parseSpeech
const sessionManager  = require('../js/sessionmanager')
const JMESPATH        = require('jmespath')

module.exports = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request
      return request.type === 'IntentRequest'
             && (request.intent.name === 'AMAZON.CancelIntent'
                 || request.intent.name === 'AMAZON.StopIntent')
    },
    handle(handlerInput) {
      speechText = parseSpeech('salutations', 'goodbye')

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
  }
  