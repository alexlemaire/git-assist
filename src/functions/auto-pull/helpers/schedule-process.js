module.exports = (opts) => {
  const chalk = require('chalk')
  if (process.platform === 'win32') {
    throw new Error(`Apologies, scheduling ${chalk.italic.blue('auto-pull')} is currently not supported on Windows...`)
  }
  if (opts.scheduled) {
    clog.info(`Scheduling ${chalk.italic.blue('auto-pull')}...`)
    daemonize(opts)
    clog.success(`${chalk.italic.blue('auto-pull')} scheduled!`)
  }
}

function daemonize (opts) {
  const pm2 = require('pm2')
  const startConf = {
    name: 'scheduled-auto-pull',
    script: `${appRoot}/index.js'`,
    args: 'auto-pull',
    cron_restart: opts.cron,
    max_memory_restart : '100M'
  }
  pm2.connect(async function(err) {
    await errorHandler(err)
    pm2.start(startConf, async function(err, apps) {
      await errorHandler(err)
      pm2.startup(process.platform === 'darwin' ? 'darwin' : 'systemd', async function(err, result) {
        await errorHandler(err)
        pm2.disconnect()
      })
    })
  })
}

async function errorHandler(err) {
  if (err) {
    clog.error(`There was an error with PM2:\n${err[0]}`)
    clog.heading('END (UNEXPECTED)')
    clog.end()
    await new Promise((resolve, reject) => {
      require(appRoot + '/src/utils/loggers/utils/get-file-transport.js')(clog)._dest.on('finish', function(info) {
        resolve()
      })
      clog.on('error', function(error) {
        reject()
      })
    })
    process.exit()
  }
}
