module.exports = async () => {
  const promptly = require('promptly')
  const fname = await promptly.prompt('First name: ')
  const lname = await promptly.prompt('Last name: ')
  const email = await promptly.prompt('GitHub email: ')
  const pwd = await promptly.password('Enter a password: ')
  function validator(value) {
    if (value !== pwd) {
      throw new Error('\nError: passwords must match!\n')
    }
    return value
  }
  await promptly.password('Enter password again: ', { validator })
  return {
    name: `${fname} ${lname}`,
    email,
    pwd
  }
}
