const clog = require('../../utils/loggers/console-log.js')
const chalk = require('chalk')
const terminalLink = require('terminal-link')
const pjson = require('../../package.json')
console.log('\n')
console.log(chalk.green(`Thanks for using this package! ${chalk.yellow('🖒')} ${chalk.red('♥')}\n`))
clog.log('git-assist is a small node utility aiming to help with your basic GitHub tasks and more.')
console.log('\n')
console.log(chalk.cyan(`If you would like to contribute to this project, you can find us on ${terminalLink(chalk.underline.italic('GitHub'), pjson.homepage.replace('#readme', ''))}`))
console.log(chalk.red(`If you encounter any bugs and would like to report it, please head to our ${terminalLink(chalk.underline.italic('GitHub repo issues'), pjson.bugs.url)}`))
console.log('\n')