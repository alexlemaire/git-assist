const path = require('path')
const staticRoot = path.join(__dirname, '..', 'static')

module.exports = async (gpgKey) => {
  const fs = require('fs')
  logInstructions(gpgKey)
  const keyPath = `${staticRoot}/key`
  fs.writeFileSync(keyPath, gpgKey, 'utf-8')
  await onlineInstructions()
  fs.unlinkSync(keyPath)
}

function logInstructions (gpgKey) {
  clog.info('In order to add your new GPG key on GitHub:')
  console.log('  1. please follow this link: https://github.com/settings/keys')
  console.log('  2. click on "New GPG key"')
  console.log('  3. give a meaningful title to your new key and paste the content below into the "Key" field:\n')
  console.log(gpgKey)
}

async function onlineInstructions () {
  const spawnSync = require('child_process').spawnSync
  const promptly = require('promptly')
  spawnSync('xdg-open', ['https://github.com/settings/keys'])
  spawnSync('xdg-open', [`${staticRoot}/index.html`])
  function validator(value) {
    if (!value) {
      throw new Error('Please follow the instructions to add your GPG key to GitHub')
    }
    return value
  }
  await promptly.confirm('Did you follow all given instructions and successfully added your GPG key (y/n)?', {validator})
}
