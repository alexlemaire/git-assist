module.exports = (info) => {
  const spawnSync = require('child_process').spawnSync
  // for global config we cannot use isomorphic-git as they do not currently support global config. May be worth helping them with this
  spawnSync('git', ['config', '--global', 'user.name', info.name])
  spawnSync('git', ['config', '--global', 'user.email', info.email])
  if (!process.env.GITHUB_GPGKEY) {
    clog.error('No GPG key was created for GitHub: not adding a GPG key to this configuration.')
    clog.info('Please run "git-assist generate-gpg" in order to generate a GPG key then rerun this command to add it automatically to your configuration.\n')
  } else {
    spawnSync('git', ['config', '--global', 'user.signingkey', process.env.GITHUB_GPGKEY])
    spawnSync('git', ['config', '--global', 'commit.gpgSign', true])
    clog.success('GPG key successfully added to global configuration!')
  }
  clog.success('Global configuration successfully updated!')
}
