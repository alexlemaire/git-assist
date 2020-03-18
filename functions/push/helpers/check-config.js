module.exports = async () => {
  const git = require('isomorphic-git')
  const fs = require('fs')
  let paths = ['user.name', 'user.email']
  for (const path of paths) {
    const entry = await git.getConfig({
      fs,
      dir: '.',
      path
    })
    if (!entry) {
      throw new Error(`Configuration missing for user ${path.replace('user.', '')}`)
    }
  }
}
