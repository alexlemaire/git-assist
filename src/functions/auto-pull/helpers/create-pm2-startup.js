const childProc = require('child_process')

module.exports = async (config) => {
  const localVer = require(appRoot + '/package.json').dependencies.pm2.replace('^', '')
  checkGlobalVer(localVer)
  if (process.version === config.get('node_version') && config.get('startup_ran')) {
    clog.info('No need to create pm2 startup script for this machine.')
    return
  }
  const { confirm } = await promptConfirm()
  if (!confirm) {
    clog.info('Aborting process...')
    process.exit()
  }
  if (localVer !== config.get('pm2_version')) {
    childProc.spawnSync('node', [`${appRoot}/node_modules/pm2/bin/pm2`, 'update'])
    config.set('pm2_version', localVer)
  }
  clog.info('Creating pm2 startup script for this machine...')
  startup(config)
  clog.success('pm2 startup script successfully created!')
}

async function promptConfirm() {
  const inquirer = require('inquirer')
  return await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'About to unstartup/startup pm2 and potentially update the in-memory process. If you are already using pm2, you will need to restart all your processes and save them again. Are you sure you want to proceed?'
    }
  ])
}

function checkGlobalVer(localVer) {
  const chalk = require('chalk')
  const globalVer = childProc.spawnSync('pm2', ['-v']).stdout.toString().trim()
  if (globalVer.match(/(\d+)\.(\d+)\.(\d+)/) && globalVer !== localVer) {
    clog.info(`${chalk.underline('WARNING')}: your globally installed ${chalk.italic.cyan('pm2')} version is ${globalVer}. The locally used version of ${chalk.italic.cyan('pm2')} is ${localVer}. You may want to update your globally installed ${chalk.italic.cyan('pm2')} version to avoid conflict of in-memory process versions...`)
  }
}

function startup(config) {
  const chalk = require('chalk')
  console.log(`\n${chalk.cyan('---------------')}\n`)
  console.log(`${chalk.cyan('All information displayed below are related to PM2...')}`)
  console.log(`${chalk.italic.cyan('Running pm2 unstartup...')}\n`)
  pm2ManualCall('unstartup')
  console.log(`\n${chalk.italic.cyan('Running pm2 startup...')}\n`)
  pm2ManualCall('startup')
  console.log(`\n${chalk.cyan('---------------')}\n`)
  config.set('node_version', process.version)
  config.set('startup_ran', true)
}

function pm2ManualCall(cmd) {
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
