module.exports = async (args) => {
  await require('./helpers/check-config.js')().catch(err => {consola.error(err); process.exit(1)})
  await require('./helpers/git-process.js')(await require('./helpers/get-protocol.js')()).catch(err => {consola.error(err); process.exit(1)})
}
