module.exports = async (url) => {
  const protocol = await require('../../../../utils/auth/get-protocol.js')(url)
  const repo = url.split('/')[url.split('/').length - 1].split('.')[0]
  await require('./clone.js')(url, protocol, repo)
  require('./open-repo.js')(repo)
}
