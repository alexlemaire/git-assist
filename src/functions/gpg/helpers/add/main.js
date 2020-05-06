module.exports = async (keys) => {
  const { user, key } = await require(appRoot + '/src/utils/key-gen/add/info-prompter.js')('gpg', keys)
  require(appRoot + '/src/utils/key-gen/add/add-key.js')('gpg', user, key)
}
