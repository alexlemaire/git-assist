module.exports = async (args) => {
  const clog = require('../../utils/loggers/console-log.js')
  await require('./helpers/sync-config.js')().catch(err => {clog.error(err); process.exit(1)})
  await require('./helpers/git-process/git-process.js')(await require('../../utils/auth/get-protocol.js')()).catch(err => {clog.error(err); process.exit(1)})
}
