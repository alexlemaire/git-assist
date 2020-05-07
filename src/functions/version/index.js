module.exports = (args) => {
  const pjson = require(appRoot + '/package.json')
  clog.info(`Your currently installed git-assist version is ${pjson.version}`)
}
