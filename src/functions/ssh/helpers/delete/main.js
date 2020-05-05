module.exports = async (keys) => {
  const { chosenKeys } = await require('./info-prompter.js')(keys)
  for (const chosenKey of chosenKeys) {
    require('./delete-key.js')(chosenKey)
    await require('./delete-pwd.js')(chosenKey)
    require(appRoot + '/src/utils/key-gen/delete-key.js')('ssh', chosenKey)
  }
}
