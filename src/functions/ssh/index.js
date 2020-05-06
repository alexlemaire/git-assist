module.exports = async (args) => {
  const { fct, keys } = await require(appRoot + '/src/utils/key-gen/init.js')(args, 'ssh')
  await require(`./helpers/${fct}/main.js`)(keys)
}
