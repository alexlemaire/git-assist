module.exports = async () => {
  const promptly = require('promptly')
  const email = await promptly.prompt('GitHub email: ')
  const pwd = await promptly.password('Enter a password: ')
  function validator(value) {
    if (value !== pwd) {
      throw new Error('\nError: passwords must match!\n')
    }
    return value
  }
  await promptly.password('Enter password again: ', { validator })
  const path = await promptly.prompt(`Enter file in which to save the key (default: ${process.env.HOME}/.ssh/id_rsa): `, { default: `${process.env.HOME}/.ssh/id_rsa`})
  return {
    email,
    pwd,
    path
  }
}
