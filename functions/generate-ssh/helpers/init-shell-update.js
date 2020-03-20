module.exports = (path) => {
  console.log('hey')
  const defaultShell = process.env.SHELL
  let file = ''
  switch (defaultShell) {
    case '/bin/bash':
      file = `${process.env.HOME}/.bashrc`
      update(file, path)
      break
    case '/usr/bin/zsh':
      file = `${process.env.HOME}/.zshrc`
      update(file, path)
      break
    default:
      break
  }
  consola.success(`${file} updated with automatic SSH key adding!`)
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
  if (data.match(regex) !== null) {
    let blockLines = regexMatch[0].split('\n')
    blockLines.splice(blockLines.length - 1, 0, `ssh-add ${path}`)
    data = data.replace(regexMatch[0], blockLines.join('\n'))
  } else {
    data = `${data}\n# DO NOT MODIFY THIS BLOCK\n${params.startToken}\neval "$(ssh-agent -s)"\nssh-add ${path}\n${params.endToken}\n`
  }
  fs.writeFileSync(file, data, 'utf-8')
}
