module.exports = async (keys) => {
  const { chosenKeys } = await require('./info-prompter.js')(keys)
  for (const chosenKey of chosenKeys) {
    require('./delete-key.js')(chosenKey.key)
    await require('./delete-pwd.js')(chosenKey.key)
    require(appRoot + '/src/utils/key-gen/delete-entries.js')('ssh', chosenKey.users.map(user => user.user))
  }
}
