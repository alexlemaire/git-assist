#!/usr/bin/env node
const args = process.argv
if (args.length < 3) {
  console.error('A parameter should be passed to this function')
  process.exit(0)
}

const fs = require('fs')
const fctsJson = JSON.parse(fs.readFileSync('./functions.json', 'utf-8'))
let fcts = {}
Object.entries(fctsJson).forEach(entry => {
  fcts[entry[0]] = require(entry[1])
})

async function main() {
  await fcts[args[2]](args.splice(3)).catch(err => {process.exit(1)})
}
main()
