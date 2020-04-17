module.exports = async (path, excludedDirs) => {
  const pathMod = require('path')
  const clog = require('../../../utils/loggers/console-log.js')
  const repos = require('../../../utils/fs/list-repo.js')(path).filter(repo => !excludedDirs.includes(repo))
  const wd = process.cwd()
  for (const repo of repos) {
    clog.info(`Pulling for ${repo}`, {makeLink: false, format: false})
    process.chdir(pathMod.join(path, repo))
    await require('../../pull/helpers/git-process/pull.js')(await require('../../../utils/auth/get-protocol.js')(), await listBranches())
  }
  process.chdir(wd)
}

async function listBranches() {
  const fs = require('fs')
  const git = require('isomorphic-git')
  const dir = '.'
  return await git.listBranches({ fs, dir })
}
