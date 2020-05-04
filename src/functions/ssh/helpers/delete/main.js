module.exports = async (args) => {
  const { keys } = await require('./info-prompter.js')()
  for (const key of keys) {
    require('./delete-key.js')(key.key)
    await require('./delete-pwd.js')(key.key)
    require('./delete-entries.js')(key.users.user)
  }

}
