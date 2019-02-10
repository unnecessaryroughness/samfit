const PARSER      = require('../js/parsetext')
const JMESPATH    = require('jmespath')
const SPEECH_NAME = 'speech'

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

module.exports = parseSpeech
