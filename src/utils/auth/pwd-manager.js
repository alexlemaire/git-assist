module.exports = {
  getPwd: (user) => {
    return timedWrapper(getPwdHandler, user).catch(err => {throw new Error(err)})
  },
  setPwd: (user, password) => {
    return timedWrapper(setPwdHandler, user, password).catch(err => {throw new Error(err)})
  },
  promptPwd: async () => {
    const inquirer = require('inquirer')
    return await inquirer.prompt([
      {
        type: 'password',
        name: 'password',
        message: 'GitHub password (access token if using MFA, see our documentation for info):'
      }
    ])
  }
}

function timedWrapper(task, ...args) {
  return new Promise((resolve, reject) => {
    task(...args).then(res => resolve(res))
    setTimeout(() => {
      reject('Timed out after 2 seconds! Your keyring may be locked, please check.')
    }, 2000)
  })
}

function getPwdHandler(user) {
  const keytar = require('keytar')
  return keytar.getPassword('git-assist', user)
}

function setPwdHandler (user, password) {
  const keytar = require('keytar')
  return keytar.setPassword('git-assist', user, password)
}
