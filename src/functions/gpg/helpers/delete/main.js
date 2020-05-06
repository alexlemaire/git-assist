module.exports = async (keys) => {
  const { chosenKeys } = await require(appRoot + '/src/utils/key-gen/delete/info-prompter.js')('gpg', keys)
  for (const chosenKey of chosenKeys) {
    require('./delete-key.js')(chosenKey)
    require(appRoot + '/src/utils/key-gen/delete-key.js')('gpg', chosenKey)
  }
}
