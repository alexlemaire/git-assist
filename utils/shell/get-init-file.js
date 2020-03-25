module.exports = () => {
  let file = ''
  switch (process.env.SHELL) {
    case '/bin/bash':
      file = '.bashrc'
      break
    case '/usr/bin/zsh':
      file = '.zshrc'
      break
    default:
      break
  }
  return `${process.env.HOME}/${file}`
}
