module.exports = async (args) => {
  await require('./list-keys.js')(await require('./get-keys.js'))
}
