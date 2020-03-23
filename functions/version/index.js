module.exports = (args) => {
  const fs = require('fs')
  const pjson = JSON.parse(fs.readFileSync('package.json','utf-8'))
  console.log(`Your currently installed git-assit version is ${pjson.version}`)
}
