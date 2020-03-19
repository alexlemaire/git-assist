module.exports = async (args) => {
  const infoPrompter = require('./helpers/info-prompter.js')
  const setGlobalConfig = require('./helpers/set-global-config.js')
  const setLocalConfig = require('./helpers/set-local-config.js')
  const info = await infoPrompter()
  if (args[0] === '-g') {
    setGlobalConfig(info)
  } else {
    await setLocalConfig(info)
  }
}
