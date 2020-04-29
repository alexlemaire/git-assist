module.exports = () => {
  const chalk = require('chalk')
  const publishedVer = getPublishedVer()
  const currentVer = getCurrentVer()
  if (currentVer !== publishedVer && publishedVer.length > 0) {
    clog.info(`Your installed ${chalk.italic('git-assist')} version is outdated. Latest version is ${chalk.bold(publishedVer)}. Please update via ${chalk.cyan.italic('npm i -g git-assist')}`)
  }
}

function getPublishedVer() {
  const spawnSync = require('child_process').spawnSync
  return spawnSync('npm', ['view', 'git-assist', 'version']).stdout.toString().trim()
}

function getCurrentVer() {
  return require(appRoot + '/package.json').version.trim()
}
