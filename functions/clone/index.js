module.exports = async (args) => {
  const {protocol, url} = await require('./helpers/info-prompter.js')()
  const repo = url.split('/')[url.split('/').length - 1].split('.')[0]
  await require('./helpers/git-process.js')(protocol, url, repo)
  openRepo(repo)
}

function openRepo(repo) {
  const clog = require('../../utils/loggers/console-log.js')
  clog.info('Opening your new repository now...')
  const spawnSync = require('child_process').spawnSync
  spawnSync('xdg-open', [`${process.cwd()}/${repo}`])
  clog.success(`${repo} successfully opened!`)
}
