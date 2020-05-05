module.exports = async (keys) => {
  const { user, key } = await require('./info-prompter.js')(keys)
  require('./add-key.js')(user, key)
}
