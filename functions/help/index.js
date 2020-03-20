module.exports = (args) => {
  const fs = require('fs')
  let fcts = JSON.parse(fs.readFileSync('./functions.json','utf-8'))
  const pjson = JSON.parse(fs.readFileSync('./package.json','utf-8'))
  delete fcts['--help']
  logHeader(pjson)
  if (args.length === 0) {
    for (const entry of Object.entries(fcts)) {
      logInfo(entry)
    }
  } else {
    logInfo([args[0], fcts[args[0]]])
  }
}

function logHeader(pjson) {
  console.log('\n')
  console.log('Thanks for using this package!')
  console.log('"git-assist" is a small node utility aiming to help with your basic GitHub tasks and more.')
  console.log('\n')
  console.log(`If you encounter any bugs and would like to report it, please head to: ${pjson.bugs.url}`)
  console.log(`If you would like to contribute to this project, you can find here it at: ${pjson.homepage.replace('#readme', '')}`)
  console.log('\n')
  consola.info('To call any of the functions listed below, you can run "git-assist <function_name> <accepted_arguments>"')
  console.log('\n')
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
