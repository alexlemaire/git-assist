module.exports = async (keys) => {
  const { user, key } = await require(appRoot + '/src/utils/key-gen/add/info-prompter.js')('ssh', keys)
  require(appRoot + '/src/utils/key-gen/add/add-key.js')('ssh', user, key)
}
