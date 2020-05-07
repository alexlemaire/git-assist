module.exports = async (info) => {
  await setConfig(generateParams(info))
}

async function setConfig (params) {
  const git = require('isomorphic-git')
  const fs = require('fs')
  for (const param of params) {
    await git.setConfig({
      fs,
      dir: '.',
      path: param.path,
      value: param.value
    })
  }
  clog.success('Local configuration successfully updated!')
}

function generateParams (info) {
  const baseParams = [{
    path: 'user.name',
    value: info.name
  },
  {
    path: 'user.email',
    value: info.email
  }]
  return [...baseParams, ...gpgParams(info)]
}

function gpgParams (info) {
  const chalk = require('chalk')
  const Conf = require('conf')
  const config = new Conf({
    configName: 'users',
    fileExtension: 'conf',
    accessPropertiesByDotNotation: false
  })
  const user = config.get(info.email) || {}
  const key = user.gpg
  if (!key) {
    clog.error(`No GPG key was created via ${chalk.italic.blue('git-assist')} for ${chalk.italic.green(info.email)}: not adding a GPG key to this configuration.`)
    clog.info(`GitHub global configuration is synchronized (if needed) before any operation done with ${chalk.italic.blue('git-assist')}. So if you already generated and assigned a GPG key to your global user, you're good to go!`)
    clog.info(`If you wish to let ${chalk.italic.blue('git-assist')} handle your GPG keys accross users, please run ${chalk.cyan.italic('git-assist gpg --generate')} in order to generate a GPG key then rerun this command to add it automatically to your configuration.\n`)
    return []
  } else {
    clog.info(`Automatically pulling GPG key created via ${chalk.italic.cyan('git-assist')} for ${chalk.italic.blue(info.email)}...`)
    return [{
      path: 'user.signingkey',
      value: key
    },
    {
      path: 'commit.gpgSign',
      value: true
    }]
  }
}
