const parseSpeech     = require('../js/parsespeech')
const sessionManager  = require('../js/sessionmanager')
const JMESPATH        = require('jmespath')

module.exports = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request
      return request.type === 'IntentRequest'
        &&  (request.intent.name === 'AMAZON.CancelIntent'
          || request.intent.name === 'AMAZON.StopIntent')
    },
    handle(handlerInput) {
      let sessionData = sessionManager.getSession(handlerInput) 
      let askedQuestionsOnly = JMESPATH.search(sessionData.questionList, '[?asked]').length
      speechText = parseSpeech('gameplay', 'stop_game', sessionData.score, sessionData.score != 1 ? 's' : '', askedQuestionsOnly)

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
  }
  