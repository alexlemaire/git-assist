const spawnSync = require('child_process').spawnSync
const fs = require('fs')

module.exports = (info) => {
  const keyDefPath = '/var/tmp/genkey'
  createGenkey(info, keyDefPath)
  generateGpg(keyDefPath)
  deleteGenkey(keyDefPath)
  const keyId = getKeyId()
  updateConfig(info, keyId)
  return keyId
}

function createGenkey (info, path) {
  const data = `Key-Type: 1\nKey-Length: 4096\nSubkey-Type: 1\nSubkey-Length: 4096\nName-Real: ${info.name}\nName-Email: ${info.email}\nExpire-Date: 0\nPassphrase: ${info.pwd}`
  clog.info('Creating key definition file...')
  fs.writeFileSync(path, data, 'utf-8')
  clog.success('File created!')
}

function generateGpg (path) {
  clog.info('Started generating GPG key. Please hold on...')
  clog.info('If you try to generate multiple keys in a row this may take a while (low entropy). To help speed up the process simply use your computer for other tasks.')
  spawnSync('gpg', [
    '--gen-key',
    '--batch', path
  ])
  clog.success('GPG key successfully generated!')
}

function deleteGenkey (path) {
  clog.info('Removing key definition file...')
  fs.unlinkSync(path)
  clog.success('File removed!')
}

function getKeyId () {
  const keyList = spawnSync('gpg', [
    '--list-secret-keys',
    '--keyid-format', 'LONG'
  ]).stdout.toString('utf8')
  const keys = keyList.split('\n').filter(line => line.includes('sec'))
  const lastKey = keys[keys.length - 1]
  const regex = new RegExp(/\b(?<=rsa4096\/)\S*/, 'g')
  return lastKey.match(regex)[0]
}

function updateConfig (info, keyId) {
  const chalk = require('chalk')
  clog.info(`Adding the GPG key to ${chalk.italic.cyan('git-assist')}...`)
  require(appRoot + '/src/utils/key-gen/update-config.js')('gpg', info.email, keyId)
  clog.success(`GPG key successfully added for ${info.email}!`)
}
