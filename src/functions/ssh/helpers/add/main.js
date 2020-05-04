module.exports = async (args) => {
  const { user, key } = await require('./info-prompter.js')()
  require('./add-key.js')(user, key)
}
