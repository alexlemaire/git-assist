#!/usr/bin/env node
const args = process.argv
if (args.length < 3) {
  console.error('A parameter should be passed to this function')
  process.exit(0)
}
const fs = require('fs')

async function getPublishedVer() {
  const exec = require('./utils/exec.js')
  return await exec('npm view git-assist version')
}

function getFunctions() {
  const fctsJson = JSON.parse(fs.readFileSync(`${__dirname}/functions.json`, 'utf-8'))
  let fcts = {}
  Object.entries(fctsJson).forEach(entry => {
    fcts[entry[0]] = require(entry[1])
  })
  return fcts
}

(async function main() {
  await getFunctions()[args[2]](args.splice(3)).catch(err => {process.exit(1)})
  const publishedVer = await getPublishedVer().then(res => res.trim()).catch(err => {
    console.log({
      message: 'Tried to retrieve published version',
      error: err
    })
    process.exit(1)
  })
  const currentVer = JSON.parse(fs.readFileSync(`${__dirname}/package.json`, 'utf-8')).version.trim()
  if (currentVer !== publishedVer) {
    console.log(`Your installed git-assist version is outdated. Latest version is ${publishedVer}. Please update via "npm i -g git-assist"`)
  }
})()
