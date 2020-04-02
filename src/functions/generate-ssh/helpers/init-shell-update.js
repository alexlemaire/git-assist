module.exports = (path) => {
  const spawnSync = require('child_process').spawnSync
  const clog = require('../../../utils/loggers/console-log.js')
  const defaultShell = process.env.SHELL
  const file = require('../../../utils/shell/get-init-file.js')()
  update(file, path)
  clog.success(`${file} updated with automatic SSH key adding!`)
  spawnSync('source', [file])
}

function update(file, path) {
  const fs = require('fs')
  let data = fs.readFileSync(file, 'utf-8')
  const params = {
    startToken: '# START ADD SSH KEYS TO AGENT',
    endToken: '# END ADD SSH KEYS TO AGENT'
  }
  const regex = new RegExp(`\\${params.startToken}[\\s\\S]*?\\${params.endToken}`, 'g')
  const regexMatch = data.match(regex)
  if (regexMatch !== null) {
    let blockLines = regexMatch[0].split('\n')
    blockLines.splice(blockLines.length - 1, 0, `ssh-add ${path}`)
    data = data.replace(regexMatch[0], blockLines.join('\n'))
  } else {
    data = `${data}\n# DO NOT MODIFY THIS BLOCK\n${params.startToken}\neval "$(ssh-agent -s)"\nssh-add ${path}\n${params.endToken}\n`
  }
  fs.writeFileSync(file, data, 'utf-8')
}