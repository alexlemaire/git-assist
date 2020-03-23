module.exports = (args) => {
  const fs = require('fs')
  const consola = require('consola')
  const pjson = require('../../package.json')
  consola.info(`Your currently installed git-assit version is ${pjson.version}`)
}
