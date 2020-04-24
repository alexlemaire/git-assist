module.exports = (info) => {
  const spawnSync = require('child_process').spawnSync
  createFolder(info.path)
  clog.info('Generating SSH key...')
  spawnSync('ssh-keygen', [
    '-t', 'rsa',
    '-b', '4096',
    '-C', info.email,
    '-N', info.pwd,
    '-f', info.path
  ])
  clog.success('SSH key generated!')
}

function createFolder(folderPath) {
  const fs = require('fs')
  const path = require('path')
  folderPath = path.dirname(folderPath)
  let folderPaths = folderPath.split(path.sep).map((pathFrag, index, array) => path.sep + path.join(...array.slice(0, index + 1)))
  folderPaths.shift()
  for (const folderPath of folderPaths) {
    if (!fs.existsSync(folderPath)) {
      clog.info(`Folder ${folderPath} does not exists, creating...`)
      fs.mkdirSync(folderPath)
      clog.success('Done!')
    }
  }
}
