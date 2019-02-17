const parseSpeech      = require('../js/parsespeech').parseSpeech
const parser           = require('../js/parsetext')
const sessionManager   = require('../js/sessionmanager')
const calculateWorkout = require('../js/calculateworkout')

module.exports = {
  canHandle(handlerInput) {
    let { type, intent } = handlerInput.requestEnvelope.request
    return type === 'LaunchRequest' || (type === 'IntentRequest' && intent.name === 'WorkoutIntent')
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    const skillName = parser.getYamlField('config', 'SamFitSkill.SkillName')
    let speechText = parseSpeech('salutations', 'welcome')
    let workoutText = ""

    let workout = calculateWorkout()
    let fullWorkout = [...workout.cardio, ...workout.toning]
    let restDay = false
    console.log(fullWorkout)

    // What sort of day is it?
    if (workout.cardio.length === 0 && workout.toning.length === 0) {
      workoutText += parseSpeech('gameplay', 'its_a_rest_day')
      restDay = true
    } else if (workout.cardio.length > 0 && workout.toning.length === 0) {
      workoutText += parseSpeech('gameplay', 'today_is_a', 'cardio')
    } else if (workout.cardio.length === 0 && workout.toning.length > 0) {
      workoutText += parseSpeech('gameplay', 'today_is_a', 'toning')
    } else {
      workoutText += parseSpeech('gameplay', 'today_is_a', 'cardio and toning')
    }

    let totalExercises = fullWorkout.length
    let processedExercises = 0
    let displayCard = ''

    // Work out speech for exercise list
    for (let exercise of fullWorkout) {
      processedExercises++
      let exerciseLabel = exercise.actual.concat(' ', exercise.unit, ' of ', exercise.exercise)
      if (processedExercises === 1) {
        workoutText += parseSpeech('gameplay', 'todays_workout_is', exerciseLabel)
      } else if (processedExercises === totalExercises) {
        workoutText += parseSpeech('gameplay', 'and_finally', exerciseLabel)
      } else {
        workoutText += parseSpeech('gameplay', 'followed_by', exerciseLabel)
      }
      displayCard += exerciseLabel.concat('\n')
    }

    speechText += workoutText

    // Make an excuse
    if (!restDay) {
      speechText += parseSpeech('gameplay', 'repeat_that')
    }

    let sessionData = sessionManager.getSession(handlerInput) 
    sessionData.lastAction = request.type === 'LaunchRequest' ? 'session-started' : 'get-workout'
    sessionData.speechText = workoutText
    sessionManager.updateSession(handlerInput, sessionData)

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, displayCard)
      .getResponse()
  }
}
