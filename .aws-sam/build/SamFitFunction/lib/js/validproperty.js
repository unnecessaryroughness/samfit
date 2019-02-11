module.exports = (baseObj, propPath, returnValue) => {
  if (!baseObj) {
    return false
  }
  
  propComponents = propPath.split('.').reverse()
  testObj = baseObj
  let nextProp = ''

  while (propComponents.length > 0) {
    nextProp = propComponents.pop()  
    console.log('testing: ', testObj, 'for: ', nextProp)
    if (testObj[nextProp]) {
      testObj = testObj[nextProp]
    } else {
      return false
      break
    }
  }

  return returnValue ? testObj : true
}