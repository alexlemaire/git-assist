module.exports = async (message) => {
  await require(appRoot + '/src/utils/config/sync-config.js')()
  // not using isomorphic-git here because the signing plugin has some security issues
  const spawnSync = require('child_process').spawnSync
  const git = require('isomorphic-git')
  const fs = require('fs')
  const dir = '.'
  const paths = ['user.signingKey', 'commit.gpgSign']
  let values = []
  for (const path of paths) {
    values.push(git.getConfig({ fs, dir, path }))
  }
  await Promise.all(values).then(res => {
    clog.info('If required, please input your passphrase for your GPG key in order to sign your commit.')
    spawnSync('git', [
      'commit',
      '-S',
      '-m', message
    ], {stdio: 'inherit'})
  }).catch(err => {
    spawnSync('git', [
      'commit',
      '-m', message
    ], {stdio: 'inherit'})
  })
}
