module.exports = async (args) => {
  const { url } = await require('./helpers/info-prompter.js')()
  await require('./helpers/git-process/git-process.js')(url)
}
