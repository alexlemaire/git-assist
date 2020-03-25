module.exports = async (key, keyType, root) => {
  const fs = require('fs')
  const keyPath = `${root}/key`
  fs.writeFileSync(keyPath, key, 'utf-8')
  openPopup(`${root}/index.html`)
  await confirm(keyType)
  fs.unlinkSync(keyPath)
}

function openPopup(indexPath) {
  const spawnSync = require('child_process').spawnSync
  spawnSync('xdg-open', ['https://github.com/settings/keys'])
  spawnSync('xdg-open', [indexPath])
}

async function confirm(keyType) {
  const inquirer = require('inquirer')
  const clog = require('../loggers/console-log.js')
  let confirm = false
  while (!confirm) {
    confirm = (await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: `Did you follow all given instructions and successfully added your ${keyType} key?`
    })).confirm
    if (!confirm) {
      clog.error(`Please follow the instructions to add your ${keyType} key to GitHub`)
    }
  }
}
