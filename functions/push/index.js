module.exports = async (args) => {
  const clog = require('../../utils/loggers/console-log.js')
  await require('./helpers/check-config.js')().catch(err => {clog.error(err); process.exit(1)})
  await require('./helpers/git-process.js')(await require('./helpers/get-protocol.js')()).catch(err => {clog.error(err); process.exit(1)})
}
