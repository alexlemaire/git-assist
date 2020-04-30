module.exports = async (message) => {
  await require(appRoot + '/src/utils/config/sync-config.js')()
  // not using isomorphic-git here because the signing plugin has some security issues
  const spawnSync = require('child_process').spawnSync
  clog.info('If required, please input your passphrase for your GPG key in order to sign your commit.')
  spawnSync('git', [
    'commit',
    '-S',
    '-m', message
  ])
}
