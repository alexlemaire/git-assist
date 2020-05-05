module.exports = async (keys) => {
  const info = await require('./info-prompter.js')()
  await require('./generate-ssh.js')(info)
  await require('./user-info.js')(info.path)
}
