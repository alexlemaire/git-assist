module.exports = async (keys) => {
  require(appRoot + '/src/utils/key-gen/list/print-keys.js')(keys, 'gpg')
}
