const auth = require(appRoot + '/src/utils/auth/auth.js')

module.exports = async (url, protocol, repo) => {
  await require(appRoot + '/src/utils/config/sync-config.js')()
  clog.info(`Cloning ${repo} into current folder...`)
  switch (protocol) {
    case 'ssh':
      sshClone(url)
      break
    case 'https':
      await httpsClone(url, repo)
      break
    default:
      break
  }
  clog.success(`${repo} successfully cloned!`)
}

async function httpsClone(url, repo) {
  const fs = require('fs')
  const http = require('isomorphic-git/http/node')
  const git = require('isomorphic-git')
  const path = require('path')
  if (fs.existsSync('.git/config')) {
    require(appRoot + '/src/utils/auth/user-heads-up.js')
  }
  await git.clone({
    fs,
    http,
    dir: path.join(process.cwd(), repo),
    url,
    depth: 1,
    onAuth: auth.onAuth,
    onAuthFailure: auth.onAuthFailure
  })
}

async function sshClone(url) {
  await auth.sshAuth()
  // isomorphic-git doesn't seem to handle SSH cloning just yet so we use regular git command for now. Same as in push utility
  const spawnSync = require('child_process').spawnSync
  spawnSync('git', ['clone', url])
}
