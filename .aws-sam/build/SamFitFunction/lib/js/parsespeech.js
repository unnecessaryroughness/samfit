const PARSER      = require('../js/parsetext')
const JMESPATH    = require('jmespath')
const SPEECH_NAME = 'speech'
const RANDINT     = require('random-int')

const parseSpeech = (speechgroup, speechlabel, ...args) => {
  const speechSource = PARSER.parseYaml(SPEECH_NAME)
  let speech = JMESPATH.search(speechSource, `speech_patterns.${speechgroup}.${speechlabel}`)
 
  // map placeholders for additional args
  for (const [index, varItem] of args.entries()) {
    let regexp = new RegExp(`{{var.${index}}}`, 'g')
    speech = speech.replace(regexp, varItem)
  }

  return speech
}

const getRandomPhrase = (reqSpeechGroup) => {
  const speechSource = PARSER.parseYaml(SPEECH_NAME)
  let speechGroup = JMESPATH.search(speechSource, `speech_patterns.${reqSpeechGroup}`)
  let randomPos = RANDINT(0, speechGroup.length-1)
  return speechGroup[randomPos]
}

module.exports = {
  parseSpeech,
  getRandomPhrase
}
