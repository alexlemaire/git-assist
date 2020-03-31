module.exports = async (args) => {
  const clog = require('../../utils/loggers/console-log.js')
  const info = await require('./helpers/info-prompter.js')().catch(err => {clog.error(err); process.exit(1)})
  if (args[0] === '-g') {
    require('./helpers/set-global-config.js')(info)
  } else {
    await require('./helpers/set-local-config.js')(info).catch(err => {clog.error(err); process.exit(1)})
  }
}
