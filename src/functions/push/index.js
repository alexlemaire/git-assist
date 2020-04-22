module.exports = async (args) => {
  await require(appRoot + '/src/utils/config/sync-config.js')()
  await require('./helpers/git-process/git-process.js')(await require(appRoot + '/src/utils/auth/get-protocol.js')())
}
