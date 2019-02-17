const PARSER    = require('./parsetext')
const WEEKDAY   = require('weekday')
const RANDINT   = require('random-int')
const JMESPATH  = require('jmespath')

const largest = (x, y) => {
  return x > y ? x : y
}

const smallest = (x, y) => {
  return x < y ? x : y
}

const generateRandoms = (requestedExercises, allExercises, totalUnits) => {
  // if the list if requested exercises is empty, fail fast
  if (!requestedExercises || requestedExercises.length === 0) {
    return []
  }
  let exercise0 = requestedExercises[0]
  let actualExercises = []

  // if asked for random exercises, generate a list of them
  if (typeof exercise0 === 'object' && exercise0.random && parseInt(exercise0.random)) {
    let numberOfRandoms = parseInt(exercise0.random)
    let tempAllExercises = [...allExercises]
    for (let e=0; e < numberOfRandoms; e++) {
      let randomExerciseNum = RANDINT(0, (tempAllExercises.length)-1)
      actualExercises.push(tempAllExercises[randomExerciseNum].exercise)
      tempAllExercises.splice(randomExerciseNum, 1)
    }
  } else {
    actualExercises = [...requestedExercises]
  }

  // calculate the actual units for each exercise & decorate with extra information
  let returnExercises = []
  for (let ex of actualExercises) {
    let extras = JMESPATH.search(allExercises, `[?exercise == '${ex}']`)[0]
    let useUnits = RANDINT(smallest(extras.min, totalUnits), smallest(extras.max, totalUnits)) 
    totalUnits -= useUnits * (extras.multiplier || 1)
    returnExercises.push({actual: useUnits.toString(), ...extras})
  }

  // if we haven't accounted for all the requested units, pad the exercises but don't go over the max levels
  if (totalUnits > 0) {
    for (let e of returnExercises) {
      if (typeof e.multiplier === 'undefined') {
        let diff = smallest(totalUnits, parseInt(e.max) - parseInt(e.actual))
        e.actual = (parseInt(e.actual) + diff).toString()
        totalUnits -= diff
        console.log(`padding... ${diff} onto ${e.exercise}`)
        if (totalUnits <= 0) {
          break
        }
      }
    }
  }

  return returnExercises
}


module.exports = calculateWorkout = () => {
  const weekday = WEEKDAY().toLowerCase()
  const weekdayData = PARSER.getYamlField(`weeklyplan`, `weeklyplan.${weekday}`)
  const exerciseData = PARSER.parseYaml('exercises')
  let allCardioExercises = exerciseData.exercises.cardio
  let allToningExercises = exerciseData.exercises.toning

  let {totalmins, cardioexercises} = weekdayData.cardio || {totalmins: 0, cardioexercises: []}
  let {totalreps, toningexercises} = weekdayData.toning || {totalreps: 0, toningexercises: []}
  
  cardioexercises = generateRandoms(cardioexercises, allCardioExercises, totalmins)
  toningexercises = generateRandoms(toningexercises, allToningExercises, totalreps)

  return {
    cardio: cardioexercises,
    toning: toningexercises
  }
}