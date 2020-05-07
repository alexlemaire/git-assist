module.exports = async (message) => {
  await require(appRoot + '/src/utils/config/sync-config.js')()
  // not using isomorphic-git here because the signing plugin has some security issues
  const spawnSync = require('child_process').spawnSync
  const git = require('isomorphic-git')
  const fs = require('fs')
  const dir = '.'
  const paths = ['user.signingKey', 'commit.gpgSign']
  const values = await Promise.all(paths.map(path => git.getConfig({ fs, dir, path })))
  let opts = ['commit', '-S', '-m', message]
  let msg = true
  if (values.filter(value => !!value).length !== paths.length) {
    msg = false
    opts = opts.filter(opt => opt !== '-S')
  }
  if (msg) {
    clog.info('If required, please input your passphrase for your GPG key in order to sign your commit.')
  }
  spawnSync('git', opts, { stdio: 'inherit' })
}
