module.exports = (keyId) => {
  const spawnSync = require('child_process').spawnSync
  const defaultShell = process.env.SHELL
  let file = ''
  switch (defaultShell) {
    case '/bin/bash':
      file = `${process.env.HOME}/.bashrc`
      update(file, keyId)
      break
    case '/usr/bin/zsh':
      file = `${process.env.HOME}/.zshrc`
      update(file, keyId)
      break
    default:
      break
  }
  clog.success(`${file} updated with GPG key export!`)
  clog.info('Please run "git-assist config" or "git-assist config -g" again in order to set your GPG key for GitHub.\n')
  spawnSync('source', [file])
}

function update(file, keyId) {
  const fs = require('fs')
  let data = fs.readFileSync(file, 'utf-8')
  const params = {
    startToken: '# START GPG KEY EXPORT',
    endToken: '# END GPG KEY EXPORT'
  }
  const regex = new RegExp(`\\${params.startToken}[\\s\\S]*?\\${params.endToken}`, 'g')
  const regexMatch = data.match(regex)
  if (data.match(regex) !== null) {
    let blockLines = regexMatch[0].split('\n')
    blockLines[1] = `export GITHUB_GPGKEY=${keyId}`
    data = data.replace(regexMatch[0], blockLines.join('\n'))
  } else {
    data = `${data}\n# DO NOT MODIFY THIS BLOCK\n${params.startToken}\nexport GITHUB_GPGKEY=${keyId}\n${params.endToken}\n`
  }
  fs.writeFileSync(file, data, 'utf-8')
}
