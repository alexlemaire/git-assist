#!/usr/bin/env node
const args = process.argv
if (args.length < 3) {
  console.error('A parameter should be passed to this function')
  process.exit(0)
}
const fs = require('fs')
const consola = require('consola')

function getPublishedVer() {
  const execSync = require('child_process').execSync
  return execSync('npm view git-assist version').trim()
}

function getCurrentVer() {
  return JSON.parse(fs.readFileSync(`${__dirname}/package.json`, 'utf-8')).version.trim()
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
  await getFunctions()[args[2]](args.splice(3))
  const publishedVer = getPublishedVer()
  const currentVer = getCurrentVer()
  if (currentVer !== publishedVer) {
    console.log(`Your installed git-assist version is outdated. Latest version is ${publishedVer}. Please update via "npm i -g git-assist"`)
  }
})().catch(err => {consola.error(err.message); process.exit(1)})
