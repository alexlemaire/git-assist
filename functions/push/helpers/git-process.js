const git = require('isomorphic-git')
const fs = require('fs')
const dir = '.'

module.exports = async (protocol) => {
  const promptly = require('promptly')
  const execSync = require('child_process').execSync
  const addAll = await promptly.confirm('Do you want to include all changes you made (y/n)? ')
  const params = !addAll ? await promptly.prompt('Parameters for "git add" command: ') : undefined
  const message = await promptly.prompt('Commit message: ')
  await stage(addAll, params)
  await commit(message)
  await push(protocol)
}

async function push(protocol) {
  switch (protocol) {
    case 'https':
      const http = require('isomorphic-git/http/node')
      await git.push({
        fs,
        http,
        dir,
        remote: 'origin',
        ref: await git.currentBranch({
          fs,
          dir
        })
      }).then(res => {console.log(res)})
      break
    case 'ssh':
      // isomorphic-git is not supporting ssh yet so we use the regular bash call to git to operate over ssh
      execSync('git push')
      break
    default:
      break
  }
}

async function stage(addAll, params) {
  if (addAll){
    await stageAll()
  } else {
    // TODO: rewrite this to work with isomorphic-git. There needs to be a way
    execSync(`git add ${params}`)
  }
}

async function commit(message) {
  await git.commit({
    fs,
    dir,
    message
  }).then(res => {console.log(res)})
}

async function stageAll() {
  const repo = {fs, dir}
  await git.statusMatrix(repo).then((status) =>
    Promise.all(
      status.map(([filepath, , worktreeStatus]) =>
        worktreeStatus ? git.add({ ...repo, filepath }) : git.remove({ ...repo, filepath })
      )
    )
  )
}
