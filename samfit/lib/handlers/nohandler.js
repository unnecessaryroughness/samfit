const getRandomPhrase = require('../js/parsespeech').getRandomPhrase

module.exports = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request
      return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent'
    },
    handle(handlerInput) {
      let speechText = getRandomPhrase('encouragement')
      speechText += getRandomPhrase('excuses')

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
  }
  