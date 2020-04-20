module.exports = (keyDefPath) => {
  const spawnSync = require('child_process').spawnSync
  const appRoot = require('app-root-path').path
  const clog = require(appRoot + '/src/utils/loggers/console-log.js')
  clog.info('Started generating GPG key. Please hold on...')
  clog.info('If you try to generate multiple keys in a row this may take a while (low entropy). To help speed up the process simply use your computer for other tasks.')
  spawnSync('gpg', [
    '--gen-key',
    '--batch', keyDefPath
  ])
  clog.success('GPG key successfully generated!')
}
