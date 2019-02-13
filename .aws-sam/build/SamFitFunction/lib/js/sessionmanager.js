
function sessionTemplate () {
  this.lastAction = '',
  this.speechText = '',
  this.load = (loadData) => {
    if (loadData) {
      this.lastAction = loadData.lastAction
      this.speechText = loadData.speechText
    }
    return this
  }
}

const getSession = (handlerInput) => {
  let sessionData = new sessionTemplate()
  let cachedSession = handlerInput.attributesManager.getSessionAttributes()
  if (cachedSession.questionList) {
    sessionData.load(cachedSession)
  }
  return sessionData
}

const updateSession = (handlerInput, sessionData) => {
  handlerInput.attributesManager.setSessionAttributes(sessionData)
}


module.exports = {
  getSession, 
  updateSession
}