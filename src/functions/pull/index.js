module.exports = async (args) => {
  const appRoot = require('app-root-path').path
  await require(appRoot + '/src/utils/config/sync-config.js')()
  await require('./helpers/git-process/git-process.js')(await require(appRoot + '/src/utils/auth/get-protocol.js')())
}
