module.exports = async (url) => {
  if (!url) {
    const git = require('isomorphic-git')
    const fs = require('fs')
    url = await git.getConfig({
      fs,
      dir: '.',
      path: 'remote.origin.url'
    })
  }
  return url.substring(0, 5) === 'https' ? 'https' : 'ssh'
}
