module.exports = async () => {
  const promptly = require('promptly')
  return {
    name: `${await promptly.prompt('First name: ')} ${await promptly.prompt('Last name: ')}`,
    email: await promptly.prompt('GitHub email: ')
  }
}
