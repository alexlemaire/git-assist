module.exports = () => {
  const chalk = require('chalk')
  const publishedVer = getPublishedVer()
  if (publishedVer.length === 0) {
    clog.error(`Error while comparing local version to latest published: cannot retrieve ${chalk.italic.cyan('git-assist')} latest published version. There seems to be an error reaching NPM registry... Please check your internet connection or NPM registry status.`)
  }
  const currentVer = getCurrentVer()
  if (checkSumVer(currentVer) < checkSumVer(publishedVer)) {
    clog.info(`Your installed ${chalk.italic('git-assist')} version is outdated. Latest version is ${chalk.magenta(publishedVer)}. Please update via ${chalk.cyan.italic('npm i -g git-assist')}`)
  }
}

function getPublishedVer () {
  const spawnSync = require('child_process').spawnSync
  return spawnSync('npm', ['view', 'git-assist', 'version']).stdout.toString().trim()
}

function getCurrentVer () {
  return require(appRoot + '/package.json').version.trim()
}

function checkSumVer (ver) {
  const verArr = ver.split('.').map(verType => Number(verType)).reverse()
  return verArr.reduce((acc, elt, i) => acc + (10 ** i) * elt, 0)
}
