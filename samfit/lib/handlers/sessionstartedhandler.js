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

    let workout = calculateWorkout()
    let fullWorkout = [...workout.cardio, ...workout.toning]
    console.log(fullWorkout)

    // speech for cardio
    if (workout.cardio.length === 0 && workout.toning.length === 0) {
      speechText += parseSpeech('gameplay', 'its_a_rest_day')
    } else if (workout.cardio.length > 0 && workout.toning.length === 0) {
      speechText += parseSpeech('gameplay', 'today_is_a', 'cardio')
    } else if (workout.cardio.length === 0 && workout.toning.length > 0) {
      speechText += parseSpeech('gameplay', 'today_is_a', 'toning')
    } else {
      speechText += parseSpeech('gameplay', 'today_is_a', 'cardio and toning')
    }

    let totalExercises = fullWorkout.length
    let processedExercises = 0
    let displayCard = ''

    for (let exercise of fullWorkout) {
      processedExercises++
      let exerciseLabel = exercise.actual.concat(' ', exercise.unit, ' of ', exercise.exercise)
      if (processedExercises === 1) {
        speechText += parseSpeech('gameplay', 'todays_workout_is', exerciseLabel)
      } else if (processedExercises === totalExercises) {
        speechText += parseSpeech('gameplay', 'and_finally', exerciseLabel)
      } else {
        speechText += parseSpeech('gameplay', 'followed_by', exerciseLabel)
      }
      displayCard += exerciseLabel.concat('\n')
    }
    
    speechText += parseSpeech('gameplay', 'repeat_that')


    let sessionData = sessionManager.getSession(handlerInput) 
    sessionData.lastAction = request.type === 'LaunchRequest' ? 'session-started' : 'get-workout'
    sessionData.speechText = speechText
    sessionManager.updateSession(handlerInput, sessionData)

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, displayCard)
      .getResponse()
  }
}
