module.exports = async (opts) => {
  const chalk = require('chalk')
  if (process.platform === 'win32') {
    throw new Error(`Apologies, scheduling ${chalk.italic.blue('auto-pull')} is currently not supported on Windows...`)
  }
  if (opts.scheduled) {
    clog.info(`Scheduling ${chalk.italic.blue('auto-pull')}...`)
    await daemonize(opts)
    clog.success(`${chalk.italic.blue('auto-pull')} scheduled!`)
  }
}

async function daemonize (opts) {
  const path = require('path')
  const startConf = {
    name: 'scheduled-auto-pull',
    script: path.join()`${appRoot}/index.js'`,
    args: 'auto-pull',
    cron_restart: opts.cron,
    max_memory_restart : '100M'
  }
  await promisifyPm2('connect')
  .then(res => promisifyPm2('start', startConf))
  .then(res => promisifyPm2('startup', process.platform === 'darwin' ? 'darwin' : 'systemd'))
  .then(res => promisifyPm2('disconnect'))
  .catch(err => {
    clog.error('There was an error with PM2...')
    throw new Error(err)
  })
}

function promisifyPm2(method, ...params) {
  const pm2 = require('pm2')
  return new Promise((resolve, reject) => {
    pm2[method](...params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
