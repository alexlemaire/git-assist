const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = async (config) => {
  const answer = await processAction(await require('./get-processes.js')(), { scheduled: true })
  if (answer.scheduled) {
    await require('./create-pm2-startup.js')(config)
  }
  return answer
}

async function processAction(processes, res) {
  const { action } = await getAction(processes)
  switch (action) {
    case 'nothing':
      res.scheduled = false
      break
    case 'add':
      const addAnswer = await addActionPrompt(processes)
      if (!addAnswer.type) {
        clog.info(`There are no scheduled ${chalk.italic.cyan('auto-pull')} runs you can add for this machine.`)
        res.scheduled = false
      }
      res = {...res, action, ...addAnswer}
      break
    case 'edit':
    case 'delete':
      const editAnswer = await editActionPrompt(processes, action)
      if (!editAnswer.name) {
        clog.info(`There are no scheduled ${chalk.italic.cyan('auto-pull')} runs you can ${action} for this machine.`)
        res.scheduled = false
      }
      res = {...res, action, ...editAnswer}
      break
  }
  return res
}

async function getAction(processes) {
  const subChoices = processes.length > 0 ? ['edit', 'delete'] : []
  const questions = [
    {
      type: 'rawlist',
      name: 'action',
      message: 'You can also schedule auto-pull to run automatically. What would you like to do?',
      choices: ['add', ...subChoices, 'nothing']
    }
  ]
  return await inquirer.prompt(questions)
}

async function addActionPrompt(processes) {
  const processTypes = processes.map(process => process.replace(/-auto-pull/g, ''))
  const choices = ['startup', 'cron'].filter(choice => !processTypes.includes(choice))
  const questions = [
    {
      type: 'rawlist',
      name: 'type',
      message: 'What kind of scheduled run would you like to add?',
      choices,
      when: function (answer) {
        return choices.length > 0
      }
    },
    {
      type: 'input',
      name: 'cron',
      message: 'Please enter a cron pattern to schedule your auto-pull runs:',
      default: '0 0 * * 1',
      when: function (answer) {
        return answer.type === 'cron'
      }
    }
  ]
  return await inquirer.prompt(questions)
}

async function editActionPrompt(processes, action) {
  const choices = action !== 'edit' ? processes : processes.filter(process => process !== 'startup-auto-pull')
  const questions = [
    {
      type: 'rawlist',
      name: 'name',
      message: `Select a process you would like to ${action}?`,
      choices,
      when: function (answer) {
        return choices.length > 0
      }
    },
    {
      type: 'input',
      name: 'cron',
      message: 'Please enter a new cron pattern for your auto-pull scheduled runs:',
      default: '0 0 * * 1',
      when: function (answer) {
        if (!answer.name) {
          return false
        }
        return answer.name.startsWith('cron') && action === 'edit'
      }
    }
  ]
  return await inquirer.prompt(questions)
}
