const PARSER  = require('./parsetext')
const WEEKDAY = require('weekday')

module.exports = calculateWorkout = () => {
  const weekday = WEEKDAY().toLowerCase()
  const weekdayData = PARSER.getYamlField(`weeklyplan`, `weeklyplan.${weekday}`)
  const exerciseData = PARSER.parseYaml('exercises')

  console.log(JSON.stringify(weekdayData, null, 2))
  console.log(JSON.stringify(exerciseData, null, 2))

  const {totalmins, cardioexercises} = weekdayData.cardio || {totalmins: 0, cardioexercises: []}
  const {totalreps, toningexercises} = weekdayData.toning || {totalreps: 0, toningexercises: []}
  let allocatedreps = 0
  let allocatedmins = 0

  // TODO: Insert code to calculate workout here

  // Loop through exercises for type
  // if exercise is 'random' get the number of types & generate a random list 
  // for every exercise except the very last one 
  // generate a random number of reps between min & max for type 
  // for very last exercise use remaining number of reps as long as it doesn't exceed totalreps for day 

  return `calculateWorkout Output! - ${weekday}` 
}