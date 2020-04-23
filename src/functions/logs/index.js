module.exports = async (args) => {
  if (!args[0] || !`${args[0]}`.startsWith('-')) {
    await require('./helpers/print.js')(args)
  } else {
    await require('./helpers/process-args.js')(args)
  }
}
