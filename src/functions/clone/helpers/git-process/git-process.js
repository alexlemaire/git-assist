module.exports = async (url) => {
  const appRoot = require('app-root-path').path
  const protocol = await require(appRoot + '/src/utils/auth/get-protocol.js')(url)
  const repo = url.split('/')[url.split('/').length - 1].split('.')[0]
  await require('./clone.js')(url, protocol, repo)
  require('./open-repo.js')(repo)
}
