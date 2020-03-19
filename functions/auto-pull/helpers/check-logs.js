const fs = require('fs')
const root = '/var/log/git-pull-automation'
const logFile = `${root}/git-pull-automation-logs.log`

module.exports = () => {
  if (!fs.existsSync(root)) {
    createFiles([{isDir: true, path: root}, {isDir: false, path: logFile}])
  }  else {
    if (!fs.existsSync(logFile)) {
      createFiles([{isDir: false, path: logFile}])
    }
  }
}

async function createFiles(files) {
  const exec = require('../../../utils/exec.js')
  for (const file of files) {
    let cmd = 'touch'
    if (file.isDir) {
      cmd = 'mkdir'
    }
    await exec(`sudo ${cmd} ${file}`).catch(err => {
      console.log(err)
      process.exit(1)
    })
  }
}
