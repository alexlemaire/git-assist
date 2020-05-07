function listDirs (path, parentDir = '') {
  const fs = require('fs')
  const pathMod = require('path')
  const files = fs.readdirSync(path, { withFileTypes: true })
  const dirs = files.filter(file => file.isDirectory())
  const repos = dirs.filter(dir => fs.existsSync(pathMod.join(path, dir.name, '.git'))).map(dir => pathMod.join(parentDir, dir.name))
  const nonRepos = dirs.filter(dir => !fs.existsSync(pathMod.join(path, dir.name, '.git'))).map(dir => pathMod.join(parentDir, dir.name))
  const subRepos = nonRepos.map(dir => listDirs(pathMod.join(path, pathMod.basename(dir)), dir)).flat(Infinity)
  return [...repos, ...subRepos]
}

module.exports = listDirs
