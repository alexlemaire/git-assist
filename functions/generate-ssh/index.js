module.exports = async (args) => {
  const info = await require('./helpers/info-prompter.js')()
  require('./helpers/generate-ssh.js')(info)
  require('./helpers/init-shell-update.js')(info.path)
  await require('./helpers/user-info.js')(info.path)
}
