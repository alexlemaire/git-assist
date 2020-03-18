#!/usr/bin/env node

if (process.argv.length < 3) {
  console.error('A parameter should be passed to this function')
  process.exit(0)
}

const functions = {
  "auto-pull": require('./functions/auto-pull.js'),
  config: require('./functions/config.js')
}

async function main() {
  await functions[process.argv[2]](process.argv.splice(3))
}

main()
