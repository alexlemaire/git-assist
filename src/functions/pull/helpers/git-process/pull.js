const git = require('isomorphic-git')
const fs = require('fs')
const dir = '.'
const auth = require(appRoot + '/src/utils/auth/auth.js')

module.exports = async (protocol, branches) => {
  await require(appRoot + '/src/utils/config/sync-config.js')()
  switch (protocol) {
    case 'https':
      await httpPull(branches)
      break
    case 'ssh':
      await sshPull(branches)
      break
    default:
      break
  }
}

async function httpPull (branches) {
  const http = require('isomorphic-git/http/node')
  require(appRoot + '/src/utils/auth/user-heads-up.js')
  for (const branch of branches) {
    clog.info(`Pulling from branch ${branch}`)
    await git.pull({
      fs,
      http,
      dir,
      ref: branch,
      singleBranch: true,
      onAuth: auth.onAuth,
      onAuthFailure: auth.onAuthFailure
    }).then(res => {clog.success(`Pulled from ${branch}!`)})
  }
}

async function sshPull (branches) {
  await auth.sshAuth()
  const currentBranch = await git.currentBranch({ fs, dir })
  const spawnSync = require('child_process').spawnSync
  for (const branch of branches) {
    clog.info(`Pulling from branch ${branch}`)
    spawnSync('git', ['checkout', branch])
    const pullOp = spawnSync('git', ['pull'])
    const stdout = pullOp.stdout.toString().trim()
    const stderr = pullOp.stderr.toString().trim()
    if (stdout.length > 0) {
      console.log(stdout)
    }
    if (stderr.length > 0) {
      console.log(stderr)
    }
    clog.success('Done!')
  }
  spawnSync('git', ['checkout', currentBranch])
}
