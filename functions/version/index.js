module.exports = (args) => {
  const fs = require('fs')
  const pjson = require('../../package.json')
  console.log(`Your currently installed git-assit version is ${pjson.version}`)
}
