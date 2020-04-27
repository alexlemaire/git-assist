const chalk = require('chalk')

module.exports = async (opts) => {
  if (process.platform === 'win32') {
    throw new Error(`Apologies, scheduling ${chalk.italic.blue('auto-pull')} is currently not supported on Windows...`)
  }
  if (opts.scheduled) {
    clog.info('WARNING: this feature is kind of experimental. It may not work on some OS or on your machine. Feel free to file any bugs you encounter! (I did not have many machines to try this on and since PM2 is already setup on mines I am not sure how it will work on a machine without prior configuration...)')
    clog.info(`Scheduling ${chalk.italic.blue('auto-pull')}...`)
    await daemonize(opts)
    clog.success(`${chalk.italic.blue('auto-pull')} scheduled!`)
  }
}

function daemonize (opts) {
  if (process.getuid() !== 0) {
    throw new Error(`You must run this command with elevated rights... This command is working with ${chalk.italic.cyan('pm2')} to setup ${chalk.italic.cyan('auto-pull')} so that it restarts when your machine restarts.\nPlease run ${chalk.italic.blue('sudo git-assist auto-pull [-c, --config]')} instead.`)
  }
  const startConf = {
    name: 'scheduled-auto-pull',
    script: `${appRoot}/index.js`,
    args: 'auto-pull',
    cron_restart: opts.cron,
    max_memory_restart : '100M',
    autorestart: false
  }
  promisifyPm2('connect')
  .then(res => promisifyPm2('start', startConf))
  .then(res => promisifyPm2('startup', null, {}))
  .then(res => promisifyPm2('dump'))
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
