module.exports = async (config) => {
  if (process.version === config.get('node_version') && config.get('startup_ran')) {
    clog.info('No need to create pm2 startup script for this machine.')
    return
  }
  clog.info('Creating pm2 startup script for this machine...')
  startup(config)
  clog.success('pm2 startup script successfully created!')
}

function startup(config) {
  const chalk = require('chalk')
  console.log(`\n${chalk.cyan('---------------')}\n`)
  console.log(`${chalk.cyan('All information displayed below are related to PM2...')}`)
  console.log(`${chalk.italic.cyan('Running pm2 unstartup...')}\n`)
  execPm2Cli('unstartup')
  console.log(`\n${chalk.italic.cyan('Running pm2 startup...')}\n`)
  execPm2Cli('startup')
  console.log(`\n${chalk.cyan('---------------')}\n`)
  config.set('node_version', process.version)
  config.set('startup_ran', true)
}

function execPm2Cli(cmd) {
  const childProc = require('child_process')
  const pm2Call = childProc.spawnSync('node', [`${appRoot}/node_modules/pm2/bin/pm2`, cmd])
  if (pm2Call.error) {
    throw error
  }
  try {
    childProc.execSync(pm2Call.stdout.toString().trim(), {stdio: 'inherit'})
  } catch (err) {
    throw err
  }
}
