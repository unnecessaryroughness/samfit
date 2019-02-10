'use strict';

const YAML      = require('js-yaml'),
      FS        = require('fs'),
      PATH      = require('path'),
      YAMLROOT  = './etc/',
      YAMLEXT   = '.yml',
      FORMAT    = 'utf8'

const parseYaml = (yamlFile, subdir) => {
  try {
    const yamlFilePath = PATH.format({
      root: YAMLROOT + (subdir ? subdir.concat('/') : ''), 
      name: yamlFile,
      ext: YAMLEXT
    })
    var doc = YAML.safeLoad(FS.readFileSync(yamlFilePath))
    return doc
  } catch (e) {
    console.log(`\nerror reading YAML file: >>> \n\n`, e, '\n')
  }
}

const parseTextYaml = (yamlFile) => {
  try {
    var doc = parseYaml(yamlFile, 'texts')
    return {
      text: doc.text.title,
      quotes: doc.text.quotes,
      length: doc.text.quotes.length
    }
  } catch (e) {
    console.log(`\nerror reading Text YAML file: >>> \n\n`, e, '\n')
  }
}

module.exports = {
  parseYaml,
  parseTextYaml
}
