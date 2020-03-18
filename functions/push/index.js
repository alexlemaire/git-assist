module.exports = async (args) => {
  const checkConfig = require('./helpers/check-config.js')
  const getProtocol = require('./helpers/get-protocol.js')
  const gitProcess = require('./helpers/git-process.js')
  await checkConfig().catch(err => {console.log(err); process.exit(1)})
  await gitProcess(await getProtocol()).catch(err => {console.log(err); process.exit(1)})
}
