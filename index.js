#!/usr/bin/env node
let args = process.argv
if (args.length < 3) {
  args.push('--help')
}
const fs = require('fs')
const clog = require('./utils/loggers/console-log.js')

function getPublishedVer() {
  const spawnSync = require('child_process').spawnSync
  return spawnSync('npm', ['view', 'git-assist', 'version']).stdout.toString().trim()
}

function getCurrentVer() {
  return require('./package.json').version.trim()
}

function getFunctions() {
  let fcts = {}
  Object.entries(require('./functions.json')).forEach(entry => {
    fcts[entry[0]] = require(entry[1].path)
  })
  return fcts
}

(async function main() {
  await getFunctions()[args[2]](args.splice(3))
  const publishedVer = getPublishedVer()
  const currentVer = getCurrentVer()
  if (currentVer !== publishedVer) {
    console.log(`Your installed git-assist version is outdated. Latest version is ${publishedVer}. Please update via "npm i -g git-assist"`)
  }
})().catch(err => {clog.error(err.message); process.exit(1)})
