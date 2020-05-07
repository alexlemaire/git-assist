module.exports = (cmds = [], catchError = true) => {
  const spawnSync = require('child_process').spawnSync
  const pm2Call = spawnSync('node', [`${appRoot}/node_modules/pm2/bin/pm2`, ...cmds])
  if (pm2Call.error && catchError) {
    clog.error('There was an error with PM2...')
    throw pm2Call.error
  }
  return pm2Call
}
