const promptly = require('promptly')

module.exports = async (...args) => {
  const name = await promptly.prompt('Name: ')
  const age = await promptly.prompt('Age: ')
}
