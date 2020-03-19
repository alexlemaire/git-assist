module.exports = async (args) => {
  const info = await infoPrompter()
  if (args[0] === '-g') {
    await setGlobalConfig(info)
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

async function setGlobalConfig(info) {
  const exec = require('../../utils/exec.js')
  // for global config we cannot use isomorphic-git as they do not currently support global config. May be worth helping them with this
  await Promise.all([exec(`git config --global user.name "${info.name}"`), exec(`git config --global user.email "${info.email}"`)]).catch(err => {
    console.log(err)
    process.exit(1)
  })
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
