const parseSpeech      = require('../js/parsespeech')
const parser           = require('../js/parsetext')
const sessionManager   = require('../js/sessionmanager')
const calculateWorkout = require('../js/calculateworkout')
// const validProperty   = require('../js/validproperty')
// const JMESPATH        = require('jmespath')

module.exports = {
  canHandle(handlerInput) {
    let { type, intent } = handlerInput.requestEnvelope.request
    return type === 'LaunchRequest' || (type === 'IntentRequest' && intent.name === 'WorkoutIntent')
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    const skillName = parser.getYamlField('config', 'SamFitSkill.SkillName')
    let speechText = parseSpeech('salutations', 'welcome')
    
    speechText += calculateWorkout()

    let sessionData = sessionManager.getSession(handlerInput) 
    sessionData.lastAction = request.type === 'LaunchRequest' ? 'session-started' : 'get-workout'
    sessionData.speechText = speechText
    sessionManager.updateSession(handlerInput, sessionData)

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, '')
      .getResponse()
  }
}
