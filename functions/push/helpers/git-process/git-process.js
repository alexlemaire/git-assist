module.exports = async (protocol) => {
  const {addAll, params, message} = await require('./info-prompter.js')()
  let mfa = false
  if (protocol === 'https') {
    mfa = await require('./https-instructions.js')()
  }
  await require('./stage.js')(addAll, params)
  await require('./commit.js')(message)
  await require('./push.js')(protocol, mfa)
}
