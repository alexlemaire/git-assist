const clog = require('../../../utils/loggers/console-log.js')

module.exports = async (info) => {
  await setConfig(generateParams(info))
}

async function setConfig(params) {
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

function generateParams(info) {
  const baseParams = [{
    path: 'user.name',
    value: info.name
  },
  {
    path: 'user.email',
    value: info.email
  }]
  return [...baseParams, ...gpgParams()]
}

function gpgParams() {
  if (!process.env.GITHUB_GPGKEY) {
    const chalk = require('chalk')
    clog.error('No GPG key was created for GitHub: not adding a GPG key to this configuration.')
    clog.info(`Please run ${chalk.cyan.italic('git-assist generate-gpg')} in order to generate a GPG key then rerun this command to add it automatically to your configuration.\n`, {makeLink: false, format: false})
    return []
  } else {
    return [{
      path: 'user.signingkey',
      value: process.env.GITHUB_GPGKEY
    },
    {
      path: 'commit.gpgSign',
      value: true
    }]
  }
}
