module.exports = async () => {
  const info = await require('./info-prompter.js')()
  const keyId = require('./generate-gpg.js')(info)
  await require('./user-info.js')(getKeyASCII(keyId))
}

function getKeyASCII(keyId) {
  const spawnSync = require('child_process').spawnSync
  return spawnSync('gpg', [
    '--armor',
    '--export', keyId
  ]).stdout.toString('utf8')
}
