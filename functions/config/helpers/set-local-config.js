module.exports = async (info) => {
  const git = require('isomorphic-git')
  const fs = require('fs')
  const params = [{
    path: 'user.name',
    value: info.name
  },
  {
    path: 'user.email',
    value: info.email
  }]
  for (const param of params) {
    await git.setConfig({
      fs,
      dir: '.',
      path: param.path,
      value: param.value
    })
  }
}
