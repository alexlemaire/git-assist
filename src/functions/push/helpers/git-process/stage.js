module.exports = async (addAll, params) => {
  await require(appRoot + '/src/utils/config/sync-config.js')()
  if (addAll){
    await stageAll()
  } else {
    // TODO: rewrite this to work with isomorphic-git. There needs to be a way
    const spawnSync = require('child_process').spawnSync
    const stageOp = spawnSync('git', ['add', ...params])
    const stageOpStderr = stageOp.stderr.toString().trim()
    if (stageOpStderr.length > 0) {
      throw new Error(stageOpStderr)
    }
  }
}

async function stageAll() {
  const git = require('isomorphic-git')
  const fs = require('fs')
  const dir = '.'
  const repo = {fs, dir}
  await git.statusMatrix(repo).then((status) =>
    Promise.all(
      status.map(([filepath, , worktreeStatus]) =>
        worktreeStatus ? git.add({ ...repo, filepath }) : git.remove({ ...repo, filepath })
      )
    )
  )
}
