module.exports = async (args) => {
  const info = await require('./helpers/info-prompter.js')()
  if (args[0] === '-g') {
    require('./helpers/set-global-config.js')(info)
  } else {
    await require('./helpers/set-local-config.js')(info)
  }
}
