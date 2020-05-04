module.exports = async (args) => {
  const info = await require('./helpers/info-prompter.js')()
  await require('./helpers/generate-ssh.js')(info)
  await require('./helpers/user-info.js')(info.path)
}
