const questionSearch  = require('../js/questionsearch')
const parseSpeech     = require('../js/parsespeech')
const validProperty   = require('../js/validproperty')
const questionManager = require('../js/questionmanager')
const sessionManager  = require('../js/sessionmanager')
const constructPrompt = require('../js/constructprompt')
const JMESPATH        = require('jmespath')

module.exports = {
  canHandle(handlerInput) {
    let { type, intent } = handlerInput.requestEnvelope.request
    return type === 'LaunchRequest' || (type === 'IntentRequest' && intent.name === 'StartGameIntent')
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    const slots = validProperty(request, 'intent.slots') ? request.intent.slots : null
    let speechText = parseSpeech('salutations', 'welcome')
    let sessionData = sessionManager.getSession(handlerInput)

    if (validProperty(slots, 'textname.value')) {
      let requestedText = slots.textname.value
      let questionSet = questionSearch(requestedText)  
      sessionData.questionList = questionManager.prepQuestions(questionSet)
      let totalQuestions = sessionData.questionList.length
      
      if (totalQuestions == 0) {
        speechText = parseSpeech('errors', 'found_no_questions', requestedText)        
        sessionData.lastAction = 'foundnoquestions'
      } else {
        speechText = parseSpeech('setup', 'question_prep', totalQuestions , requestedText)
        speechText += parseSpeech('setup', 'which_game_type')
        sessionData.lastAction = 'askforgametype'
      } 
    } else {
      sessionData.questionList = []
      sessionData.lastAction = 'pickaquiz'
      speechText += parseSpeech('salutations', 'pick_a_quiz')
    }
    
    sessionManager.updateSession(handlerInput, sessionData)

    let skillName = 'GCSE Quotes'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, '')
      .getResponse()
  }
}
