module.exports = async (protocol) => {
  const branches = await require('./info-prompter.js')()
  await require('./pull.js')(protocol, branches)
}
