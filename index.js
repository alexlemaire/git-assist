#!/usr/bin/env node
const args = process.argv.splice(2)
const fs = require('fs')
const clog = require('./src/utils/loggers/console-log.js')
const chalk = require('chalk')

function getPublishedVer() {
  const spawnSync = require('child_process').spawnSync
  return spawnSync('npm', ['view', 'git-assist', 'version']).stdout.toString().trim()
}

function getCurrentVer() {
  return require('./package.json').version.trim()
}

function checkVersion() {
  const publishedVer = getPublishedVer()
  const currentVer = getCurrentVer()
  if (currentVer !== publishedVer) {
    clog.info(`Your installed ${chalk.italic('git-assist')} version is outdated. Latest version is ${chalk.bold(publishedVer)}. Please update via ${chalk.cyan.italic('npm i -g git-assist')}`, {makeLink: false, format: false})
  }
}

function getFunctions() {
  let fcts = {}
  Object.entries(require('./functions.json')).forEach(entry => {
    fcts[entry[0]] = entry[1]
    fcts[entry[0]].handler = require(entry[1].handler)
  })
  return fcts
}

async function noArgsMode(fcts) {
  const inquirer = require('inquirer')
  require('./src/utils/welcome/welcome.js')
  const {action} = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'action',
      message: 'What would you like to do today?',
      choices: Object.entries(fcts).map(entry => entry[1].desc)
    }
  ])
  const fctEntry = Object.entries(fcts).filter(entry => entry[1].desc === action)[0]
  args.push(fctEntry[0])
  if (fctEntry[1].args.length > 0) {
    const {arg} = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'arg',
        message: 'Arguments are available for this function:',
        choices: [...fctEntry[1].args.map(arg => `${arg.arg}: ${arg.desc}`), 'No argument']
      }
    ])
    if (arg !== 'No argument') {
      args.push(arg.split(':')[0])
    }
  }
}

(async function main() {
  const fcts = getFunctions()
  if (args.length === 0) {
    await noArgsMode(fcts)
  }
  await fcts[args[0]].handler(args.splice(1))
  checkVersion()
})().catch(err => {clog.error(err.message); process.exit(1)})
