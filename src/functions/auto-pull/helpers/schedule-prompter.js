const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = async () => {
  const processes = await require('./get-processes.js')()
  const { action } = await getAction(processes)
  let res = {
    scheduled: true
  }
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
  let choices = processes
  if (action === 'edit') {
    choices = choices.filter(choice => choice.replace(/-auto-pull/g, '') !== 'startup')
  }
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
