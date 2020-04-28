const chalk = require('chalk')
let startConf

module.exports = async (opts) => {
  if (process.platform === 'win32') {
    throw new Error(`Apologies, scheduling ${chalk.italic.blue('auto-pull')} is currently not supported on Windows...`)
  }
  if (!opts.scheduled) {
    return
  }
  clog.info(`Scheduling ${chalk.italic.blue('auto-pull')}...`)
  await processAction(opts)
  clog.success(`${chalk.italic.blue('auto-pull')} scheduling successfully updated!`)
}

async function processAction(opts) {
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
  await pm2Update(
    {
      method: 'start',
      params: [startConf]
    })
}

async function deleteProcess(opts) {
  await pm2Update(
    {
      method: 'delete',
      params: [opts.name]
    })
}

async function editProcess(opts) {
  startConf.name = opts.name
  await pm2Update(
    {
      method: 'delete',
      params: [opts.name]
    },
    {
      method: 'start',
      params: [startConf]
    })
}

async function pm2Update(...commands) {
  const pm2 = require(appRoot + '/src/utils/pm2/pm2-utils.js')
  await pm2.connect().catch(pm2ErrorHandler)
  for (const command of commands) {
    await pm2[command.method](...command.params).catch(pm2ErrorHandler)
  }
  await pm2.dump()
  .then(res => pm2.disconnect())
  .catch(pm2ErrorHandler)
}

function pm2ErrorHandler(err) {
  clog.error('There was an error with PM2...')
  throw new Error(err)
}
