module.exports = async (keys) => {
  const { chosenKeys } = await require(appRoot + '/src/utils/key-gen/delete/info-prompter.js')('gpg', keys)
  for (const chosenKey of chosenKeys) {
    require('./delete-key.js')(chosenKey)
    await require(appRoot + '/src/utils/key-gen/delete/delete-pwd.js')('gpg', chosenKey)
    require(appRoot + '/src/utils/key-gen/delete-key.js')('gpg', chosenKey)
  }
}
