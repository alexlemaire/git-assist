module.exports = {
  getPwd: async (user) => {
    const keytar = require('keytar')
    return await keytar.getPassword('git', user)
  },
  setPwd: async (user, password) => {
    const keytar = require('keytar')
    await keytar.setPassword('git', user, password)
  },
  promptPwd: async () => {
    const inquirer = require('inquirer')
    return await inquirer.prompt([
      {
        type: 'password',
        name: 'password',
        message: 'GitHub password (access token if using MFA):'
      }
    ])
  }
}
