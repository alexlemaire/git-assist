module.exports = (info) => {
  const spawnSync = require('child_process').spawnSync
  const appRoot = require('app-root-path').path
  const clog = require(appRoot + '/src/utils/loggers/console-log.js')
  clog.info('Generating SSH key...')
  spawnSync('ssh-keygen', [
    '-t', 'rsa',
    '-b', '4096',
    '-C', info.email,
    '-N', info.pwd,
    '-f', info.path
  ])
  clog.success('SSH key generated!')
}
