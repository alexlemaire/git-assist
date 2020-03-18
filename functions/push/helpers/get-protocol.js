module.exports = async () => {
  const git = require('isomorphic-git')
  const fs = require('fs')
  const originUrl = await git.getConfig({
    fs,
    dir: '.',
    path: 'remote.origin.url'
  })
  return originUrl.substring(0, 4) === 'https' ? 'https' : 'ssh'
}
