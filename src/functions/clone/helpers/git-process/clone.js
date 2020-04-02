module.exports = async (url, protocol, repo) => {
  const clog = require('../../../../utils/loggers/console-log.js')
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
  await git.clone({
    fs,
    http,
    dir: path.join(process.cwd(), repo),
    url,
    depth: 1,
    onAuth: require('../../../../utils/auth/auth.js')
  })
}

function sshClone(url) {
  // isomorphic-git doesn't seem to handle SSH cloning just yet so we use regular git command for now. Same as in push utility
  const spawnSync = require('child_process').spawnSync
  spawnSync('git', ['clone', url])
}
