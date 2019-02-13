'use strict';

const YAML      = require('js-yaml'),
      FS        = require('fs'),
      PATH      = require('path'),
      VALIDPROP = require('./validproperty')
      
const YAMLROOT  = './etc/',
      YAMLEXT   = '.yaml',
      FORMAT    = 'utf8'

const parseYaml = (yamlFile) => {
  try {
    const yamlFilePath = PATH.format({
      root: YAMLROOT, 
      name: yamlFile,
      ext: YAMLEXT
    })
    var doc = YAML.safeLoad(FS.readFileSync(yamlFilePath))
    return doc
  } catch (e) {
    console.log(`\nerror reading YAML file: >>> \n\n`, e, '\n')
  }
}

const getYamlField = (yamlFile, yamlPath) => {
  try {
    const parsedFile = parseYaml(yamlFile)
    return VALIDPROP(parsedFile, yamlPath, true)
  } catch (e) {
    console.log('\nerror returning path from YAML file\n')
    return false
  }
}

module.exports = {
  parseYaml,
  getYamlField
}
