const parseSpeech     = require('../js/parsespeech')
const sessionManager  = require('../js/sessionmanager')

module.exports = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request
      return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent'
    },
    handle(handlerInput) {
      let sessionData = sessionManager.getSession(handlerInput) 
      speechText = parseSpeech('salutations', 'help')
      
      if (sessionData.gameType.length === 0) {
        speechText += parseSpeech('salutations', 'pick_a_quiz')
      }

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    },
  }
  