module.exports = async (path, excludedRepos, excludedBranches) => {
  const pathMod = require('path')
  const repos = require(appRoot + '/src/utils/fs/list-repo.js')(path).filter(repo => !excludedRepos.includes(repo))
  const wd = process.cwd()
  for (const repo of repos) {
    clog.info(`Pulling for ${repo}`)
    process.chdir(pathMod.join(path, repo))
    await require(appRoot + '/src/functions/pull/helpers/git-process/pull.js')(await require(appRoot + '/src/utils/auth/get-protocol.js')(), await listBranches(repo, excludedBranches))
  }
  process.chdir(wd)
}

async function listBranches (repo, excludedBranches) {
  const fs = require('fs')
  const git = require('isomorphic-git')
  const dir = '.'
  const branches = await git.listBranches({ fs, dir })
  return branches.filter(branch => !excludedBranches[repo].includes(branch))
}
