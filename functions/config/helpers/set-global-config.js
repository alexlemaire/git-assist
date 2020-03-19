module.exports = (info) => {
  const execSync = require('child_process').execSync
  // for global config we cannot use isomorphic-git as they do not currently support global config. May be worth helping them with this
  execSync(`git config --global user.name "${info.name}"`)
  execSync(`git config --global user.email "${info.email}"`)
}
