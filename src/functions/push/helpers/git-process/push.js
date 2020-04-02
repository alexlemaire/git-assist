module.exports = async (protocol) => {
  switch (protocol) {
    case 'https':
      const http = require('isomorphic-git/http/node')
      const git = require('isomorphic-git')
      const fs = require('fs')
      const dir = '.'
      await git.push({
        fs,
        http,
        dir,
        remote: 'origin',
        ref: await git.currentBranch({
          fs,
          dir
        }),
        onAuth: require('../../../../utils/auth/auth.js')
      })
      break
    case 'ssh':
      // isomorphic-git is not supporting ssh yet so we use the regular bash call to git to operate over ssh
      const spawnSync = require('child_process').spawnSync
      spawnSync('git' , ['push'])
      break
    default:
      break
  }
}
