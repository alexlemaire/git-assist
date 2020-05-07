module.exports = async (protocol) => {
  const { addAll, params, message } = await require('./info-prompter.js')()
  await require('./stage.js')(addAll, params)
  await require('./commit.js')(message)
  await require('./push.js')(protocol)
}
