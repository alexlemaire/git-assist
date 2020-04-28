const childProc = require('child_process')
const chalk = require('chalk')
const pm2Cli = require(appRoot + '/src/utils/pm2/pm2-cli.js')
const pm2Print = chalk.italic.cyan('pm2')

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
    clog.info(`Updating ${pm2Print} in-memory process...`)
    pm2Cli(['update'], false)
    config.set('pm2_version', localVer)
    clog.success(`${pm2Print} in-memory process successfully updated!`)
  }
  startup(config)
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
  const globalVer = childProc.spawnSync('pm2', ['-v']).stdout.toString().trim()
  if (globalVer.match(/(\d+)\.(\d+)\.(\d+)/) && globalVer !== localVer) {
    clog.info(`${chalk.underline('WARNING')}: your globally installed ${pm2Print} version is ${globalVer}. The locally used version of ${pm2Print} is ${localVer}. You may want to update your globally installed ${pm2Print} version to avoid conflict of in-memory process versions...`)
  }
}

function startup(config) {
  clog.info(`Removing ${pm2Print} startup script for this machine...`)
  runPm2Callback('unstartup')
  clog.success(`${pm2Print} startup script successfully removed!`)
  clog.info(`Creating ${pm2Print} startup script for this machine...`)
  runPm2Callback('startup')
  clog.success(`${pm2Print} startup script successfully created!`)
  config.set('node_version', process.version)
  config.set('startup_ran', true)
}

function runPm2Callback(cmd) {
  console.log(`\n${chalk.cyan('---------------')}\n`)
  console.log(`${chalk.cyan('All information displayed below are related to PM2...')}\n`)
  console.log(`${chalk.italic.cyan(`Running pm2 ${cmd}...`)}\n`)
  const pm2Call = pm2Cli([cmd])
  try {
    childProc.execSync(pm2Call.stdout.toString().trim(), {stdio: 'inherit'})
    console.log(`\n${chalk.cyan('---------------')}\n`)
  } catch (err) {
    throw err
  }
}
