module.exports = (path) => {
  const fs = require('fs')
  console.log('\nIn order to add your new SSH key on GitHub:')
  console.log('  1. please follow this link: https://github.com/settings/keys')
  console.log('  2. click on "New SSH key" on the top right corner')
  console.log('  3. give a meaningful title to your new key and paste the content below into the "Key" field:\n')
  console.log(fs.readFileSync(`${path}.pub`, 'utf-8'))
}
