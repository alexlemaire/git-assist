const promptly = require('promptly')
const childProc = require('child_process')
const git = require('isomorphic-git')
const fs = require('fs')

module.exports = async (args) => {
  const fname = await promptly.prompt('First name: ')
  const lname = await promptly.prompt('Last name: ')
  const email = await promptly.prompt('Email: ')
  if (args[0] === '-g') {
    // for global config we cannot use isomorphic-git as they do not currently support global config. May be worth helping them with this
    childProc.execSync(`git config --global user.name "${fname} ${lname}"`)
    childProc.execSync(`git config --global user.email "${email}"`)
  } else {
    const params = [{
      path: 'user.name',
      value: `${fname} ${lname}`
    },
    {
      path: 'user.email',
      value: email
    }]
    for (const param of params) {
      await git.setConfig({
        fs,
        dir: '.',
        path: param.path,
        value: param.value
      })
    }
  }
}
