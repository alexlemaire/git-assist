const path = require('path')
const staticRoot = path.join(__dirname, '..', 'static')
const clog = require('../../../utils/loggers/console-log.js')

module.exports = async (path) => {
  const fs = require('fs')
  const key = fs.readFileSync(`${path}.pub`, 'utf-8')
  logInstructions(key)
  const keyPath = `${staticRoot}/key`
  fs.writeFileSync(keyPath, key, 'utf-8')
  await onlineInstructions()
  fs.unlinkSync(keyPath)
}

function logInstructions (key) {
  const chalk = require('chalk')
  clog.info('In order to add your new SSH key on GitHub:')
  console.log(`  1. please follow this link: ${chalk.underline('https://github.com/settings/keys')}`)
  console.log('  2. click on "New SSH key" on the top right corner')
  console.log('  3. give a meaningful title to your new key and paste the content below into the "Key" field:\n')
  console.log(key)
}

async function onlineInstructions () {
  const spawnSync = require('child_process').spawnSync
  const inquirer = require('inquirer')
  spawnSync('xdg-open', ['https://github.com/settings/keys'])
  spawnSync('xdg-open', [`${staticRoot}/index.html`])
  let confirm = false
  while (!confirm) {
    confirm = (await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Did you follow all given instructions and successfully added your SSH key?'
    })).confirm
    if (!confirm) {
      clog.error('Please follow the instructions to add your SSH key to GitHub')
    }
  }
}
