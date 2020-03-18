#!/usr/bin/env node

const functions = {
  "auto-pull": require('./functions/auto-pull.js'),
  config: require('./functions/config.js')
}

async function main() {
  await functions[process.argv[2]](process.argv.splice(3))
}

main()
