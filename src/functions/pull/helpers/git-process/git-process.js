module.exports = async (protocol) => {
  const branches = await require('./info-prompter.js')()
  if (protocol === 'https') {
    await require('../../../../utils/auth/https-instructions.js')()
  }
  await require('./pull.js')(protocol, branches)
}
