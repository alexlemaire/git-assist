const spawnSync = require('child_process').spawnSync

module.exports = async (args) => {
  const keyDefPath = '/var/tmp/genkey'
  const info = await require('./helpers/info-prompter.js')()
  require('./helpers/create-genkey.js')(info, keyDefPath)
  require('./helpers/generate-gpg.js')(keyDefPath)
  require('./helpers/delete-genkey.js')(keyDefPath)
  const keyId = getKeyId()
  require('./helpers/update-config.js')(info, keyId)
  await require('./helpers/user-info.js')(getKeyASCII(keyId))
}

function getKeyId() {
  const keyList = spawnSync('gpg', [
    '--list-secret-keys',
    '--keyid-format', 'LONG'
  ]).stdout.toString('utf8')
  const keys = keyList.split('\n').filter(line => line.includes('sec'))
  const lastKey = keys[keys.length - 1]
  const regex = new RegExp(/\b(?<=rsa4096\/)\S*/, 'g')
  return lastKey.match(regex)[0]
}

function getKeyASCII(keyId) {
  return spawnSync('gpg', [
    '--armor',
    '--export', keyId
  ]).stdout.toString('utf8')
}
