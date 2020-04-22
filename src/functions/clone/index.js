module.exports = async (args) => {
  const fs = require('fs')
  if (fs.existsSync('.git/config')) {
    await require(appRoot + '/src/utils/config/sync-config.js')()
  }
  const { url } = await require('./helpers/info-prompter.js')()
  await require('./helpers/git-process/git-process.js')(url)
}
