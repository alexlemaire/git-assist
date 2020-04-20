module.exports = (repo) => {
  const appRoot = require('app-root-path').path
  const clog = require(appRoot + '/src/utils/loggers/console-log.js')
  clog.info('Opening your new repository now...')
  const spawnSync = require('child_process').spawnSync
  spawnSync('xdg-open', [`${process.cwd()}/${repo}`])
  clog.success(`${repo} successfully opened!`)
}
