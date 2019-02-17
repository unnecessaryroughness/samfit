const getRandomPhrase = require('../js/parsespeech').getRandomPhrase
const sessionManager  = require('../js/sessionmanager')

module.exports = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request
      return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent'
    },
    handle(handlerInput) {
      let sessionData = sessionManager.getSession(handlerInput)       
      speechText = sessionData.speechText
      speechText += getRandomPhrase('encouragement')
      speechText += getRandomPhrase('excuses')

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
  }
  