const git = require('isomorphic-git')
const fs = require('fs')
const dir = '.'
module.exports = async () => {
  const clog = require('../../../utils/loggers/console-log.js')
  let paths = ['user.name', 'user.email', 'user.signingKey', 'commit.gpgSign']
  clog.info('No local configuration found for GitHub, pulling information from global GitHub configuration...')
  for (const path of paths) {
    const entry = await git.getConfig({ fs, dir, path })
    if (!entry) {
      await setConfig(path)
    }
  }
  clog.success('GitHub local configuration synchronized with global configuration!')
}

async function setConfig(path) {
  const spawnSync = require('child_process').spawnSync
  const value = spawnSync('git', ['config', '--global', path]).stdout.toString().trim()
  if (value) {
    await git.setConfig({ fs, dir, path, value })
  } else {
    throw new Error(`Glbal configuration missing for user ${path.replace('user.', '')}`)
  }
}
