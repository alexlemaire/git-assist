module.exports = async (protocol) => {
  const {addAll, params, message} = await require('./info-prompter.js')()
  if (protocol === 'https') {
    await require('../../../../utils/auth/https-instructions.js')()
  }
  await require('./stage.js')(addAll, params)
  await require('./commit.js')(message)
  await require('./push.js')(protocol)
}
