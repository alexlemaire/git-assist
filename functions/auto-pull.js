const promptly = require('promptly')

module.exports = async (args) => {
  require('../helpers/check-logs.js')()
  // TODO: should allow configuration via --config flag
  const name = await promptly.prompt('Name: ')
  const age = await promptly.prompt('Age: ')
}
