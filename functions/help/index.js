module.exports = (args) => {
  const fs = require('fs')
  let fcts = require('../../functions.json')
  delete fcts['--help']
  require('../../tools/welcome/welcome.js')
  if (args.length === 0) {
    for (const entry of Object.entries(fcts)) {
      logInfo(entry)
    }
  } else {
    logInfo([args[0], fcts[args[0]]])
  }
}

function logInfo(entry) {
  consola.info(`Function: ${entry[0]}`)
  console.log(`  Description: ${entry[1].desc}`)
  console.log(`  Command: "git-assist ${entry[0]}""`)
  for (const arg of entry[1].args) {
    console.log(entry[1].args.indexOf(arg) === 0 ? `  Accepted arguments:` : '')
    console.log(`    "${arg}""`)
  }
  console.log('\n')
}
