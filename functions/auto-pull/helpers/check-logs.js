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

function createFiles(files) {
  const childProc = require('child_process')
  for (const file of files) {
    let cmd = 'touch'
    if (file.isDir) {
      cmd = 'mkdir'
    }
    childProc.execSync(`sudo ${cmd} ${file}`)
  }
}
