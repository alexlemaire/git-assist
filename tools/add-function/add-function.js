async function main() {
  const promptly = require('promptly')
  const fs = require('fs')
  const name = await promptly.prompt('Function name: ')
  const path = `functions/${name}.js`
  const fctsPath = './functions.json'
  fs.copyFileSync('tools/add-function/function.js', path)
  let fcts = JSON.parse(fs.readFileSync(fctsPath, 'utf-8'))
  fcts[name] = `./${path}`
  fs.writeFileSync(fctsPath, JSON.stringify(fcts, null, 2))
  console.log(`Function ${name} successfully added!`)
}

main()
