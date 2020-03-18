const git = require('isomorphic-git')
const fs = require('fs')

module.exports = async (protocol) => {
  const promptly = require('promptly')
  const filepath = await promptly.prompt('Files to add (default: all): ', {default: '.'})
  const message = await promptly.prompt('Commit message: ')
  await stageCommit(filepath, message)
  await push(protocol)
}

async function push(protocol) {
  switch (protocol) {
    case 'https':
      const http = require('isomorphic-git/http/node')
      await git.push({
        fs,
        http,
        dir: '.',
        remote: 'origin',
        ref: await git.currentBranch({
          fs,
          dir: '.'
        })
      }).then(res => {console.log(res)})
      break
    case 'ssh':
      // isomorphic-git is not supporting ssh yet so we use the regular bash call to git to operate over ssh
      const childProc = require('child_process')
      childProc.execSync('git push')
      break
    default:
      break
  }
}

async function stageCommit(filepath, message) {
  await git.add({
    fs,
    dir: '.',
    filepath
  }).then(res => {console.log(res)})
  await git.commit({
    fs,
    dir: '.',
    message
  }).then(res => {console.log(res)})
}
