module.exports = (repo) => {
  const clog = require('../../../../utils/loggers/console-log.js')
  clog.info('Opening your new repository now...')
  const spawnSync = require('child_process').spawnSync
  spawnSync('xdg-open', [`${process.cwd()}/${repo}`])
  clog.success(`${repo} successfully opened!`)
}
