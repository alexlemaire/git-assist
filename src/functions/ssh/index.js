module.exports = async (args) => {
  let opt = args[0]
  if (!opt) {
    opt = (await require(appRoot + '/src/utils/key-gen/no-args.js')()).opt
  }
  const fct = opt.replace('--', '')
  await require(`./helpers/${fct}/main.js`)(args)
}
