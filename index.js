#!/usr/bin/env node

const functions = {
  config: require('./functions/config.js')
}

async function main() {
  require('./helpers/check-logs.js')()
  await functions[process.argv[2]](process.argv.splice(3))
}

main()
