module.exports = async (args) => {
  const info = await infoPrompter()
  if (args[0] === '-g') {
    setGlobalConfig(info)
  } else {
    await setLocalConfig(info)
  }
}

async function infoPrompter() {
  const promptly = require('promptly')
  return {
    name: `${await promptly.prompt('First name: ')} ${await promptly.prompt('Last name: ')}`,
    email: await promptly.prompt('Email: ')
  }
}

function setGlobalConfig(info) {
  const childProc = require('child_process')
  // for global config we cannot use isomorphic-git as they do not currently support global config. May be worth helping them with this
  childProc.execSync(`git config --global user.name "${info.name}"`)
  childProc.execSync(`git config --global user.email "${info.email}"`)
}

async function setLocalConfig(info) {
  const git = require('isomorphic-git')
  const fs = require('fs')
  const params = [{
    path: 'user.name',
    value: info.name
  },
  {
    path: 'user.email',
    value: info.email
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
