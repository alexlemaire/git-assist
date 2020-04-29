module.exports = async () => {
  const pm2 = require(appRoot + '/src/utils/pm2/pm2-utils.js')
  let processes = await pm2.connect().then(res => pm2.list()).then(processList => processList.filter(process => process.name.includes('auto-pull')))
  processes = processes.map(process => process.name)
  await pm2.disconnect()
  return processes
}
