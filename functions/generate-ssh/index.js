module.exports = async (args) => {
  const genSsh = require('./helpers/generate-ssh.js')
  const infoPrompter = require('./helpers/info-prompter.js')
  const initShellUpdate = require('./helpers/init-shell-update.js')
  const userInfo = require('./helpers/user-info.js')
  const info = await infoPrompter()
  genSsh(info)
  initShellUpdate(info.path)
  userInfo(info.path)
}
