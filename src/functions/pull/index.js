module.exports = async (args) => {
  await require('../../utils/config/sync-config.js')()
  await require('./helpers/git-process/git-process.js')(await require('../../utils/auth/get-protocol.js')())
}
