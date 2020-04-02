const git = require('isomorphic-git')
const fs = require('fs')
const dir = '.'
const clog = require('../../../../utils/loggers/console-log.js')

module.exports = async (protocol, branches) => {
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
  for (const branch of branches) {
    clog.info(`Pulling from branch ${branch}`)
    await git.pull({
      fs,
      http,
      dir,
      ref: branch,
      singleBranch: true,
      onAuth: require('../../../../utils/auth/auth.js')
    })
    clog.success('Done!')
  }

}

async function sshPull (branches) {
  const currentBranch = await git.currentBranch({ fs, dir })
  const spawnSync = require('child_process').spawnSync
  for (const branch of branches) {
    clog.info(`Pulling from branch ${branch}`)
    spawnSync('git', ['checkout', branch])
    const output = spawnSync('git', ['pull']).stdout.toString().trim()
    console.log(output)
    clog.success('Done!')
  }
  spawnSync('git', ['checkout', currentBranch])
}
