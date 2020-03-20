module.exports = async (info) => {
  const git = require('isomorphic-git')
  const fs = require('fs')
  let params = [{
    path: 'user.name',
    value: info.name
  },
  {
    path: 'user.email',
    value: info.email
  }]
  if (!process.env.GITHUB_GPGKEY) {
    consola.error('No GPG key was created for GitHub: not adding a GPG key to this configuration.')
    consola.info('Please run "git-assist generate-gpg" in order to generate a GPG key then rerun this command to add it automatically to your configuration.\n')
  } else {
    params = params.concat([{
      path: 'user.signingkey',
      value: process.env.GITHUB_GPGKEY
    },
    {
      path: 'commit.gpgSign',
      value: true
    }])
  }
  for (const param of params) {
    await git.setConfig({
      fs,
      dir: '.',
      path: param.path,
      value: param.value
    })
  }
  consola.success('Local configuration successfully updated!')
}
