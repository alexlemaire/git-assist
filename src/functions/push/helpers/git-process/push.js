const auth = require(appRoot + '/src/utils/auth/auth.js')

module.exports = async (protocol) => {
  await require(appRoot + '/src/utils/config/sync-config.js')()
  switch (protocol) {
    case 'https':
      await httpPush()
      break
    case 'ssh':
      await sshPush()
      break
    default:
      break
  }
  clog.success('Successfully commited, staged and pushed your changes!')
}

async function httpPush () {
  const http = require('isomorphic-git/http/node')
  const git = require('isomorphic-git')
  const fs = require('fs')
  const dir = '.'
  const currentBranch = await git.currentBranch({ fs, dir })
  require(appRoot + '/src/utils/auth/user-heads-up.js')
  await git.push({
    fs,
    http,
    dir,
    remote: await git.getConfig({ fs, dir, path: `branch.${currentBranch}.remote` }),
    ref: currentBranch,
    onAuth: auth.onAuth,
    onAuthFailure: auth.onAuthFailure
  })
}

async function sshPush () {
  await auth.sshAuth()
  // isomorphic-git is not supporting ssh yet so we use the regular bash call to git to operate over ssh
  const spawnSync = require('child_process').spawnSync
  spawnSync('git', ['push'], { stdio: 'inherit' })
}
