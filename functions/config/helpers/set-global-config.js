module.exports = (info) => {
  const execSync = require('child_process').execSync
  // for global config we cannot use isomorphic-git as they do not currently support global config. May be worth helping them with this
  execSync(`git config --global user.name "${info.name}"`)
  execSync(`git config --global user.email "${info.email}"`)
  if (!process.env.GITHUB_GPGKEY) {
    consola.error('No GPG key was created for GitHub: not adding a GPG key to this configuration.')
    consola.info('Please run "git-assist generate-gpg" in order to generate a GPG key then rerun this command to add it automatically to your configuration.\n')
  } else {
    execSync(`git config --global user.signingkey "${process.env.GITHUB_GPGKEY}"`)
  }
  consola.success('Global configuration successfully updated!')
}
