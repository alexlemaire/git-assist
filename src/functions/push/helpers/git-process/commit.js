module.exports = async (message) => {
  // not using isomorphic-git here because the signing plugin has some security issues
  const spawnSync = require('child_process').spawnSync
  const appRoot = require('app-root-path').path
  const clog = require(appRoot + '/src/utils/loggers/console-log.js')
  clog.info('If required, please input your passphrase for your GPG key in order to sign your commit.')
  spawnSync('git', [
    'commit',
    '-S',
    '-m', message
  ])
}
