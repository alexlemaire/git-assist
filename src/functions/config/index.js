module.exports = async (args) => {
  if (args[0] && !['-g', '--global'].includes(args[0])) {
    throw new Error(`The option ${args[0]} is not supported by this function. Supported options are: [-g, --global] to set global configuration.`)
  }
  const info = await require('./helpers/info-prompter.js')()
  if (['-g', '--global'].includes(args[0])) {
    require('./helpers/set-global-config.js')(info)
  } else {
    await require('./helpers/set-local-config.js')(info)
  }
}
