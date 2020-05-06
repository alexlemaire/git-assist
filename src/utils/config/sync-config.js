const git = require('isomorphic-git')
const fs = require('fs')
const dir = '.'
module.exports = async () => {
  if (!fs.existsSync('.git/config')) {
    clog.info('Not currently working from a repository: will not proceed to synchronize global and local GitHub configurations.')
    return
  }
  let paths = ['user.name', 'user.email', 'user.signingKey', 'commit.gpgSign']
  for (const path of paths) {
    const entry = await git.getConfig({ fs, dir, path })
    if (!entry) {
      clog.info(`No local configuration found for ${path}, pulling information from global GitHub configuration...`)
      await setConfig(path)
      clog.success(`GitHub local configuration for ${path} synchronized with global configuration!`)
    }
  }
}

async function setConfig(path) {
  const spawnSync = require('child_process').spawnSync
  const value = spawnSync('git', ['config', '--global', path]).stdout.toString().trim()
  if (value) {
    await git.setConfig({ fs, dir, path, value })
  } else {
    if (path === 'user.name' || path === 'user.email') {
      throw new Error(`Global configuration missing for ${path}`)
    }
    clog.info(`Global configuration missing for ${path}`)
  }
}
