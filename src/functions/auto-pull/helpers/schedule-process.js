const chalk = require('chalk')
let startConf

module.exports = async (opts) => {
  if (process.platform === 'win32') {
    throw new Error(`Apologies, scheduling ${chalk.italic.blue('auto-pull')} is currently not supported on Windows...`)
  }
  if (!opts.scheduled) {
    return
  }
  clog.info('WARNING: this feature is kind of experimental. It may not work on some OS or on your machine. Feel free to file any bugs you encounter! (I did not have many machines to try this on and since PM2 is already setup on mines I am not sure how it will work on a machine without prior configuration...)')
  clog.info(`Scheduling ${chalk.italic.blue('auto-pull')}...`)
  await processAction(opts)
  clog.success(`${chalk.italic.blue('auto-pull')} scheduling successfully updated!`)
}

async function processAction(opts) {
  if (process.getuid() !== 0) {
    throw new Error(`You must run this command with elevated rights... This command is working with ${chalk.italic.cyan('pm2')} to setup ${chalk.italic.cyan('auto-pull')} so that it restarts when your machine restarts.\nPlease run ${chalk.italic.blue('sudo git-assist auto-pull [-c, --config]')} instead.`)
  }
  startConf = {
    script: `${appRoot}/index.js`,
    args: 'auto-pull',
    cron_restart: opts.cron,
    max_memory_restart : '100M',
    autorestart: false
  }
  switch (opts.action) {
    case 'add':
      clog.info(`Adding ${chalk.italic.blue(opts.type)} scheduled run for ${chalk.italic.cyan('auto-pull')}...`)
      await addProcess(opts)
      break
    case 'edit':
      clog.info(`Editing ${chalk.italic.blue(opts.name)} process...`)
      await editProcess(opts)
      break
    case 'delete':
      clog.info(`Deleting ${chalk.italic.blue(opts.name)} process...`)
      await deleteProcess(opts)
      break
  }
}

async function addProcess(opts) {
  startConf.name = `${opts.type}-auto-pull`
  await pm2Update([
    {
      method: 'start',
      params: [startConf]
    }
  ])
}

async function deleteProcess(opts) {
  await pm2Update([
    {
      method: 'delete',
      params: [opts.name]
    }
  ])
}

async function editProcess(opts) {
  startConf.name = opts.name
  await pm2Update([
    {
      method: 'delete',
      params: [opts.name]
    },
    {
      method: 'start',
      params: [startConf]
    }
  ])
}

async function pm2Update(commands) {
  const pm2 = require(appRoot + '/src/utils/pm2/pm2-utils.js')
  await pm2.connect()
  for (const command of commands) {
    await pm2[command.method](...command.params)
  }
  await pm2.startup(null, {})
  .then(res => pm2.dump())
  .then(res => pm2.disconnect())
  .catch(err => {
    clog.error('There was an error with PM2...')
    throw new Error(err)
  })
}
