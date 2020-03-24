module.exports = async (args) => {
  require('./helpers/check-logs.js')()
  // TODO: should allow configuration via --config flag
  const info = await require('./helpers/info-prompter.js')()
  console.log(info.name, info.age)
}
